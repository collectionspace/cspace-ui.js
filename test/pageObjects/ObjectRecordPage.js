import ProtectedPage from './ProtectedPage';

export default class ObjectRecordPage extends ProtectedPage {
  constructor() {
    super();

    this.url = '/record/collectionobject';
    this.selector = ['.cspace-ui-RecordPage--object .cspace-ui-TitleBar--common', 'aside=Object'];
  }
}
