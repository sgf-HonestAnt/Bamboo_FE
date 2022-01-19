import { History } from "history";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./styles.css";

type LoadingPageProps = {
  history: History<unknown> | string[];
};
export default function LoadingPage(props: LoadingPageProps) {
  const { history } = props;
  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Row className='error-page p-1'>
      <Col>{/* <Spinner animation='grow' /> */}</Col>
    </Row>
  );
}
