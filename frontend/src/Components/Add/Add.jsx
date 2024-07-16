import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContainerExample() {
  return (
    <Container fluid>
     <Row style={{padding:"40px"}}>
        <Col sm={1} style={{marginTop:'0px',
          width:'50px',
          marginLeft:'50px'}}>
            <a  href="/Admin01cashierReg" style={{backgroundColor:'red',
              padding:'0px 5px 0px 5px',
              borderRadius:'10px',
              border:'1px solid red', 
              fontSize:'30px',
              color:'black'}}>+</a>
        
        </Col>
        <Col style={{fontSize:"25px"}}sm={11}>Add Delivery Agents</Col>
      </Row>
    </Container>

    
  );
}

export default ContainerExample;