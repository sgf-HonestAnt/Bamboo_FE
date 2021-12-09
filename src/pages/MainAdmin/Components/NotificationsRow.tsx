import { Button } from "react-bootstrap";
import { ICODOWNRIGHT } from "../../../utils/appIcons";
import { DeleteButton, EditButton } from "../../../pages__SharedComponents/Buttons";
import { USERS } from "../../../utils/appConstants";

interface NotificationsRowProps {
  notification?: string;
  form: any;
  setForm: any;
}
const NotificationsRow = (props: NotificationsRowProps) => {
  const { notification, form, setForm } = props;
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
  // console.log("=>", form.id);
  return (
    <tr>
      <td>
        <EditButton handleClick={null} />
      </td>
      <td>
        <DeleteButton handleClick={null} />
      </td>
      <td>{notification}</td>
      <td>
        <Button
          variant='link'
          className='p-0 m-0'
          value={`${USERS}:${form.id}`}
          onClick={handleClick}>
          <ICODOWNRIGHT />
        </Button>
      </td>
    </tr>
  );
};

export default NotificationsRow;
