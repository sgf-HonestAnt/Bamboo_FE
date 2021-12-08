import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { PandaSleep } from "../../pages__SharedComponents/Pandas";
import "./styles.css";

const LandingPage = ({ location }: RouteComponentProps) => {
  useEffect(() => {
    console.log(location.pathname); // "/landing-page"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  return (
    <Container fluid>
      <Row className='landing-page'>
        <Col sm={4}>
          <div>Welcome to Panda, the gentle task app.</div>
          <div>
            Would you like to <Link to='/login'>log in</Link>?
          </div>
          <div><PandaSleep /></div>
        </Col>
      </Row>
    </Container>
  );
};
export default LandingPage;
