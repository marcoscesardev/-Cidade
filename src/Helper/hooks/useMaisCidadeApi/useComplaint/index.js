import { useMaisCidadeApi } from "..";

export const createComplaint = (params) =>
  useMaisCidadeApi.post("complaint", params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const listComplaints = () =>
  useMaisCidadeApi.get("complaint?categoryId=13&category_id=13", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const listTopRatedComplaints = () => useMaisCidadeApi.get("complaint/top-rated", {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
});

export const listResolvedComplaints = () => useMaisCidadeApi.get("complaint/resolved")

export const updateComplaint = (id, params) =>
  useMaisCidadeApi.patch(`complaint/${id}`, params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });