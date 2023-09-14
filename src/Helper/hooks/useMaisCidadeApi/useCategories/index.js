import { useMaisCidadeApi } from "..";

export const listCategories = () =>
  useMaisCidadeApi.get("categories", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const createCategory = (params) => {
  return useMaisCidadeApi.post("categories", params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
