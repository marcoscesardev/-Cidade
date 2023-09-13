import { useMaisCidadeApi } from "..";

export const createComplaint = (params) =>
  useMaisCidadeApi.post("complaint", params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const listComplaints = () =>
  useMaisCidadeApi.get("complaint", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const listTopRatedComplaints = () => useMaisCidadeApi.get("complaint/top-rated", {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});