import { Button } from "react-bootstrap";
import { taskInt, userInt } from "../../../typings/interfaces";
import { ICODOWNRIGHT } from "../../../utils/appIcons";
import {
  DeleteButton,
  EditButton,
} from "../../../pages__SharedComponents/Buttons";
import { USERS } from "../../../utils/appConstants";
import { AiFillStar } from "react-icons/ai";

interface TasksRowProps extends taskInt {
  users?: userInt[];
  form: any;
  setForm: any;
}
const TasksRow = (props: TasksRowProps) => {
  const { users, form, setForm } = props;
  const handleClick = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();
    const target = e.currentTarget;
    const dropdown = target.value.split(":")[0];
    const id = target.value.split(":")[1];
    setForm({ ...form, dropdown, id });
  };
  const taskCreator = users?.find((u) => u._id === props.createdBy);
  return (
    <tr>
      <td>
        <EditButton handleClick={null} />
      </td>
      <td>
        <DeleteButton handleClick={null} />
      </td>
      <td
        className='admin-page__table__td cursor-point'
        onClick={() => {
          navigator.clipboard.writeText(props._id);
        }}>
        <div className='overflow'>{props._id}</div>
        <div className='text-tinycaps'>copy</div>
      </td>
      <td>
        {/* {props.createdBy === form.id && (
          <strong>
            <AiFillStar />
          </strong>
        )}{" "} */}
        {props.title}
      </td>
      <td>
        {taskCreator?.username}
        <Button
          variant='link'
          className='p-0 m-0'
          value={`${USERS}:${props.createdBy}`}
          onClick={handleClick}>
          <ICODOWNRIGHT />
        </Button>
      </td>
      <td>{props.desc.length > 1 ? props.desc : "..."}</td>
      <td>{props.category} </td>
      {/* <td>
        <img src={props.image} alt='' className='admin-page__table__img' />
      </td> */}
      <td>{props.value}XP</td>
      <td>{props.status}</td>
      <td>{props.deadline ? props.deadline.slice(0, 10) : "none"}</td>
    </tr>
  );
};

export default TasksRow;
