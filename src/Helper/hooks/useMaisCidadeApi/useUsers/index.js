import { useMaisCidadeApi } from "..";

export const createUser = (params) => useMaisCidadeApi.post("users", params);

export const updateUser = (id, params) =>
  useMaisCidadeApi.put(`users/${id}`, params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const getUsers = () =>
  useMaisCidadeApi.get("users", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const deleteUser = (id) =>
  useMaisCidadeApi.delete(`users/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
