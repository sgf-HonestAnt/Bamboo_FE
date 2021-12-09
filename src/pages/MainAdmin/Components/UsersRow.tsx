import { Button } from "react-bootstrap";
import { userInt } from "../../../typings/interfaces";
import { ICODOWNRIGHT } from "../../../utils/appIcons";
import { AiFillStar } from "react-icons/ai";
import { DeleteButton, EditButton } from "../../../pages__SharedComponents/Buttons";
import { NOTIFICATIONS, TASKS } from "../../../utils/appConstants";

interface UsersRowProps extends userInt {
  signedInId: string | undefined;
  form: any;
  setForm: any;
}
const UsersRow = (props: UsersRowProps) => {
  const { signedInId, form, setForm } = props;
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
        {props._id === signedInId && (
          <strong>
            <AiFillStar />
          </strong>
        )}{" "}
        {props.first_name} {props.last_name}
      </td>
      <td>{props.username}</td>
      <td>
        <Button
          variant='link'
          className='p-0 m-0'
          value={`${TASKS}:${props._id}`}
          onClick={handleClick}>
          <ICODOWNRIGHT />
        </Button>
      </td>
      <td>
        <Button
          variant='link'
          className='p-0 m-0'
          value={`${NOTIFICATIONS}:${props._id}`}
          onClick={handleClick}>
          <ICODOWNRIGHT />
        </Button>
      </td>
      <td>{props.email}</td>
      <td>{props.admin ? "Admin" : "General"}</td>
      <td>
        <img src={props.avatar} alt='' className='admin-page__table__img' />
      </td>
      <td>{props.level}</td>
      <td>{props.xp}</td>
      <td>{props.createdAt.slice(0, 10)}</td>
    </tr>
  );
};

export default UsersRow;
