

import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navigationbar/Navbar"
import AdminFooter from "../components/AdminFooter/AdminFooter"


const AdminLayout = () => {
  return (
    <>
    <Container style={{maxWidth:'100%',padding:'0'}}>
    <Row>
    <Col>
     <Navbar/>
    </Col>
  </Row>
  <Row style={{ minHeight: "100vh", marginTop: "-20px" }}>
    <Col>
      <Outlet />
    </Col>
  </Row>
  <Row>
    <Col>
      <AdminFooter/>
    </Col>
  </Row>
  </Container>
</>
);
}


export default AdminLayout
