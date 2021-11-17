import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { currentTasksInt, taskInt, userInt } from "../../typings/interfaces";
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
  ANY_CAT,
} from "../../utils/constants";
import {
  getDayMonthYearAsString,
  getSelectedDateAsString,
  getTomorrowAsString,
  getTomorrowDayMonthYearAsString,
} from "../../utils/funcs/dateTimeFuncs";
import { useEffect, useState } from "react";
import fetchTasksByQuery from "../../utils/funcs/fetchTasksByQuery";
import { CompleteTaskButton, ProgressTaskButton } from "../../utils/buttons";
import PageTaskButtonWithModal from "./PageTaskButtonWithModal";
import { FiCheck, FiWatch } from "react-icons/fi";

type FilterForm = {
  tasksToShow: string;
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { tasksToShow, categoryToShow, statusToShow, valueToShow } = form;
  const [data, setData] = useState<any>([]);
  const todayAsDate = new Date();
  const tomorrowAsDate = getTomorrowAsString(todayAsDate);
  const today = getSelectedDateAsString(todayAsDate);
  const tomorrow = getSelectedDateAsString(tomorrowAsDate);
  const deadlineCriteria =
    tasksToShow === TODAY
      ? `deadline=${today}&`
      : tasksToShow === TOMORROW
      ? `deadline=${tomorrow}&`
      : tasksToShow === NO_DEADLINE
      ? "deadline=none&"
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
    setData(fetchedTasks);
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
  // const anyTimeTasks = allTasks.filter((t) => !t.deadline);
  // const tasksToday = allTasks.filter(
  //   (t) =>
  //     (t.deadline?.slice(0, 10) === today || t.deadline === NONE) &&
  //     t.status !== COMPLETED
  // );
  // const tasksTomorrow = allTasks.filter(
  //   (t) => t.deadline?.slice(0, 10) === tomorrow && t.status !== COMPLETED
  // );
  // const data.tasks =
  //   tasksToShow === TODAY
  //     ? tasksToday
  //     : tasksToShow === TOMORROW
  //     ? tasksTomorrow
  //     : tasksToShow === NO_DEADLINE
  //     ? anyTimeTasks
  //     : allTasks;

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
    <Row className='tasks-page__tasks-row'>
      <Col sm={6}>
        <h4 style={{ padding: "10px" }}>
          {tasksToShow === TODAY
            ? `Today, ${getDayMonthYearAsString()}`
            : tasksToShow === TOMORROW
            ? `Tomorrow, ${getTomorrowDayMonthYearAsString()}`
            : tasksToShow === NO_DEADLINE
            ? "Tasks without Deadline"
            : "All Tasks"}
        </h4>
        <h4>
          There {total && total < 2 ? "is" : "are"} {total ? total : 0}{" "}
          {total && total < 2 ? "task" : "tasks"} to perform
        </h4>
        {total && total > 0 && tasksToShow === ALL_TASKS ? (
          // const group = groupByDate(tasks, "deadline");
          // console.log(group);  
          // Instead of mapping filtered tasks, I want to fetch all tasks in order of date ascending and then paginate them
          tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const statusClass =
              t.status === AWAITED
                ? "tasks-page__tasks-row__single-task awaited"
                : t.status === COMPLETED
                ? "tasks-page__tasks-row__single-task completed"
                : "tasks-page__tasks-row__single-task in-progress";
            // const groupByDate = (array, deadline) => {
            //   let grouped = {};
            //   for (let i = 0; i < array.length; i++) {
            //     let p = array[i][deadline];
            //     if (!grouped[p]) {
            //       grouped[p] = [];
            //     }
            //     grouped[p].push(array[i]);
            //   }
            //   return grouped;
            // }
            return (
              <div>
                {icon} {t.title} ({t.value}XP)
                <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiWatch />
                </Button>
                <Button variant='light' className='ml-1 my-1 px-2'>
                  <FiCheck />
                </Button>
              </div>
              // <Button
              //   key={i}
              //   variant='light'
              //   className={statusClass}
              //   //onClick={handleShow}
              // >
              //   {icon} {t.title} ({t.value}XP)
              // </Button>
              // <PageTaskButtonWithModal
              //   task={t}
              //   index={i}
              //   show={show}
              //   handleShow={handleShow}
              //   handleClose={handleClose}
              //   statusClass={statusClass}
              //   icon={icon}
              // />
              // <>
              //   <Button
              //     key={i}
              //     variant='light'
              //     className={statusClass}
              //     onClick={handleShow}>
              //     {icon} {t.title} ({t.value}XP)
              //   </Button>
              //   <Modal show={show} onHide={handleClose}>
              //     <Modal.Header closeButton>
              //       <Modal.Title>{t.title}</Modal.Title>
              //     </Modal.Header>
              //     <Modal.Body>
              //       <img src={t.image} alt={t.title} className='img-fluid' />
              //       <div>Category: {t.category}</div>
              //       <div>Description: {t.desc}</div>
              //       <div>Value: {t.value}XP</div>
              //       <div>Deadline: {t.deadline}</div>
              //       <ProgressTaskButton />
              //       <CompleteTaskButton />
              //     </Modal.Body>
              //     <Modal.Footer>
              //       <Button
              //         variant='light'
              //         className='mb-3 mr-1'
              //         onClick={handleClose}>
              //         Close
              //       </Button>
              //     </Modal.Footer>
              //   </Modal>
              // </>
            );
          })
        ) : total && total > 0 ? (
          tasks?.map((t: taskInt, i: number) => {
            const icon = getIcon(t.category);
            const statusClass =
              t.status === AWAITED
                ? "tasks-page__tasks-row__single-task awaited"
                : t.status === COMPLETED
                ? "tasks-page__tasks-row__single-task completed"
                : "tasks-page__tasks-row__single-task in-progress";
            return (
              <div>
                {icon} {t.title} ({t.value}XP)
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
