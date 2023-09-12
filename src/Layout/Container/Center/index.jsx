import { Col, Row } from "antd";


// eslint-disable-next-line react/prop-types
const ContainerCenter = ({ children }) => {
  return (
   <Row>
      <Col span={12} offset={6}>
        {children}
      </Col>
    </Row>
  )  
}

export default ContainerCenter;