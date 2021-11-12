import { Row, Col, Card } from "react-bootstrap";
import { taskInt } from "../../typings/interfaces";
import {
  ICON_HOUSEHOLD,
  ICON_WORK,
  ICON_RELATIONSHIPS,
  ICON_FINANCE,
  ICON_FITNESS,
  ICON_WELLBEING,
} from "../../utils/icons";
import {
  HOUSEHOLD,
  WORK,
  RELATIONSHIPS,
  FINANCE,
  FITNESS,
  WELLBEING,
  NONE,
} from "../../utils/constants";
import getDateString from "../../utils/funcs/datestring";
import getTomorrow from "../../utils/funcs/tomorrow";

type PageTaskCardsProps = {
  tasks: taskInt[];
};

const PageTaskCards = (props: PageTaskCardsProps) => {
  const { tasks } = props;
  const todayAsDate = new Date();
  const tomorrowAsDate = getTomorrow(todayAsDate);
  const today = getDateString(todayAsDate);
  const tomorrow = getDateString(tomorrowAsDate);
  const anyTimeTasks = tasks.filter((t) => !t.deadline);
  const todayTasks = tasks.filter(
    (t) => t.deadline?.slice(0, 10) === today || t.deadline === NONE
  );
  const tomorrowTasks = tasks.filter(
    (t) => t.deadline?.slice(0, 10) === tomorrow
  );
  const futureTasks = tasks.filter(
    (t) =>
      t.deadline?.slice(0, 10) !== today &&
      t.deadline !== NONE &&
      t.deadline?.slice(0, 10) !== tomorrow &&
      t.deadline
  );
  const getIcon = (category: string) => {
    return category === HOUSEHOLD ? (
      <ICON_HOUSEHOLD />
    ) : category === WORK ? (
      <ICON_WORK />
    ) : category === RELATIONSHIPS ? (
      <ICON_RELATIONSHIPS />
    ) : category === FINANCE ? (
      <ICON_FINANCE />
    ) : category === FITNESS ? (
      <ICON_FITNESS />
    ) : category === WELLBEING ? (
      <ICON_WELLBEING />
    ) : (
      <></>
    );
  };
  // then show by date
  return (
    <Row>
      <Col sm={4}>
        <h4 style={{ padding: "10px" }}>Today</h4>
        {todayTasks.length > 0 ? (
          todayTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            return (
              <Card key={i} className='m-1'>
                {/* <Card.Img variant='top' src={t.image} /> */}
                <Card.Title style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP) {t.deadline?.slice(0, 10)}
                </Card.Title>
                <Card.Text>{t.desc}</Card.Text>
                {/* <Card.Text>shared with: {t.sharedWith}</Card.Text>
              <Card.Text>created by: {t.createdBy}</Card.Text> */}
                {/* <Card.Text>status: {t.status}</Card.Text>
              <Card.Text>type: {t.type}</Card.Text> */}
              </Card>
            );
          })
        ) : (
          <Card className='m-1'>
            <Card.Title style={{ fontSize: "1.3em" }}>
              Nothing to see here.
            </Card.Title>
          </Card>
        )}
      </Col>
      <Col sm={4}>
        <h4 style={{ padding: "10px" }}>Tomorrow</h4>
        {tomorrowTasks.length > 0 ? (
          tomorrowTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            return (
              <Card key={i} className='m-1'>
                {/* <Card.Img variant='top' src={t.image} /> */}
                <Card.Title style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP) {t.deadline?.slice(0, 10)}
                </Card.Title>
                <Card.Text>{t.desc}</Card.Text>
                {/* <Card.Text>shared with: {t.sharedWith}</Card.Text>
              <Card.Text>created by: {t.createdBy}</Card.Text> */}
                {/* <Card.Text>status: {t.status}</Card.Text>
              <Card.Text>type: {t.type}</Card.Text> */}
              </Card>
            );
          })
        ) : (
          <Card className='m-1'>
            <Card.Title style={{ fontSize: "1.3em" }}>
              Nothing to see here.
            </Card.Title>
          </Card>
        )}
      </Col>
      <Col sm={4}>
        {/* !DEADLINE */}
        <h4 style={{ padding: "10px" }}>Anytime</h4>
        {anyTimeTasks.length > 0 ? (
          anyTimeTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            return (
              <Card key={i} className='m-1'>
                {/* <Card.Img variant='top' src={t.image} /> */}
                <Card.Title style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP)
                </Card.Title>
                <Card.Text>{t.desc}</Card.Text>
                {/* <Card.Text>shared with: {t.sharedWith}</Card.Text>
              <Card.Text>created by: {t.createdBy}</Card.Text> */}
                {/* <Card.Text>status: {t.status}</Card.Text>
              <Card.Text>type: {t.type}</Card.Text> */}
              </Card>
            );
          })
        ) : (
          <Card className='m-1'>
            <Card.Title style={{ fontSize: "1.3em" }}>
              Nothing to see here.
            </Card.Title>
          </Card>
        )}
      </Col>
      <Col sm={4}>
        <h4 style={{ padding: "10px" }}>
          Future tasks (will be displayed by date)
        </h4>
        {futureTasks.length > 0 ? (
          futureTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            return (
              <Card key={i} className='m-1'>
                {/* <Card.Img variant='top' src={t.image} /> */}
                <Card.Title style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP) {t.deadline?.slice(0, 10)}
                </Card.Title>
                <Card.Text>{t.desc}</Card.Text>
                {/* <Card.Text>shared with: {t.sharedWith}</Card.Text>
              <Card.Text>created by: {t.createdBy}</Card.Text> */}
                {/* <Card.Text>status: {t.status}</Card.Text>
              <Card.Text>type: {t.type}</Card.Text> */}
              </Card>
            );
          })
        ) : (
          <Card className='m-1'>
            <Card.Title style={{ fontSize: "1.3em" }}>
              Nothing to see here.
            </Card.Title>
          </Card>
        )}
      </Col>
    </Row>
  );
};

export default PageTaskCards;
