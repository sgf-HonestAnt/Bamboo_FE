import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { PandaSleep } from "../../pages__components/Pandas";

const LogoutPage = ({ history, location, match }: RouteComponentProps) => {
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <Container fluid>
      <Row className='login-form'>
        <Col sm={4}>
          <div>You have been successfully logged out.</div>
          <Link to='/login'>Log in</Link> again?
          <PandaSleep />
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutPage;
