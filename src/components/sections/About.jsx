import React from 'react';

export default function About(props) {
  return (
    <div>
      <h2>Welcome to the CollectionSpace Demo</h2>
      <p>
        CollectionSpace is a free, open-source collections management application for museums, historical societies, natural science collections, and more.
      </p>
      <p>
        This demo site is running the <a href="http://www.collectionspace.org/current_release/">current version</a> of the <i>common</i> installation, which includes fields and procedures common to most collecting organizations. If you’re interested in a version of CollectionSpace configured to meet the needs of a specific domain, please visit our <a href="http://demo.collectionspace.org">demo landing page</a> to view all available options. Examples include Anthropology, Botanical Garden, Fine Art, Herbarium, and Local History &amp; Material Culture.
      </p>
      <p>
        To log in, use the email <strong>admin@core.collectionspace.org</strong>, with the case-sensitive password <strong>Administrator</strong>. To view in read-only mode, use the email <strong>reader@core.collectionspace.org</strong> with the password <strong>reader</strong>.
      </p>
      <p>
        Not sure where to get started? Follow along with one of our quick-start guides:
      </p>
      <ul>
        <li>
          Create a new object: <a href="http://bit.ly/newobjpdf">PDF</a> <a href="https://vimeo.com/112212895">Screencast</a>
        </li>
        <li>
          Link to an image: <a href="http://bit.ly/linkimgpdf">PDF</a> <a href="https://vimeo.com/112214418">Screencast</a>
        </li>
        <li>
          Add a storage location: <a href="http://bit.ly/storlocpdf">PDF</a> <a href="https://vimeo.com/112818120">Screencast</a>
        </li>
      </ul>
      <p>
        We rebuild this demo site weekly so don't worry, you won't break it!
      </p>
    </div>
  );
}
