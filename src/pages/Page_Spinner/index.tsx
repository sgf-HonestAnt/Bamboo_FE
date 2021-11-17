import { History } from "history";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./styles.css";

type SpinnerPageProps = {
  history: History<unknown> | string[];
};

const SpinnerPage = (props: SpinnerPageProps) => {
  const { history } = props;
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 1000);
  });
  return (
    <Row className='spinner-page p-1'>
      <Col>...</Col>
    </Row>
  );
};

export default SpinnerPage;
