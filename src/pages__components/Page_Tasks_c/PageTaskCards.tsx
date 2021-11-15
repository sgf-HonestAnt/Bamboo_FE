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
  COMPLETED,
  AWAITED,
  IN_PROGRESS,
  ANY,
  WILD_STR,
  WILD_NUM,
} from "../../utils/constants";
import {
  getSelectedDateAsString,
  getTomorrowAsString,
} from "../../utils/funcs/dateTimeFuncs";

type PageTaskCardsProps = {
  tasks: taskInt[];
  categoryToShow: string;
  statusToShow: string;
  sharedToShow: boolean;
  valueToShow: number;
  repeatToShow: string;
};

const PageTaskCards = (props: PageTaskCardsProps) => {
  const {
    tasks,
    categoryToShow,
    statusToShow,
    sharedToShow,
    valueToShow,
    repeatToShow,
  } = props;
  const filterByCat = categoryToShow
    ? tasks.filter((t) => t.category === categoryToShow)
    : tasks.filter((t) => t.category !== WILD_STR);
  const filterByStat =
    statusToShow !== ANY
      ? tasks.filter((t) => t.status === statusToShow)
      : tasks.filter((t) => t.status !== WILD_STR);
  const filterBySha = sharedToShow
    ? tasks.filter((t) => t.sharedWith && t.sharedWith.length > 1)
    : tasks.filter((t) => !t.sharedWith || t.sharedWith.length < 1);
  const filterByVal =
    valueToShow !== WILD_NUM
      ? tasks.filter((t) => t.value === valueToShow)
      : tasks.filter((t) => t.value !== WILD_NUM);
  const filterByRep =
    repeatToShow !== ANY
      ? tasks.filter((t) => t.repeats === repeatToShow)
      : tasks.filter((t) => t.repeats !== WILD_STR);
  const filteredTasks = filterByCat.concat(
    filterByStat,
    filterBySha,
    filterByVal,
    filterByRep
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
        {filteredTasks.length > 0 ? (
          filteredTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            return (
              <Card key={i} className='m-1'>
                {/* <Card.Img variant='top' src={t.image} /> */}
                <Card.Title style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP) {t.deadline?.slice(0, 10)}
                </Card.Title>
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
