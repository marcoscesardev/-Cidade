import { authLogin } from "../hooks/useMaisCidadeApi/useAuth";
import { createUser } from "../hooks/useMaisCidadeApi/useUsers";

const user = () => JSON.parse(window.localStorage.getItem('user'))
export const authProvider = {
  me: user,
  isAuthenticated: () => !!window.localStorage.getItem('token'),
  signin: async (params) => {
    return authLogin(params)
  },
  signUp: async (params) => {
    return createUser(params)
  },
  signout: () => {
    window.localStorage.setItem('token', null);
  },
  userInfo: () => {
    return {
      username: 'admin',
      email: 'm@m.com'
    }
  },
  isUserAdmin: () => user().level === 'admin',
  isUserRpp: () => user().level === 'rpp',
};
