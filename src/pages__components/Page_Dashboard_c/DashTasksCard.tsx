import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { History, Location } from "history";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { taskInt, userInt } from "../../typings/interfaces";
import attemptCompleteTasks from "../../utils/funcs/complete";
import { getDayMonthYearAsString } from "../../utils/funcs/dateTimeFuncs";

type DashTasksCardProps = {
  today: taskInt[];
  user: userInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const DashTasksCard = (props: DashTasksCardProps) => {
  const dayMonthYearAsString = getDayMonthYearAsString()
  const { today, user, history, location } = props;
  const { refreshToken } = user;
  const completedTasks: string[] = [];
  const dispatch = useDispatch();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(completedTasks);
    try {
      attemptCompleteTasks(
        completedTasks,
        refreshToken,
        history,
        location,  
        dispatch
      );
      // setTimeout(() => {
      //   history.push("/");
      // }, 1000);
    } catch (e) {
      console.log(e);
    }
  };
  const changeCompleted = (e: { target: { value: any } }) => {
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
      <div>{dayMonthYearAsString}</div> 
      {today?.length < 1 ? (
        <span>No tasks awaited today!</span>
      ) : (
        <Form onSubmit={handleSubmit}>
          {today
            ?.sort()
            .slice(Math.max(today.length - 3, 0))
            .map((t, i) => (
              <Form.Group key={i} controlId={t._id}>
                <div className='mb-0'>
                  <Form.Check
                    inline
                    label={t.title}
                    name='today'
                    type='checkbox'
                    value={t._id}
                    onChange={changeCompleted}
                  />
                </div>
              </Form.Group>
            ))}
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      )}
      <Button variant='link'>
        <Link to='/tasks-add-new'>ADD A TASK</Link>
      </Button>
    </div>
  );
};

export default DashTasksCard;
