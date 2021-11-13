import { History } from "history";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

type ErrorPageProps = {
  history: History<unknown> | string[];
  errorMessage?: string;
};

const ErrorPage = (props: ErrorPageProps) => {
  const { history, errorMessage } = props;
  const [counter, setCounter] = useState(5);
  useEffect(() => {
    if (counter === 0) {
      history.push("/");
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
  }, [counter]);
  return (
    <Row className='error-page p-1'>
      <Col>
        {errorMessage && errorMessage}
        <br />
        Attempting redirect to <Link to='/dash'>dashboard</Link> in {counter}
      </Col>
    </Row>
  );
};

export default ErrorPage;
