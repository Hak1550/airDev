import jwtDecode from 'jwt-decode';

export default function emptyCache() {
  if ('caches' in window) {
    caches.keys().then(names => {
      // Delete all the cache files
      names.forEach(name => {
        caches.delete(name);
      });
    });

    // Makes sure the page reloads. Changes are only visible after you refresh.
    // window.location.reload(true);
  }
}

export const auth = {
  setToken(token, remember) {
    if (remember) {
      localStorage.setItem('user_token', token);
    } else {
      sessionStorage.setItem('user_token', token);
    }
  },
  getToken() {
    let token = '';
    if (localStorage.getItem('user_token')) {
      token = localStorage.getItem('user_token');
    } else if (sessionStorage.getItem('user_token')) {
      token = sessionStorage.getItem('user_token');
    }
    if (token) {
      return token;
    } else {
      // this.logout();
      return null;
    }
  },

  logout() {
    emptyCache();
    window.localStorage.setItem('CREDENTIALS_FLUSH', Date.now().toString());
    window.localStorage.removeItem('CREDENTIALS_FLUSH');
    localStorage.removeItem('user_token');
    sessionStorage.removeItem('user_token');
    window.localStorage.clear();
    setTimeout(() => {}, 3000);
  },

  getUserData() {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token ? token : '');
      } catch {
        return {};
      }
    }
    return {};
  },
  isLogin() {
    const token = this.getToken();
    if (token !== null) {
      // @ts-ignore
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        this.logout();
        return false;
      }
      return true;
    }
    return false;
  },
};
