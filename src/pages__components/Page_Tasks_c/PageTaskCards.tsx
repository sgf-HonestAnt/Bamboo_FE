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
  NO_DEADLINE,
  OVERDUE,
} from "../../utils/constants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
} from "../../utils/f_getDatesTimes";
import { useEffect, useState } from "react";
import fetchTasksByQuery from "../../utils/funcs/fetchTasksByQuery";
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
  console.log(props.form);

  const { form, user } = props;
  const { tasksToShow, categoryToShow, statusToShow, valueToShow } = form;
  const [data, setData] = useState<any>([]); // {total, tasks}
  // set these after fetchTasksByQuery
  //let selectedOverdue; // {tasks, total}
  // includes tasks with a deadline prior to today (tasks are sorted by deadline when in fetchTasksByQuery)
  //let selectedToday; // {tasks, total} // INCLUDE "DUE NOW" STRING IN DEADLINE FOR DISPLAY
  // includes deadline today [criteria] and all overdue tasks
  //let selectedTomorrow; // {tasks, total} // INCLUDE "DUE SOON" STRING IN DEADLINE FOR DISPLAY
  // includes deadline tomorrow [criteria]
  //let selectedNoDeadline; // {tasks, total} <=== THIS IS THE TROUBLESOME ONE, AS I CANNOT QUERY BY DEADLINE NULL, IF I COULD THEN THE FILTERING WOULD BE SIMPLER. INCLUDE "OVERDUE" STRING IN DEADLINE FOR DISPLAY
  // includes !deadline [fetchTasksByDeadline(null)]
  //let selectedAll; // {tasks, total}
  // all deadline types selected [criteria ""]

  // data must always look like {tasks:[{}], total: 100}

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
    const fetchedData = await fetchTasksByQuery(criteria);
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
    console.log("OVERDUE=>",overdueTasks[0]?._id);
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
          {data.total && data.total < 2 ? "task" : "tasks"} to perform
        </h5>
        {/*********** ALL TASKS ***********/}
        {data.total && data.total > 0 && tasksToShow === ALL_TASKS ? (
          tasks?.map((t: taskInt, i: number) => {
            console.log(t._id)
            const overdue = overdueTasks.find((task) => task === t); //"6197b2665068c1db0d52eac0"
            // find this and fix it at next session!
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
            // const statusClass =
            //   t.status === AWAITED
            //     ? "tasks-page__tasks-row__single-task awaited"
            //     : t.status === COMPLETED
            //     ? "tasks-page__tasks-row__single-task completed"
            //     : "tasks-page__tasks-row__single-task in-progress";
            return (
              <div key={i}>
                {/* <div className='tasks-page__tasks-row__category'>
                  {icon} {t.category}
                </div> */}
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
          tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const clock = t.deadline?.includes(todayAsString) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            // const statusClass =
            //   t.status === AWAITED
            //     ? "tasks-page__tasks-row__single-task awaited"
            //     : t.status === COMPLETED
            //     ? "tasks-page__tasks-row__single-task completed"
            //     : "tasks-page__tasks-row__single-task in-progress";
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
