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

export const listResolvedComplaints = () => useMaisCidadeApi.get("complaint/resolved", {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
})

export const updateComplaint = (id, params) =>
  useMaisCidadeApi.put(`complaint/${id}`, params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });