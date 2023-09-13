/* eslint-disable react/prop-types */
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Col, Collapse, Row } from "antd";
import styled from "styled-components";
import { RecentList } from "../../Components/Complaint/RecentsList";
import { Complaints } from "../../Components/Complaint/Maker";
import { ComplaintCreate } from "../../Components/Complaint/Create";
import { ComplaintTopRated } from "../../Components/Complaint/TopRated";

function Home() {
  const position = {
    lat: -16.32821197930284,
    lng: -48.957288265846564,
  };

  const Content = styled("div")`
    
    width: calc(100vw - 80px);

    @media (min-width: 768px) {
      width: 100%;
    }
  `;

  return (
    <>
      <Row>
        <Col lg={18} md={24}>
          <Content
            style={{
              height: "calc(100vh - 200px)",
              // width: "calc(100vw - 80px)",
            }}
          >
            {position.lat && position.lng && (
              <MapContainer
                center={position}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <ComplaintCreate />
                <Complaints />
              </MapContainer>
            )}
          </Content>
        </Col>
        <Col lg={6} md={24} styled={{ width: "100%" }}>
          <Row gutter={[8, 8]} styled={{ padding: 50 }}>
            <Collapse
              style={{
                padding: 20,
                width: "100%",
                height: "calc(100vh - 200px)",
                overflow: "auto",
              }}
              items={[
                {
                  key: "1",
                  label: "Demandas mais solicitadas",
                  children: <ComplaintTopRated />
                },
                {
                  key: "2",
                  label: "Últimas reclamações",
                  children: <RecentList />,
                },
              ]}
              bordered={false}
              defaultActiveKey={["1", "2"]}
            />
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default Home;
