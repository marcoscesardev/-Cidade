import { useMaisCidadeApi } from "../hooks/useMaisCidadeApi";
import { authLogin } from "../hooks/useMaisCidadeApi/useAuth";
import { createUser } from "../hooks/useMaisCidadeApi/useUsers";




export const authProvider = {
  isAuthenticated: window.localStorage.getItem('token') ? true : false,
  signin: async (params) => {
    return authLogin(params)
  },
  signUp: async (params) => {
    return createUser(params)
  },
  signout: (params) => {
    window.localStorage.setItem('token', null);
  },
  userInfo: () => {
    return {
      username: 'admin',
      email: 'm@m.com'
    }
  }
};
