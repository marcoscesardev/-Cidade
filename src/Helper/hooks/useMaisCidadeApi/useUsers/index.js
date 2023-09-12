import { useMaisCidadeApi } from "..";

export const createUser = (params) => useMaisCidadeApi.post("users", params);

export const updateUser = (params) => useMaisCidadeApi.put("users", params);

export const getUser = (params) => useMaisCidadeApi.get("users", params);