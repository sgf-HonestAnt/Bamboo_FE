import { History, Location } from "history";
import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "./styles.css";

type LoadingPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function LoadingPage(props: LoadingPageProps) {
  const { history, location } = props;
  useEffect(() => {
    const { search } = location;
    setTimeout(() => {
      history.push(`/${search.split("?pathname=")[1]}`);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("LOADING", location.search.split("?pathname=")[1]);
  return (
    <Row className='error-page p-1'>
      <Col>{/* <Spinner animation='grow' /> */}</Col>
    </Row>
  );
}
