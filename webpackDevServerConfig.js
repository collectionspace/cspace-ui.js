/* global fetch */
/* eslint import/no-extraneous-dependencies: "off" */
/* eslint-disable no-console */

const fs = require('fs');

const {
  createProxyMiddleware,
  responseInterceptor,
} = require('http-proxy-middleware');

/**
 * Generates a regular expression that matches a script URL for a given library.
 *
 * @param library The name of the library.
 * @returns A regular expression that detects if the library is used on an HTML page.
 */
const scriptUrlPattern = (library) => new RegExp(`src=".*?/${library}(@.*?)?(\\.min)?\\.js"`, 'g');

/**
 * Determines if an HTML page uses a given library.
 *
 * @param page The HTML content of the page.
 * @param library The name of the library.
 * @returns true if the page uses the library; false otherwise.
 */
const pageUsesLibrary = (page, library) => scriptUrlPattern(library).test(page);

/**
 * Determines if a given library is a CSpace UI plugin that can be injected into an HTML page.
 *
 * @param page The HTML content of the page.
 * @param library The name of the library.
 * @returns true if the library is a plugin that can be injected; false otherwise.
 */
const canInjectLibraryAsPlugin = (page, library) => (
  library.startsWith('cspaceUIPlugin')
  && page.includes('cspaceUI({')
);

/**
 * Verifies that a given target URL can be used as a back-end for a given library under
 * development. If not, print a message and exit.
 *
 * A URL can be used as a back end if:
 * - It is a valid URL.
 * - It is reachable.
 * - It returns HTML content that we know how to inject the library into, i.e. it has a
 *   conventional CSpace UI index.html page.
 *
 * @param proxyTarget The URL to verify.
 * @param library The name of the library.
 */
const verifyTarget = async (proxyTarget) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const verifiedUrl = new URL(proxyTarget);
  } catch (error) {
    console.error(`The back-end URL ${proxyTarget} is not a valid URL.`);
    process.exit(1);
  }

  let response;

  try {
    response = await fetch(proxyTarget);
  } catch (error) {
    response = null;
  }

  if (!(response && response.ok)) {
    console.error(`The back-end URL ${proxyTarget} is not reachable.`);
    process.exit(1);
  }
};

/**
 * Inject an element containing a status message into a CSpace HTML page.
 *
 * @param page The HTML content of the page.
 * @param status The status message.
 * @returns The HTML content of the page with the status message injected.
 */
const injectStatusElement = (page, status) => page.replace(
  '</body>',
  `
  <script>
    addEventListener('load', () => {
      const statusElement = document.createElement('div');

      statusElement.style.backgroundColor = 'gold';
      statusElement.style.fontFamily = 'monospace';
      statusElement.style.textAlign = 'center';
      statusElement.style.margin = '-10px -10px 10px -10px';
      statusElement.style.padding = '10px';
      statusElement.style.borderBottom = '1px solid #333';

      statusElement.innerHTML = ${JSON.stringify(status)};

      document.body.prepend(statusElement);
    })
  </script>
  </body>
  `,
);

/**
 * Generates a webpack dev server configuration object.
 */
module.exports = async ({
  library,
  localIndex,
  proxyTarget,
  publicPath,
}) => {
  if (process.env.npm_lifecycle_event !== 'devserver') {
    return undefined;
  }

  if (!proxyTarget) {
    console.info('Serving local files.');
    console.info('Edit index.html to configure the CollectionSpace UI.');
    console.info();

    return {
      static: {
        directory: __dirname,
      },
      historyApiFallback: true,
    };
  }

  await verifyTarget(proxyTarget);

  console.info(`Proxying to a remote CollectionSpace server at ${proxyTarget}`);

  if (localIndex) {
    if (!fs.existsSync(localIndex)) {
      console.error(`The local index file ${localIndex} does not exist.`);
      process.exit(1);
    }

    console.info('The UI configuration on the remote server will be ignored.');
    console.info(`Edit ${localIndex} to configure the CollectionSpace UI.`);
  } else {
    console.info('The UI configuration on the remote server will be used.');
  }

  console.info();

  const proxyTargetUrl = new URL(proxyTarget);

  /**
   * Rewrite a location header (as received in a 3xx response). This changes back-end URLs to
   * point to the local server instead.
   *
   * @param res The response.
   * @param req The request.
   */
  const rewriteLocationHeader = (res, req) => {
    const location = res.getHeader('location');

    if (!location) {
      return;
    }

    const locationUrl = new URL(location, proxyTargetUrl);

    if (locationUrl.host !== proxyTargetUrl.host) {
      return;
    }

    const requestHost = req.headers.host;

    if (!requestHost) {
      return;
    }

    locationUrl.protocol = 'http';
    locationUrl.host = requestHost;

    res.setHeader('location', locationUrl.href);
  };

  /**
   * Injects the library under development into a CSpace HTML page.
   *
   * @param page The HTML content of the page.
   * @returns The HTML content of the page with the library injected.
   */
  const injectDevScript = (page, req) => {
    // If this package is being used in the page, replace it with the local dev build.

    if (pageUsesLibrary(page, library)) {
      return page.replace(
        scriptUrlPattern(library),
        `src="${publicPath}${library}.js"`,
      );
    }

    // This package isn't being used in the page. If the page appears to use the CSpace UI and this
    // package appears to be a CSpace UI plugin, inject a script tag for it, and add it to the
    // UI plugin configuration.

    if (canInjectLibraryAsPlugin(page, library)) {
      const pageWithScript = page.replace(
        '</head>',
        `
          <script src="${publicPath}${library}.js"></script>
        </head>
        `,
      );

      const pluginsPattern = /plugins:\s+\[\s+(.*?),?\s+\]/s;

      if (pluginsPattern.test(pageWithScript)) {
        return pageWithScript.replace(
          pluginsPattern,
          (match, existingPlugins) => (
            `plugins: [
              ${existingPlugins},
              ${library}(),
            ]`
          ),
        );
      }

      return pageWithScript.replace(
        'cspaceUI({',
        `cspaceUI({
          plugins: [
            ${library}(),
          ],
        `,
      );
    }

    console.warn(`Couldn't inject the library under development into the HTML page at ${req.originalUrl}`);

    return page;
  };

  /**
   * Rewrites an HTML response.
   *
   * @param responseBuffer A buffer containing the response body.
   * @param req The request.
   * @returns The rewritten response body.
   */
  const rewriteHTML = (responseBuffer, req) => {
    const requestHost = req.headers.host;

    if (!requestHost) {
      return responseBuffer;
    }

    const page = responseBuffer.toString('utf8');
    const pageWithDevScript = injectDevScript(page, req);

    return injectStatusElement(
      pageWithDevScript,
      `devserver: running local package <b>${library}</b> with back-end <b>${proxyTarget}</b>`,
    );
  };

  const replaceHTML = () => {
    const page = fs.readFileSync(localIndex).toString('utf8');

    return injectStatusElement(
      page,
      `devserver: running local index file <b>${localIndex}</b> with back-end <b>${proxyTarget}</b>`,
    );
  };

  const proxyMiddleware = createProxyMiddleware({
    changeOrigin: true,
    headers: {
      origin: proxyTarget,
    },
    onProxyRes: responseInterceptor(
      async (responseBuffer, proxyRes, req, res) => {
        rewriteLocationHeader(res, req);

        if (res.statusCode >= 200 && res.statusCode < 300) {
          const contentType = res.getHeader('content-type');

          if (contentType && contentType.startsWith('text/html')) {
            if (localIndex) {
              return replaceHTML();
            }

            return rewriteHTML(responseBuffer, req);
          }
        }

        return responseBuffer;
      },
    ),
    proxyTimeout: 10000,
    secure: false,
    selfHandleResponse: true,
    target: proxyTarget,
    timeout: 10000,
  });

  return {
    static: {
      directory: __dirname,
      publicPath,
    },
    setupMiddlewares: (middlewares) => {
      middlewares.push({
        name: 'cspace-proxy',
        path: '/',
        middleware: proxyMiddleware,
      });

      return middlewares;
    },
  };
};
