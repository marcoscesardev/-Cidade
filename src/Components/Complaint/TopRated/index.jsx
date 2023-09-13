/* eslint-disable react/prop-types */
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Avatar, List, Space } from "antd";
import { listTopRatedComplaints } from "../../../Helper/hooks/useMaisCidadeApi/useComplaint";
import { getCategoryIcon } from "../../../Helper/Constants/icons";

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

export const ComplaintTopRated = () => {
  const [topRatedComplaints, setTopRatedComplaints] = useState([]);
  useEffect(() => {
    window.addEventListener("complaintRefresh", () => {
      fetchTopRatedComplaints();
    })

    window.addEventListener("complaintTopRatedRefresh", () => {
      fetchTopRatedComplaints();
    })

    fetchTopRatedComplaints();
  }, []);

  const fetchTopRatedComplaints = async () => {
    const { data } = await listTopRatedComplaints();
    setTopRatedComplaints(data);
  };

  return (
    <List
      itemLayout="vertical"
      size="small"
      dataSource={topRatedComplaints}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText
              icon={LikeOutlined}
              text={item.positiveVotes}
              key="list-vertical-star-o"
            />,
            <IconText
              icon={DislikeOutlined}
              text={item.negativeVotes}
              key="list-vertical-like-o"
            />,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={getCategoryIcon(item.categoryName)} />}
            title={item.complaint_title}
            description={item.categoryName}
          />
          {item.complaint_description}
        </List.Item>
      )}
    />
  );
};

// Adicionar logo mais cidade
// Adicionar user_type representante poder público para marcar como resolvido
// Adicionar botão de logout
// Adicionar página de minhas reclamações
// Adicionar página de reclamações resolvidas