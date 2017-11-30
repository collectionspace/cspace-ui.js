import page from './page';
import loginForm from './loginForm';

export default Object.assign({},
  page({
    url: '/login',
    selector: '.cspace-ui-LoginPage--common',
  }),
  loginForm(),
);
