import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {
  Badge,
  Button,
  Col,
  Collapse,
  Divider,
  Drawer,
  Row,
  Space,
  Timeline,
} from "antd";
import ComplaintForm from "../../Components/Complaint/Form";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";

function MarkMap() {
  const [position, setPosition] = useState({}); // Posição inicial do marcador
  const [openDrawer, setOpenDrawer] = useState(false);

  useMapEvents({
    click: (e) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      setPosition({ lat, lng });
    },
  });

  return (
    <>
      {openDrawer && (
        <Drawer
          title="Adicionar um marcador"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
        >
          <ComplaintForm latitude={position.lat} longitude={position.lng} />
        </Drawer>
      )}
      {position.lat && position.lng && (
        <Marker position={position}>
          <Popup>
            <div style={{ textAlign: "center" }}>
              <Divider>Deseja adicionar?</Divider>
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  setOpenDrawer(true);
                }}
              >
                Sim
              </Button>
              <Divider type="vertical" />
              <Button
                size="small"
                onClick={() => setTimeout(setPosition({}), 10000)}
                type="default"
              >
                Não
              </Button>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
}

const HospitalIcon = new L.Icon({
  iconUrl:
    "https://www.shareicon.net/data/256x256/2016/08/04/806609_medical_512x512.png", // https://www.shareicon.net/placeholder-maps-and-location-hospital-map-location-health-clinic-medical-806609
  iconSize: [50, 50],
  iconAnchor: [25, 55],
  popupAnchor: [0, 0],
  shadowSize: [41, 41],
});

const CurrentLocation = () => {
  const [position, setPosition] = useState([0, 0]); // Posição inicial do marcador

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = -16.355438133177344;
        const lng = -48.94366206926707;
        setPosition([lat, lng]);
      });
    }
  }, []);

  return (
    <Marker position={position} icon={HospitalIcon}>
      <Popup style={{ background: "red" }}>
        <h1>Saúde</h1>
        <p>
          Não fui atendido por não haver médicos de plantão. Existiam mais 17
          pessoas ...
        </p>
        <span>10/10/2021 - 10:08</span>
        <Space size="middle">
          <h5>Qualificar reclamação:</h5>
          <Badge count={5}>
            <Button shape="circle" icon={<LikeOutlined />} />
          </Badge>
          <Badge count={5}>
            <Button shape="circle" icon={<DislikeOutlined />} />
          </Badge>
        </Space>
      </Popup>
    </Marker>
  );
};

function App() {
  const [position, setPosition] = useState({}); // Posição inicial do marcador

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setPosition({ lat, lng });
      });
    }
  }, []);

  // console.log(position);
  // calc(100vw - 158px)
  return (
    <>
      <Row>
        <Col lg={18} md={24}>
          <div
            style={{
              height: "calc(100vh - 200px)",
              // width: "calc(100vw - 80px)",
            }}
          >
            {position.lat && position.lng && (
              <MapContainer
                center={position}
                zoom={15}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MarkMap />
                <CurrentLocation />
              </MapContainer>
            )}
          </div>
        </Col>
        <Col lg={6} md={24}>
          <Row gutter={[8, 8]}>
            <Collapse
              items={[
                {
                  key: "1",
                  label: "Localização",
                  children: (
                    <p style={{ paddingLeft: 24 }}>
                      A dog is a type of domesticated animal. Known for its
                      loyalty and faithfulness, it can be found as a welcome
                      guest in many households across the world.
                    </p>
                  ),
                },
                {
                  key: "2",
                  label: "Últimas reclamações",
                  children: (
                    <Timeline
                      items={[
                        {
                          children: "Create a services site 2015-09-01",
                        },
                        {
                          children: "Solve initial network problems 2015-09-01",
                        },
                        {
                          children: "Technical testing 2015-09-01",
                        },
                        {
                          children: "Network problems being solved 2015-09-01",
                        },
                      ]}
                    />
                  ),
                },
              ]}
              bordered={false}
              defaultActiveKey={["1", "2"]}
            />
            ;
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default App;
