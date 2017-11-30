import page from './page';
import userMenu from './userMenu';

export default Object.assign({},
  page({
    url: '/search',
    selector: '.cspace-ui-SearchPage--common',
  }),
  userMenu(),
);
