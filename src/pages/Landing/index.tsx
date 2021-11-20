import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, RouteComponentProps } from "react-router-dom";
import { PandaSleep } from "../../pages__components/App/Pandas";
import "./styles.css";

const LandingPage = ({ history, location, match }: RouteComponentProps) => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    token && history.push("/dash");
    console.log(location.pathname);
  }, [location.pathname]);
  return (
    <Container fluid>
      <Row className='landing-page'>
        <Col sm={4}>
          <div>Welcome to Panda, the strong and steady big task app.</div>
          <div>
            Would you like to <Link to='/login'>log in</Link>?
          </div>
          <PandaSleep />
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
