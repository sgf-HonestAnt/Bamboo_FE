import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { taskInt } from "../../typings/interfaces";
import completeTasks from "../../utils/funcs/complete";

type DashTasksCardProps = {
  today: taskInt[];
};

// const initCompleted: any[] = [];

// type Completed = typeof initCompleted;

const DashTasksCard = (props: DashTasksCardProps) => {
  const { today } = props;
  const dispatch = useDispatch(); 
  const checkedTasks: string[] = [];
  const handleChange = async (e: {
    preventDefault: () => void;
    target: { value: any };
  }) => {
    e.preventDefault();
    const id = e.target.value;
    !checkedTasks.includes(id) && checkedTasks.push(id);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await completeTasks(checkedTasks, dispatch);
  };
  useEffect(() => {});
  return (
    <div className='dashboard__tasks-card m-2'>
      <div>Today's tasks</div>
      {today?.length < 1 && <span>No tasks awaited today!</span>}
      <Form onSubmit={handleSubmit}>
        {today?.map((t, i) => {
          const label = `${t.title} ${t.value}XP`;
          return (
            <Form.Group key={i}>
              <Form.Check
                type='checkbox'
                label={label}
                value={t._id}
                onChange={handleChange}
              />
              {/* <div className='dashboard__tasks-card__tasks'>
                {t.title} {t.value}XP{" "}
              </div> */}
            </Form.Group>
          );
        })}
        <Button variant='link' size='sm' type='submit'>
          mark complete
        </Button>
      </Form>
    </div>
  );
};

export default DashTasksCard;
