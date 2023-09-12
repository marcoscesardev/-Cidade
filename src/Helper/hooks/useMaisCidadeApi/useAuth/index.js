import { useMaisCidadeApi } from "..";

export const authLogin = (params) => useMaisCidadeApi.post("auth/login", params);