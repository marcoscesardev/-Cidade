/* eslint-disable react/prop-types */
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { listComplaints } from "../../../Helper/hooks/useMaisCidadeApi/useComplaint";
import { Marker, Popup } from "react-leaflet";
import { Badge, Button, Space } from "antd";
import L from "leaflet";
import { dateFormat } from "../../../Helper/transformData/dateFormat";
import {
  createComplaintRate,
  deleteComplaintRate,
  listComplaintRates,
} from "../../../Helper/hooks/useMaisCidadeApi/useRates";
import { getCategoryIcon } from "../../../Helper/Constants/icons";

const ComplaintMark = ({ complaintInfo }) => {
  const [complaintRate, setComplaintRate] = useState({});

  useEffect(() => {
    fetchComplaintRates();
  }, []);

  const fetchComplaintRates = async () => {
    const { data } = await listComplaintRates(complaintInfo.id);
    setComplaintRate(data);
  };

  const handleRate = async (rate) => {
    if (complaintRate?.userValuation) {
      await deleteComplaintRate(complaintRate.userRateId)
    }

    const valuation = rate === "positive" ? 1 : -1
    if (valuation !== complaintRate?.userValuation) {
      await createComplaintRate({
        valuation,
        complaintId: complaintInfo.id,
      });
    }

    window.dispatchEvent(new Event("complaintTopRatedRefresh"));
    await fetchComplaintRates();
  };

  return (
    <Popup style={{ background: "red" }}>
      <h3>{complaintInfo?.title}</h3>
      <h5>{complaintInfo?.category?.name}</h5>
      <p>{complaintInfo?.description}</p>
      <span>{dateFormat(complaintInfo?.createdAt)}</span>
      <Space size="middle">
        <h5>Qualificar reclamação:</h5>
        <Badge showZero count={complaintRate.positive || 0}>
          <Button
            type={complaintRate?.userValuation === 1 ? "primary" : "default"}
            shape="circle"
            onClick={() => handleRate("positive")}
            icon={<LikeOutlined />}
          />
        </Badge>
        <Badge showZero count={complaintRate.negative || 0}>
          <Button
            onClick={() => handleRate("negative")}
            type={complaintRate?.userValuation === -1 ? "primary" : "default"}
            shape="circle"
            icon={<DislikeOutlined />}
          />
        </Badge>
      </Space>
    </Popup>
  );
};

const Complaint = ({ complaintInfo }) => {
  const iconUrl = getCategoryIcon(complaintInfo?.category?.name);

  const Icon = new L.Icon({
    iconUrl,
    iconSize: [50, 50],
    iconAnchor: [25, 55],
    popupAnchor: [0, 0],
    shadowSize: [41, 41],
  })

  return (
    <Marker
      position={[complaintInfo?.latitude, complaintInfo?.longitude]}
      icon={Icon}
    >
      <ComplaintMark complaintInfo={complaintInfo} />
    </Marker>
  );
};

export const Complaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    window.addEventListener("complaintRefresh", () => {
      fetchComplaints();
    });

    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const { data } = await listComplaints();
    setComplaints(data);
  };

  return (
    <>
      {complaints?.map((complaint) => (
        <Complaint key={complaint.id} complaintInfo={complaint} />
      ))}
    </>
  );
};
