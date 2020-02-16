export const TOKEN_KEY = "@mix-challenge-token";
export const USER_ADMIN = "@mix-challenge-admin";
export const USER_ID = "@mix-challenge-id";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUserId = () => localStorage.getItem(USER_ID);
export const isAdmin = () => localStorage.getItem(USER_ADMIN) === 'true';

export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const setUserId = id => {
    localStorage.setItem(USER_ID, id);
};

export const setAdmin = admin => {
    localStorage.setItem(USER_ADMIN, admin);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ADMIN);
    localStorage.removeItem(USER_ID);
};