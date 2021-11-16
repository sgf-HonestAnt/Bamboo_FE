import { Row, Col, Card } from "react-bootstrap";
import { currentTasksInt, taskInt } from "../../typings/interfaces";
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
  ALL_TASKS,
  TODAY,
  TOMORROW,
  NO_DEADLINE,
} from "../../utils/constants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
  getTomorrowAsString,
  getTomorrowDayMonthYearAsString,
} from "../../utils/funcs/dateTimeFuncs";

type FilterForm = {
  tasksToShow: string;
  categoryToShow: string;
  statusToShow: string;
  sharedToShow: boolean;
  valueToShow: number;
  repeatToShow: string;
};

type PageTaskCardsProps = {
  tasks: currentTasksInt;
  form: FilterForm;
};

const PageTaskCards = (props: PageTaskCardsProps) => {
  const { tasks, form } = props;
  const {
    tasksToShow,
    categoryToShow,
    statusToShow,
    sharedToShow,
    valueToShow,
    repeatToShow,
  } = form;
  const { categories, awaited, in_progress, completed } = tasks;
  // today, tomorrow, and future
  const allTasks = awaited.concat(in_progress, completed);
  const todayAsDate = new Date();
  const tomorrowAsDate = getTomorrowAsString(todayAsDate);
  const today = getSelectedDateAsString(todayAsDate);
  const tomorrow = getSelectedDateAsString(tomorrowAsDate);
  const anyTimeTasks = allTasks.filter((t) => !t.deadline);
  const tasksToday = allTasks.filter(
    (t) =>
      (t.deadline?.slice(0, 10) === today || t.deadline === NONE) &&
      t.status !== COMPLETED
  );
  const tasksTomorrow = allTasks.filter(
    (t) => t.deadline?.slice(0, 10) === tomorrow && t.status !== COMPLETED
  );
  const filteredTasks =
    tasksToShow === TODAY
      ? tasksToday
      : tasksToShow === TOMORROW
      ? tasksTomorrow
      : tasksToShow === NO_DEADLINE
      ? anyTimeTasks
      : allTasks;

  // const filterByCat = categoryToShow
  //   ? tasks.filter((t) => t.category === categoryToShow)
  //   : tasks.filter((t) => t.category !== WILD_STR);
  // const filterByStat =
  //   statusToShow !== ANY
  //     ? tasks.filter((t) => t.status === statusToShow)
  //     : tasks.filter((t) => t.status !== WILD_STR);
  // const filterBySha = sharedToShow
  //   ? tasks.filter((t) => t.sharedWith && t.sharedWith.length > 1)
  //   : tasks.filter((t) => !t.sharedWith || t.sharedWith.length < 1);
  // const filterByVal =
  //   valueToShow !== WILD_NUM
  //     ? tasks.filter((t) => t.value === valueToShow)
  //     : tasks.filter((t) => t.value !== WILD_NUM);
  // const filterByRep =
  //   repeatToShow !== ANY
  //     ? tasks.filter((t) => t.repeats === repeatToShow)
  //     : tasks.filter((t) => t.repeats !== WILD_STR);
  // const filteredTasks = filterByCat.concat(
  //   filterByStat,
  //   filterBySha,
  //   filterByVal,
  //   filterByRep
  // );
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
    <Row className="tasks-page__tasks-row">
      <Col sm={4}>
        <h4 style={{ padding: "10px" }}>
          {tasksToShow === TODAY
            ? `Today, ${getDayMonthYearAsString()}`
            : tasksToShow === TOMORROW
            ? `Tomorrow, ${getTomorrowDayMonthYearAsString()}`
            : tasksToShow === NO_DEADLINE
            ? "Tasks without Deadline"
            : "All Tasks"}
        </h4>
        <h4>There are {filteredTasks.length} tasks to perform</h4>
        {filteredTasks.length > 0 && tasksToShow === ALL_TASKS ? (
          // Instead of mapping filtered tasks, I want to fetch all tasks in order of date ascending and then paginate them
          <div></div>
        ) : filteredTasks.length > 0 ? (
          filteredTasks.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const statusClass = t.status === AWAITED ? "tasks-page__tasks-row__single-task awaited" : t.status === COMPLETED ? "tasks-page__tasks-row__single-task completed" : "tasks-page__tasks-row__single-task in-progress"
            return (
              <div key={i} className={statusClass}>
                {/* <div.Img variant='top' src={t.image} /> */}
                <div style={{ fontSize: "1.5em" }}>
                  {icon} {t.title} ({t.value}XP)
                </div>
              </div>
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
