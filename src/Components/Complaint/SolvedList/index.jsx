import { Alert, Timeline } from "antd";
import { useEffect, useState } from "react";
import { listResolvedComplaints } from "../../../Helper/hooks/useMaisCidadeApi/useComplaint";
import { dateFormat } from "../../../Helper/transformData/dateFormat";

export const SolvedList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    window.addEventListener("complaintRefresh", () => {
      fetchComplaints();
    });

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const { data } = await listResolvedComplaints();
    setComplaints(data);
  };

  return (
    <Timeline
      items={complaints.map((complaint) => ({
        children: (
          <>
            <h3>{complaint?.title}</h3>
            <h3>{dateFormat(complaint?.createdAt)}</h3>
            <span>{complaint?.category?.name}</span>
            <p>{complaint?.description}</p>

            <Alert
              message={complaint?.resolution}
              type="success"
            />
          </>
        ),
      }))}
    />
  );
};
