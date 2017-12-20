import Page from './Page';

export default class CreatePage extends Page {
  constructor() {
    super();

    this.url = '/create';
    this.selector = '.cspace-ui-CreatePage--common';
  }

  hasRecordType(recordTypeDescriptor) {
    const link = this.getRecordLink(recordTypeDescriptor);

    return (!!link && link.isVisible());
  }

  hasVocabulary(vocabularyDescriptor) {
    const link = this.getVocabularyLink(vocabularyDescriptor);

    return (!!link && link.isVisible());
  }

  getRecordLink(recordTypeDescriptor) {
    const {
      serviceType,
      name,
      displayName,
    } = recordTypeDescriptor;

    const container = (typeof serviceType !== 'undefined')
      ? browser.$(this.selector).$(`.cspace-ui-CreatePagePanel--${serviceType}`)
      : browser.$(this.selector);

    if (!container) {
      return null;
    }

    const links = container.$$(`*[id="${name}"]`);

    if (links.length === 0) {
      return null;
    }

    const link = links[0];

    if (typeof displayName !== 'undefined' && link.getText() !== displayName) {
      return null;
    }

    if (
      typeof name !== 'undefined' &&
      typeof serviceType !== 'undefined' &&
      serviceType !== 'authority'
    ) {
      const url = `/record/${name}`;
      const href = link.getAttribute('href');

      if (!href || !href.endsWith(url)) {
        return null;
      }
    }

    return link;
  }

  getVocabularyLink(vocabularyDescriptor) {
    const {
      authorityName,
      name,
      displayName,
    } = vocabularyDescriptor;

    const recordLink = this.getRecordLink({
      name: authorityName,
      serviceType: 'authority',
    });

    if (!recordLink) {
      return null;
    }

    const container = recordLink.$('..');

    if (!container) {
      return null;
    }

    const links = container.$$(`a[id="${authorityName}/${name}"]`);

    if (links.length === 0) {
      return null;
    }

    const link = links[0];

    if (typeof displayName !== 'undefined' && link.getText() !== displayName) {
      return null;
    }

    if (typeof name !== 'undefined') {
      const url = `/record/${authorityName}/${name}`;
      const href = link.getAttribute('href');

      if (!href || !href.endsWith(url)) {
        return null;
      }
    }

    return link;
  }
}
