import React from 'react';
import { defineMessages, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import styles from '../../../styles/cspace-ui/About.css';

const messages = defineMessages({
  title: {
    id: 'about.title',
    description: 'Title of the about page.',
    defaultMessage: 'Welcome to the CollectionSpace Demo',
  },
  contentHTML: {
    id: 'about.contentHTML',
    description: 'Content of the about page. This message is interpreted as HTML, so HTML rules apply. For example, newlines are ignored, and <, >, and & must be escaped.',
    defaultMessage: `
      <p>
        CollectionSpace is a free, open-source collections management application for museums,
        historical societies, natural science collections, and more.
      </p>
      <p>
        This demo site is running the
        <a href="http://www.collectionspace.org/current_release/">current version</a> of the
        <i>common</i> installation, which includes fields and procedures common to most collecting
        organizations. If you’re interested in a version of CollectionSpace configured to meet the
        needs of a specific domain, please visit our
        <a href="https://www.collectionspace.org/demo/">demo landing page</a>
        to view all available options. Examples include Anthropology, Botanical Garden, Fine Art,
        Herbarium, and Local History &amp; Material Culture.
      </p>
      <p>
        To log in, use the email <strong>admin@core.collectionspace.org</strong>, with the
        case-sensitive password <strong>Administrator</strong>. To view in read-only mode, use the
        email <strong>reader@core.collectionspace.org</strong> with the password
        <strong>reader</strong>.
      </p>
      <p>
        Not sure where to get started? Follow along with one of our quick-start guides:
      </p>
      <ul>
        <li>
          <span>Create a new object:</span>
          <a href="http://bit.ly/newobjpdf">PDF</a>
          <a href="https://vimeo.com/112212895">Screencast</a>
        </li>
        <li>
          <span>Link to an image:</span>
          <a href="http://bit.ly/linkimgpdf">PDF</a>
          <a href="https://vimeo.com/112214418">Screencast</a>
        </li>
        <li>
          <span>Add a storage location:</span>
          <a href="http://bit.ly/storlocpdf">PDF</a>
          <a href="https://vimeo.com/112818120">Screencast</a>
        </li>
      </ul>
      <p>
        We rebuild this demo site weekly so don't worry, you won't break it!
      </p>
    `,
  },
});

export default function About() {
  return (
    <div className={styles.common}>
      <h2><FormattedMessage {...messages.title} /></h2>
      <FormattedHTMLMessage {...messages.contentHTML} tagName="div" />
    </div>
  );
}
