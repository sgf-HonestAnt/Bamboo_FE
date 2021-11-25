import { Row, Col, Card } from "react-bootstrap";
import { taskInt, userInt } from "../../typings/interfaces";
import { ICOCLOCK, ICOCIRCLE } from "../../utils/appIcons";
import {
  COMPLETED,
  AWAITED,
  IN_PROGRESS,
  WILD_NUM,
  ALL_TASKS,
  TODAY,
  TOMORROW,
  ANY_CAT,
  NO_DEADLINE,
  OVERDUE,
  TASKS,
} from "../../utils/appConstants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
  getShortDateAsString,
} from "../../utils/f_dates";
import { useEffect, useState } from "react";
import { getTasksPageTasksQuery } from "../../utils/f_tasks";
import getIcon from "../../utils/f_getIcon";

type FilterForm = {
  tasksToShow: string | null;
  categoryToShow: string;
  statusToShow: string;
  //sharedToShow: boolean;
  valueToShow: number;
  //repeatToShow: string;
};
type PageTaskCardsProps = {
  form: FilterForm;
  user: userInt;
};
const PageTaskCards = (props: PageTaskCardsProps) => {
  console.log(props.form);

  const { form, user } = props;
  const { tasksToShow, categoryToShow, statusToShow, valueToShow } = form;
  const [data, setData] = useState<any>([]); // {total, tasks}
  let dueAndFutureTasks: taskInt[] = [];
  let overdueTasks: taskInt[] = [];
  // get dates to filter tasks
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const todayAsString = getSelectedDateAsString(today); //2021-11-19
  const tomorrowAsString = getSelectedDateAsString(tomorrow); //2021-11-20

  const setCriteria = () => {
    const deadline =
      tasksToShow === TODAY
        ? `deadline=${todayAsString}&`
        : tasksToShow === TOMORROW
        ? `deadline=${tomorrowAsString}&`
        : !tasksToShow
        ? `!deadline&`
        : "";
    const category =
      categoryToShow === ANY_CAT ? "" : `category=${categoryToShow}&`;
    const status =
      statusToShow === AWAITED
        ? `status=${AWAITED}&`
        : statusToShow === IN_PROGRESS
        ? `status=${IN_PROGRESS}&`
        : statusToShow === COMPLETED
        ? `status=${COMPLETED}&`
        : "";
    const value = valueToShow === WILD_NUM ? "" : `value=${valueToShow}&`;
    return {
      deadline,
      category,
      status,
      value,
    };
  };

  const loadPageTaskCards = async () => {
    const { deadline, category, status, value } = setCriteria();
    const criteria = `${deadline}${category}${status}${value}createdBy=${user._id}`;
    console.log(criteria);
    const fetchedData = await getTasksPageTasksQuery(criteria);
    if (tasksToShow) {
      const firstIndex = fetchedData.tasks.findIndex(
        (t: taskInt) => t.deadline?.slice(0, 10) === todayAsString
      );
      for (let i = 0; i < fetchedData.tasks.length; i++) {
        !fetchedData.tasks[i].deadline &&
          dueAndFutureTasks.push(fetchedData.tasks[i]);
        fetchedData.tasks[i].deadline &&
          i >= firstIndex &&
          dueAndFutureTasks.push(fetchedData.tasks[i]);
        fetchedData.tasks[i].deadline &&
          i < firstIndex &&
          overdueTasks.push(fetchedData.tasks[i]);
      }
    }
    tasksToShow === OVERDUE
      ? setData({ tasks: overdueTasks, total: overdueTasks.length })
      : setData(fetchedData);
    console.log("OVERDUE=>", overdueTasks);
    console.log("OVERDUE=>", overdueTasks[0]?._id);
  };
  useEffect(() => {
    loadPageTaskCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  const { tasks, total } = data;
  console.log(data);
  return (
    <Row className='tasks-page__tasks-row'>
      <Col sm={6}>
        <h4 style={{ padding: "10px" }}>
          {tasksToShow === TODAY
            ? `Today, ${getDayMonthYearAsString(today)}`
            : tasksToShow === TOMORROW
            ? `Tomorrow, ${getDayMonthYearAsString(tomorrow)}`
            : !tasksToShow
            ? NO_DEADLINE
            : tasksToShow === OVERDUE
            ? OVERDUE
            : ALL_TASKS}
        </h4>
        <h5>
          There {data.total && data.total < 2 ? "is" : "are"}{" "}
          {data.total ? data.total : 0}{" "}
          {data.total && data.total < 2 ? "task" : TASKS} to perform
        </h5>
        {data.total && data.total > 0 && tasksToShow === ALL_TASKS ? ( // ALL TASKS
          tasks?.map((t: taskInt, i: number) => {
            console.log(t._id);
            t.deadline && getShortDateAsString(t.deadline);
            const overdue = overdueTasks.find((task) => task === t); //"6197b2665068c1db0d52eac0"
            console.log(overdue);
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(todayAsString) ? (
              <span className='icon-semi-urgent'>
                <ICOCLOCK />
                DUE
              </span>
            ) : overdue ? (
              <span className='icon-urgent'>
                <ICOCLOCK />
                OVERDUE
              </span>
            ) : (
              ""
            );
            return (
              <div key={i}>
                <div>
                  {icon} {t.title} ({t.value}XP)
                </div>
                <div>{t.desc} {t.category}</div>
                <div>
                  {t.deadline ? getShortDateAsString(t.deadline) : "any time"}{" "}
                  {clock}
                </div>
              </div>
            );
          })
        ) : total && total > 0 ? ( // TODAY/TOMORROW/NO DEADLINE/OVERDUE
          tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(todayAsString) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            return (
              <div key={i}>
                {icon} {t.title} ({t.value}XP) due HOHO
                {t.deadline
                  ? getShortDateAsString(t.deadline)
                  : "any time"}{" "}
                {clock}
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
