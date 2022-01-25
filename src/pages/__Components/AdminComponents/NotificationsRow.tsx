import { Button } from "react-bootstrap";
// import { DeleteButton, EditButton } from "../Buttons";
import { USERS } from "../../../utils/const/str";
import { FiCornerDownRight } from "react-icons/fi";
import { userInt } from "../../../typings/interfaces";

interface NotificationsRowProps {
  notification?: string;
  form: any;
  setForm: any;
  users: userInt[];
}
const NotificationsRow = (props: NotificationsRowProps) => {
  const { notification, form, setForm, users } = props;
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
      {/* <td>
        <EditButton handleClick={null} />
      </td>
      <td>
        <DeleteButton handleClick={null} />
      </td> */}
      <td className='fixed-width'>
        {users.find((user) => user._id === form.id)?.username}
        <Button
          variant='link'
          className='p-0 m-0'
          value={`${USERS}:${form.id}`}
          onClick={handleClick}>
          <FiCornerDownRight />
        </Button>
      </td>
      <td>{notification}</td>
    </tr>
  );
};

export default NotificationsRow;
