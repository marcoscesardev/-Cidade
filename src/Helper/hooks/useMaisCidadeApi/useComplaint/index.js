import { useMaisCidadeApi } from "..";

export const createComplaint = (params) =>
  useMaisCidadeApi.post("complaint", params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
