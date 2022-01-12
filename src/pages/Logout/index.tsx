import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { PandaSleep } from "../__Components/Pandas";
import "./styles.css";

export default function LogoutPage({ history }: RouteComponentProps) {
  return (
    <Container fluid>
      <Row className='logout-page'>
        <Col sm={4}>
          <div>You have been successfully logged out.</div>
          <Link to='/login'>Log in</Link> again?
          <PandaSleep />
        </Col>
      </Row>
    </Container>
  );
};