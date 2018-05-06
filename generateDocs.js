/* eslint import/no-extraneous-dependencies: "off" */

/*
 * Generate cspace-ui documentation.
 */

import fs from 'fs';
import glob from 'glob';
import jsonFile from 'jsonfile';

/**
 * Remove newlines from multiline strings. These are assumed to be backtick quoted HTML messages,
 * where the newlines exist for source formatting, but don't matter for rendering. Since the
 * message documentation will be output as JSON, with double quoted strings, the resulting "\n"
 * escapes in the messages would make them less understandable.
 */
const cleanMessage = message => message.replace(/\n\s*/g, ' ');

/**
 * Generate documentation for react-intl messages. This must be done after the npm build script has
 * executed, so that messages will have been extracted to build/messages.
 */
const generateMessagesDoc = () => {
  const messages = [];

  glob.sync('build/messages/**/*.json').forEach((filename) => {
    jsonFile.readFileSync(filename).forEach((message) => {
      messages.push(message);
    });
  });

  messages.sort((messageA, messageB) => {
    const a = messageA.id.toLowerCase();
    const b = messageB.id.toLowerCase();

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    return 0;
  });

  const docFile = fs.createWriteStream('docs/configuration/messages.js');

  docFile.write('/*\n');
  docFile.write(' * This file contains all messages used in cspace-ui, to be used as a reference for customization\n');
  docFile.write(' * or translation. The default export is an object containing the default messages in the\n');
  docFile.write(' * application, keyed by message ID. Messages may be customized by supplying overrides via the\n');
  docFile.write(' * messages configuration property.\n');
  docFile.write(' *\n');
  docFile.write(' * Messages should conform to the ICU Message syntax: https://formatjs.io/guides/message-syntax/\n');
  docFile.write(' */\n\n');

  docFile.write('export default {');

  messages.forEach((message) => {
    const id = message.id;
    const desc = message.description;
    const value = cleanMessage(message.defaultMessage);

    docFile.write('\n');

    if (desc) {
      docFile.write(`  // ${desc}\n`);
    }

    docFile.write('  ');
    docFile.write(JSON.stringify(id));
    docFile.write(': ');
    docFile.write(JSON.stringify(value));
    docFile.write(',\n');
  });

  docFile.write('}');
  docFile.end();
};

generateMessagesDoc();
