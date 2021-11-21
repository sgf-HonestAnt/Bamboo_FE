import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { userInt } from "../../typings/interfaces";
import { ICODOWNRIGHT, ICOEDIT } from "../../utils/icons";

interface UsersRowProps extends userInt {
  form: any;
  setForm: any;
}
const UsersRow = (props: UsersRowProps) => {
  const {
    _id,
    first_name,
    last_name,
    username,
    email,
    admin,
    avatar,
    level,
    xp,
    createdAt,
    form,
    setForm,
  } = props;
  const handleClick = (e: { preventDefault: () => void; currentTarget: any; }) => {
    e.preventDefault();
    const target = e.currentTarget
    const dropdown = target.value.split(":")[0];
    const search = target.value.split(":")[1];
    setForm({ ...form, dropdown, search });
  };
  return (
    <tr>
      <td className='admin-page__table__td'>
        <div
          onClick={() => {
            navigator.clipboard.writeText(_id);
          }}>
          {_id}
        </div>
      </td>
      <td>
        {first_name} {last_name} <ICOEDIT />
        <div>
          <ICODOWNRIGHT />
          <Button variant='link' value={`Tasks:${_id}`} onClick={handleClick}>
            Tasks
          </Button>
          &nbsp;
          <ICODOWNRIGHT />
          <Button
            variant='link'
            value={`Notifications:${_id}`}
            onClick={handleClick}>
            Notifications
          </Button>
        </div>
      </td>
      <td>
        {username} <ICOEDIT />
      </td>
      <td>
        {email} <ICOEDIT />{" "}
      </td>
      <td>
        {admin ? "Admin" : "General"} <ICOEDIT />
      </td>
      <td>
        <div>
          <img src={avatar} alt='' className='admin-page__table__img' />
        </div>
        <Link to={avatar}>Link</Link> <ICOEDIT />
      </td>
      <td>
        {level} <ICOEDIT />
      </td>
      <td>
        {xp} <ICOEDIT />
      </td>
      <td>
        {createdAt.slice(0, 10)} <ICOEDIT />
      </td>
    </tr>
  );
};

export default UsersRow;
