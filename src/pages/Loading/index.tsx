import { History, Location } from "history";
import { useEffect } from "react";
import { Row } from "react-bootstrap";
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
      search
        ? history.push(`/${search.split("?pathname=")[1]}`)
        : history.push("/");
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Row className='error-page p-1'> </Row>;
}
