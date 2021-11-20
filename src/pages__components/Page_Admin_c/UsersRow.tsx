import { Link } from "react-router-dom";
import { userInt } from "../../typings/interfaces";
import { ICODOWNRIGHT, ICOEDIT } from "../../utils/icons";

const UsersRow = (props: userInt) => {
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
  } = props;
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
          <Link to=''>Tasks</Link>&nbsp;
          <ICODOWNRIGHT />
          <Link to=''>Notifications</Link>
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
        <div><img src={avatar} alt='' className="admin-page__table__img"/></div> 
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
