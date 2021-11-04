import { useEffect, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { taskInt } from "../../typings/interfaces";

type DashTasksCardProps = {
  today: taskInt[];
};

const initCompleted: any[] = [];

type Completed = typeof initCompleted;

const DashTasksCard = (props: DashTasksCardProps) => {
  const { today } = props;
  const [checkedItems, setCheckedItems] = useState({})
  //const [checked, setChecked] = useState(false);
  const [completed, setCompleted] = useState<Completed>(initCompleted);
  const handleChange = (e: {
    preventDefault: () => void;
    target: { id: any };
  }) => {
    e.preventDefault();
    const i = e.target.id;
    const task = today[i];
    setCheckedItems({...checkedItems, [i]: task});
    !completed.includes(task) && setCompleted([...completed, task]);
    //completed.push(task); // this is not working
  };
  useEffect(() => {
    console.log(checkedItems);
  }, [checkedItems]);
  return (
    <div className='dashboard__tasks-card m-2'>
      <Card.Title>Today's tasks</Card.Title>
      <Card.Text>
        {today?.length < 1 && <span>No tasks awaited today!</span>}
        <Form>
          {today?.map((t, i) => (
            <Form.Group key={i} className='dashboard__tasks-card__tasks'>
              <Form.Check
                type='checkbox'
                id={i.toString()}
                value={t.title}
                label={t.title}
                onChange={handleChange}
              />
            </Form.Group>
          ))}
        </Form>
      </Card.Text>
      <Button variant='primary'>Go somewhere</Button>
    </div>
  );
};

export default DashTasksCard;
