import { History, Location } from "history";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";
import { reduxStateInt } from "../../../typings/interfaces";
import { Form } from "react-bootstrap";
import { ICOCIRCLE, ICOCLOCK, ICOURGENT } from "../../../utils/appIcons";
import { AddNewTaskButton } from "../../../pages__SharedComponents/Buttons";
import {
  getDayMonthYearAsString,
  // getMinMaxDateAsString,
} from "../../../utils/f_dates";
import { attemptCompleteTasks } from "../../../utils/f_tasks";
import { refreshUserLevel } from "../../../utils/f_users";
import AddEditTaskModal from "../../../pages__SharedComponents/AddEditTaskModal";

type DashTasksCardProps = {
  today: string;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashTasksCard = (props: DashTasksCardProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { refreshToken } = my_user;
  const tasks = state.currentTasks;
  const categories = tasks.categories;
  const { awaited, in_progress } = tasks;
  const allTasks = awaited.concat(in_progress);
  // const features = state.currentFeatures;
  // const settings = state.currentSettings;
  // const achievements = state.currentAchievements;
  // const { list, superlist } = achievements;
  // const { avatar, username, admin, bio, level, xp } = my_user;
  const { today, history, location } = props;
  const dispatch = useDispatch();
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
  const completedTasks: string[] = [];
  const dayMonthYearAsString = getDayMonthYearAsString(new Date());
  const handleSubmitComplete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(completedTasks);
    try {
      await attemptCompleteTasks(
        my_user,
        completedTasks,
        refreshToken,
        history,
        location,
        dispatch
      );
      refreshUserLevel(my_user);
    } catch (e) {
      console.log(e);
    }
  };
  const handleChangeCompleted = (e: { target: { value: any } }) => {
    const value = e.target.value;
    if (completedTasks.includes(value)) {
      const index = completedTasks.indexOf(value);
      completedTasks.splice(index, 1);
    } else {
      completedTasks.push(value);
    }
  };
  return (
    <div className='dashboard__tasks-card m-2'>
      <div className='dashboard__card-header'>{dayMonthYearAsString}</div>
      {allTasks.length < 1 ? (
        <>
          <div>No tasks awaited today!</div>
          <AddNewTaskButton />
        </>
      ) : (
        <Form onSubmit={handleSubmitComplete}>
          <div>Drag here to complete</div>
          <div className='red'>
            <ICOURGENT />
            Make draggable into Complete droppable
          </div>
          {allTasks.slice(0, 3).map((t, i) => {
            const clock = t.deadline?.includes(today) ? (
              <ICOCLOCK className='icon-urgent' />
            ) : t.deadline ? (
              <ICOCLOCK className='icon-semi-urgent' />
            ) : (
              <ICOCIRCLE />
            );
            return (
              <Form.Group key={i} controlId={t._id}>
                <div className='mb-0'>
                  <Form.Check
                    inline
                    label={t.title}
                    name='today'
                    type='checkbox'
                    value={t._id}
                    onChange={handleChangeCompleted}
                  />
                  {clock}
                </div>
              </Form.Group>
            );
          })}
          <div>{allTasks.length > 3 ? `+ ${allTasks.length - 3} more` : ""}</div>
          {/* <CompleteButton /> */}
        </Form>
      )}
      <AddNewTaskButton label='Add task' handleClick={handleShow} />
      <AddEditTaskModal
        show={show}
        handleClose={handleClose}
        user={my_user}
        followedUsers={followedUsers}
        categories={categories}
        history={history}
        location={location}
      />
    </div>
  );
};

export default DashTasksCard;
