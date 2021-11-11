import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { taskInt } from "../../typings/interfaces";
// import completeTasks from "../../utils/funcs/complete";

type DashTasksCardProps = {
  today: taskInt[];
};

// const initCompleted: any[] = [];

// type Completed = typeof initCompleted;

const DashTasksCard = (props: DashTasksCardProps) => {
  const { today } = props;
  const [statusToShow, setStatusToShow] = useState({
    completed: false,
  });
  const changeCompleted = () => {
    setStatusToShow({
      ...statusToShow,
      completed: !statusToShow.completed,
    });
  };
  const handleComplete = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(statusToShow);
    // add funcionality to filter by category, status, time and value(?)

    // const id = e.target.value;
    // !checkedTasks.includes(id) && checkedTasks.push(id);
  };
  // const handleSubmit = async (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   await completeTasks(checkedTasks, dispatch);
  // };
  useEffect(() => {});
  return (
    <div className='dashboard__tasks-card m-2'>
      <div>Today's tasks</div>
      {today?.length < 1 ? (
        <span>No tasks awaited today!</span>
      ) : (
        <form onSubmit={handleComplete} className=''>
          {today
            ?.sort()
            .slice(Math.max(today.length - 3, 0))
            .map((t, i) => {
              const label = `${t.title} ${t.value}XP`;
              return (
                <div className='form-check' key={i}>
                  <label className='form-check-label'>
                    <input
                      type='checkbox'
                      checked={statusToShow.completed}
                      onChange={changeCompleted}
                      className='form-check-input'
                    />
                    {label}
                  </label>
                </div>
              );
            })}
          <div>
            {today?.length > 3 && (
              <Link to='/tasks'>{`+ ${today?.length - 3} more`}</Link>
            )}
          </div>
          <div className='form-group'>
            <button className='btn btn-success'>mark complete</button>
          </div>
          {/* <select name='task' onChange={handleChange}>
            {today?.map((t, i) => {
              const label = `${t.title} ${t.value}XP`;
              return (
                <div className='form-check' key={i}>
                    <label className='form-check-label'>
                      {label}
                      <input
                        type='checkbox'
                        // checked={statusToShow.awaited}
                        // onChange={changeAwaited}
                        className='form-check-input'
                      />
                      Completed
                    </label>
                </div>
                // <option key={i} value={t._id} 
                // // selected={}
                // >
                //   {label}
                // </option>
                // <Form.Group key={i}>
                //   <Form.Check
                //     type='checkbox'
                //     label={label}
                //     value={t._id}
                //     onChange={handleChange}
                //   />
                // </Form.Group>
              );
            })}
          </select>
          <Button variant='link' size='sm' type='submit'>
            mark complete
          </Button> */}
        </form>
      )}
      <Button variant='link'>
        <Link to='/tasks-add-new'>ADD A TASK</Link>
      </Button>
    </div>
  );
};

export default DashTasksCard;
