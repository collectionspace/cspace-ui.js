import ProtectedPage from './ProtectedPage';

export default class SearchPage extends ProtectedPage {
  constructor() {
    super();

    this.url = '/search';
    this.selector = '.cspace-ui-SearchPage--common';
  }
}
