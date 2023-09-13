import { useMaisCidadeApi } from "..";

export const createComplaintRate = (params) =>
  useMaisCidadeApi.post("rates", params, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

export const listComplaintRates = (complaintId) =>
  useMaisCidadeApi.get(`rates/complaint/${complaintId}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  export const deleteComplaintRate = (rateId) => {
    return useMaisCidadeApi.delete(`rates/${rateId}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  }