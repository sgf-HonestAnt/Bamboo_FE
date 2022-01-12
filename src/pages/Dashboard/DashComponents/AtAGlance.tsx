import { History, Location } from "history";
import { Row, Col } from "react-bootstrap";
import { getDayMonthYearAsString } from "../../../utils/f_dates";
import { FiCalendar } from "react-icons/fi";
import DashTasks from "./DashTasks";

type AtAGlanceProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};

export default function AtAGlance(props: AtAGlanceProps) {
  const { today, history, location } = props;
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  return (
    <div className='dashboard__at-a-glance m-0 p-2'>
      <div className='dashboard__alt__card-header'>
        At A Glance
        <h5>
          <FiCalendar />
          &nbsp;{dayMonthYearAsString}
        </h5>
      </div>
      <Row>
        <Col className='col-12'>
          <DashTasks today={today} history={history} location={location} />
        </Col>
      </Row>
    </div>
  );
}
