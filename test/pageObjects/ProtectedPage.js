import Page from './Page';
import UserMenu from './UserMenu';

export default class ProtectedPage extends Page {
  constructor() {
    super();

    this.selector = '.cspace-ui-Banner--common';

    this.userMenu = new UserMenu();
  }

  getUserScreenName() {
    return this.userMenu.getUserScreenName();
  }

  getLogoutLink() {
    return this.userMenu.getLogoutLink();
  }

  isLoggedInAs(username) {
    return this.userMenu.isLoggedInAs(username);
  }

  isUserMenuVisible() {
    return this.userMenu.isVisible();
  }

  isVisible() {
    return super.isVisible() && this.isUserMenuVisible();
  }

  logout() {
    this.userMenu.logout();

    return this;
  }
}
