import { History, Location } from "history";
import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
// import { Form } from "react-bootstrap";
// import { ICOCIRCLE, ICOCLOCK, ICOURGENT } from "../../../utils/appIcons";
import { AddNewTaskButton } from "../../../pages__SharedComponents/Buttons";
import {
  getDayMonthYearAsString,
  // getMinMaxDateAsString,
} from "../../../utils/f_dates";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";
import UrgentTasks from "./UrgentTasks";
import { Row, Col } from "react-bootstrap";
import TodayTasks from "./TodayTasks";
import TotalTasks from "./TotalTasks";
import CompletedTasks from "./CompletedTasks";
// import MiniDragNDrop from "./MiniDragNDrop";

type DashTasksCardProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashTasksCard = (props: DashTasksCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  const { history, location } = props; // today
  // add today tasks
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { min } = getMinMaxDateAsString(new Date());
  // const [form, setForm] = useState<setTaskInt>({
  //   category: "",
  //   title: "",
  //   desc: "",
  //   value: 0,
  //   repeats: "never",
  //   sharedWith: [],
  //   deadline: min,
  // });
  // const handleChange = (e: { target: { id: any; value: any } }) => {
  //   const id = e.target.id;
  //   const value = e.target.value;
  //   setForm({
  //     ...form,
  //     [id]: value,
  //   });
  // };
  // const handleSubmit = async (e: {
  //   currentTarget: any;
  //   preventDefault: () => void;
  //   stopPropagation: () => void;
  // }) => {
  //   e.preventDefault();
  //   console.log(form);
  //   try {
  //     const { _id } = await attemptPostTask(
  //       form,
  //       refreshToken,
  //       history,
  //       location
  //     );
  //     console.log("CREATED NEW TASK", _id);
  //     dispatch(fillTasksAction()); // 👈HERE!
  //     setTimeout(() => {
  //       history.push("/");
  //     }, 1000);
  //   } catch (e) {
  //     console.log("ERROR CREATING NEW TASK", e);
  //     setErrorMessage("ERROR CREATING NEW TASK");
  //     history.push("/error");
  //   }
  // };
  // complete today task(s)
  // const completedTasks: string[] = [];
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  // const handleSubmitComplete = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   // console.log(completedTasks);
  //   try {
  //     await attemptCompleteTasks(
  //       my_user,
  //       completedTasks,
  //       refreshToken,
  //       achievements,
  //       history,
  //       location,
  //       dispatch
  //     );
  //     refreshUserLevel(my_user, 0, dispatch); // this should be the value of the completed task. not 0...
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // const handleChangeCompleted = (e: { target: { value: any } }) => {
  //   const value = e.target.value;
  //   if (completedTasks.includes(value)) {
  //     const index = completedTasks.indexOf(value);
  //     completedTasks.splice(index, 1);
  //   } else {
  //     completedTasks.push(value);
  //   }
  // };
  return (
    <div className='dashboard__tasks-card m-2 yellow'>
      <div className='dashboard__card-header'>{dayMonthYearAsString}</div>
      {allTasks.length < 1 ? (
        <>
          <div>No tasks awaited today!</div>
          <AddNewTaskButton label='Add task' handleClick={handleShow} />
        </>
      ) : (
        <>
          <Row>
            {/* <MiniDragNDrop
            today={today}
            handleSubmitComplete={handleSubmitComplete}
            handleChangeCompleted={handleChangeCompleted}
            allTasks={allTasks}
          /> */}
            <Col sm={6}>
              <UrgentTasks />
            </Col>
            <Col sm={6}>
              <TodayTasks />
            </Col>
            <Col sm={6}>
              <TotalTasks />
            </Col>
            <Col sm={6}>
              <CompletedTasks />
            </Col>
          </Row>
          <AddNewTaskButton label='Add task' handleClick={handleShow} />
        </>
      )}
      <AddEditTaskModal
        show={show}
        handleClose={handleClose}
        user={my_user}
        followedUsers={followedUsers}
        categories={categories}
        history={history}
        location={location}
        taskSet={null}
      />
    </div>
  );
};

export default DashTasksCard;
