import { History } from "history";
import { useEffect, useState } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import "./styles.css";

type LoadingPageProps = {
  history: History<unknown> | string[];
};

export default function LoadingPage(props: LoadingPageProps) {
  // 👏 change this page.
  const { history } = props;
  const [counter, setCounter] = useState(3);
  useEffect(() => {
    if (counter === 0) {
      history.push("/");
    }
    setTimeout(() => {
      setCounter(counter - 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);
  return (
    <Row className='error-page p-1'>
      <Col>
        {/* <h1 className='d-inline-block animate__animated animate__bounce'>An animated element</h1> */}
        <Spinner animation='grow'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
        {/* Attempting redirect to <Link to='/dash'>dashboard</Link> in {counter} */}
      </Col>
    </Row>
  );
}
