import { Col, Row, theme } from "antd";

// eslint-disable-next-line react/prop-types
const ContainerCenter = ({ children }) => {
  const {
    token: { colorBgSpotlight, colorBgContainer },
  } = theme.useToken();

  return (
    <Row style={{ height: "100vh", background: colorBgSpotlight }}>
      <Col
        style={{
          alignSelf: "center",
          textAlign: "center",
          background: colorBgContainer,
          padding: 20,
          borderRadius: 10,
        }}
        span={12}
        offset={6}
      >
        <img
          style={{ height: "300px" }}
          src="icons/logo-mais-cidade.png"
          alt="Logo Mais Cidade"
        />
        {children}
      </Col>
    </Row>
  );
};

export default ContainerCenter;
