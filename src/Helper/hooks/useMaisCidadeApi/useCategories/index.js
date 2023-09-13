import { useMaisCidadeApi } from "..";

export const listCategories = () =>
  useMaisCidadeApi.get("categories", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });