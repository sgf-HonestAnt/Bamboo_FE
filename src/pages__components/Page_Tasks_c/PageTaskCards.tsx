import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { currentTasksInt, taskInt, userInt } from "../../typings/interfaces";
import {
  ICOHOUSE,
  ICOWORK,
  ICORELATE,
  ICOFINANCE,
  ICOFIT,
  ICOWELLNESS,
  ICOCLOCK,
  ICOCIRCLE,
  ICOSTAR,
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
  ANY_CAT,
  TASK_CATEGORIES,
  TASK_CATEGORY_ICONS,
} from "../../utils/constants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
  getTomorrowAsString,
  getTomorrowDayMonthYearAsString,
} from "../../utils/funcDates";
import { useEffect, useState } from "react";
import fetchTasksByQuery from "../../utils/funcs/fetchTasksByQuery";
import { CompleteTaskButton, ProgressTaskButton } from "../../utils/buttons";
import { FiCheck, FiWatch } from "react-icons/fi";
import { getTaskByDeadline } from "../../utils/funcTasks";

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
  // console.log(form);
  const { tasksToShow, categoryToShow, statusToShow, valueToShow } = form;
  // the data we will work with
  const [data, setData] = useState<any>([]); // {total, tasks}
  // get dates as strings
  const todayAsDate = new Date();
  const tomorrowAsDate = getTomorrowAsString(todayAsDate);
  const today = getSelectedDateAsString(todayAsDate);
  const tomorrow = getSelectedDateAsString(tomorrowAsDate);
  // criteria to apply if deadline
  const deadlineCriteria =
    tasksToShow === TODAY
      ? `deadline=${today}&`
      : tasksToShow === TOMORROW
      ? `deadline=${tomorrow}&`
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
    console.log("CRITERIA=>", criteria);
    const fetchedTasks = await fetchTasksByQuery(criteria);
    const noDeadline = await getTaskByDeadline(null);
    console.log("=>", tasksToShow);
    !tasksToShow
      ? setData(fetchedTasks)
      : setData({ tasks: noDeadline, total: noDeadline.length });
    console.log(data);
  };
  // today, tomorrow, and future
  // const allTasks = tasks;
  useEffect(() => {
    loadPageTaskCards(
      deadlineCriteria,
      categoryCriteria,
      statusCriteria,
      valueCriteria
    );
  }, [form]);
  const { links, pageTotal, tasks, total } = data;
  console.log(data);
  const getIcon = (category: string) => {
    const index = TASK_CATEGORIES.findIndex(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    );
    if (index !== -1) {
      let CAT_ICON = TASK_CATEGORY_ICONS[index];
      return <CAT_ICON />;
    } else {
      return <ICOSTAR />;
    }
  };
  // then show by date
  return (
    <Row className='tasks-page__tasks-row'>
      <Col sm={6}>
        <h4 style={{ padding: "10px" }}>
          {tasksToShow === TODAY
            ? `Today, ${getDayMonthYearAsString()}`
            : tasksToShow === TOMORROW
            ? `Tomorrow, ${getTomorrowDayMonthYearAsString()}`
            : tasksToShow === "All Tasks"
            ? "All Tasks"
            : !tasksToShow
            ? "No Deadline"
            : ""}
        </h4>
        <h4>
          There {data.total && data.total < 2 ? "is" : "are"}{" "}
          {data.total ? data.total : 0}{" "}
          {data.total && data.total < 2 ? "task" : "tasks"} to perform
        </h4>
        {data.total && data.total > 0 && tasksToShow === ALL_TASKS ? (
          // Instead of mapping filtered tasks, I want to fetch all tasks in order of date ascending and then paginate them
          data.tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(today) ? (
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
                  {t.title} ({t.value}XP) {clock}
                  <Button variant='light' className='ml-1 my-1 px-2'>
                    <FiWatch />
                  </Button>
                  <Button variant='light' className='ml-1 my-1 px-2'>
                    <FiCheck />
                  </Button>
                </div>
              </div>
            );
          })
        ) : total && total > 0 ? (
          data.tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(today) ? (
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
                {icon} {t.title} ({t.value}XP) {clock}
                <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiWatch />
                </Button>
                <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiCheck />
                </Button>
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
