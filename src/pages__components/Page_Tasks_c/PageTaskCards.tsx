import { Row, Col, Card } from "react-bootstrap";
import { taskInt, userInt } from "../../typings/interfaces";
import { ICOCLOCK, ICOCIRCLE } from "../../utils/icons";
import {
  COMPLETED,
  AWAITED,
  IN_PROGRESS,
  WILD_NUM,
  ALL_TASKS,
  TODAY,
  TOMORROW,
  ANY_CAT,
  YESTERDAY,
} from "../../utils/constants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
} from "../../utils/f_getDatesTimes";
import { useEffect, useState } from "react";
import fetchTasksByQuery from "../../utils/funcs/fetchTasksByQuery";
import { getTaskByDeadline } from "../../utils/f_getTasks";
import getIcon from "../../utils/funcs/f_getIcon";

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
  const { form, user } = props;
  console.log(form);
  const { tasksToShow, categoryToShow, statusToShow, valueToShow } = form;
  const [data, setData] = useState<any>([]); // {total, tasks}
  // get dates to filter tasks
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() + 1);
  const todayAsString = getSelectedDateAsString(today); //2021-11-19
  const tomorrowAsString = getSelectedDateAsString(tomorrow); //2021-11-20
  const yesterdayAsString = getSelectedDateAsString(yesterday); //2021-11-18
  // set criteria
  const deadlineCriteria =
    tasksToShow === TODAY
      ? `deadline=${todayAsString}&deadline=${yesterdayAsString}&`
      : tasksToShow === TOMORROW
      ? `deadline=${tomorrowAsString}&`
      : tasksToShow === YESTERDAY
      ? `deadline=${yesterdayAsString}&`
      : "";
  const categoryCriteria =
    categoryToShow === ANY_CAT ? "" : `category=${categoryToShow}&`;
  const statusCriteria =
    statusToShow === AWAITED
      ? `status=${AWAITED}&`
      : statusToShow === IN_PROGRESS
      ? `status=${IN_PROGRESS}&`
      : statusToShow === COMPLETED
      ? `status=${COMPLETED}&`
      : "";
  const valueCriteria = valueToShow === WILD_NUM ? "" : `value=${valueToShow}&`;
  const loadPageTaskCards = async (
    deadline: string,
    category: string,
    status: string,
    value: string
  ) => {
    const criteria = `${deadline}${category}${status}${value}createdBy=${user._id}`;
    console.log(criteria);
    const fetchedTasks = await fetchTasksByQuery(criteria);
    const noDeadline = await getTaskByDeadline(null);
    console.log("=>", tasksToShow);
    tasksToShow
      ? setData(fetchedTasks)
      : setData({ tasks: noDeadline, total: noDeadline.length });
  };
  useEffect(() => {
    loadPageTaskCards(
      deadlineCriteria,
      categoryCriteria,
      statusCriteria,
      valueCriteria
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  const { links, pageTotal, tasks, total } = data;
  console.log(data);
  const yesterdayTasks = tasks?.filter(
    (t: taskInt) => t.deadline?.slice(0, 10) === yesterdayAsString
  );
  const yesterdayLength = yesterdayTasks?.length;
  console.log(yesterdayTasks);
  return (
    <Row className='tasks-page__tasks-row'>
      <Col sm={6}>
        <h4 style={{ padding: "10px" }}>
          {tasksToShow === TODAY
            ? `Today, ${getDayMonthYearAsString(today)}`
            : tasksToShow === TOMORROW
            ? `Tomorrow, ${getDayMonthYearAsString(tomorrow)}`
            : tasksToShow === ALL_TASKS
            ? "All Tasks"
            : "No Deadline"}
        </h4>
        <h4>
          There {data.total && data.total < 2 ? "is" : "are"}{" "}
          {data.total ? data.total : 0}{" "}
          {data.total && data.total < 2 ? "task" : "tasks"} to perform
          {tasksToShow === ALL_TASKS && " overall"}
          {tasksToShow === TOMORROW && " tomorrow"}
          {tasksToShow === TODAY && ", " + yesterdayLength + " overdue"}
          {!tasksToShow && " without a deadline"}
        </h4>
        {data.total && data.total > 0 && tasksToShow === ALL_TASKS ? (
          // Instead of mapping filtered tasks, I want to fetch all tasks in order of date ascending and then paginate them
          data.tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(todayAsString) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            const statusClass =
              t.status === AWAITED
                ? "tasks-page__tasks-row__single-task awaited"
                : t.status === COMPLETED
                ? "tasks-page__tasks-row__single-task completed"
                : "tasks-page__tasks-row__single-task in-progress";
            return (
              <div key={i}>
                <div className='tasks-page__tasks-row__category'>
                  {icon} {t.category}
                </div>
                <div>
                  {icon} {t.title} ({t.value}XP) due{" "}
                  {t.deadline ? t.deadline.slice(0, 10) : "any time"} {clock}
                  {/* <Button variant='light' className='ml-1 my-1 px-2'>
                    <FiWatch />
                  </Button>
                  <Button variant='light' className='ml-1 my-1 px-2'>
                    <FiCheck />
                  </Button> */}
                </div>
              </div>
            );
          })
        ) : total && total > 0 ? (
          data.tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(todayAsString) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            const statusClass =
              t.status === AWAITED
                ? "tasks-page__tasks-row__single-task awaited"
                : t.status === COMPLETED
                ? "tasks-page__tasks-row__single-task completed"
                : "tasks-page__tasks-row__single-task in-progress";
            return (
              <div key={i}>
                {icon} {t.title} ({t.value}XP) due{" "}
                {t.deadline ? t.deadline.slice(0, 10) : "any time"} {clock}
                {/* <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiWatch />
                </Button>
                <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiCheck />
                </Button> */}
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
