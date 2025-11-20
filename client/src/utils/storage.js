const TOKEN_KEY = 'mern_token';
const USER_KEY = 'mern_user';

const safeStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage;
};

export const storage = {
  setSession(token, user) {
    const store = safeStorage();
    if (!store) return;
    store.setItem(TOKEN_KEY, token);
    if (user) {
      store.setItem(USER_KEY, JSON.stringify(user));
    }
  },
  setUser(user) {
    const store = safeStorage();
    if (!store) return;
    store.setItem(USER_KEY, JSON.stringify(user));
  },
  getToken() {
    const store = safeStorage();
    if (!store) return null;
    return store.getItem(TOKEN_KEY);
  },
  getUser() {
    const store = safeStorage();
    if (!store) return null;
    const raw = store.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear() {
    const store = safeStorage();
    if (!store) return;
    store.removeItem(TOKEN_KEY);
    store.removeItem(USER_KEY);
  },
};

