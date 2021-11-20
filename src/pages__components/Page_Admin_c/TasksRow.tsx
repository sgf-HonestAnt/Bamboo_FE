import { Link } from "react-router-dom";
import { taskInt } from "../../typings/interfaces";
import { ICODOWNRIGHT, ICOEDIT } from "../../utils/icons";

const TasksRow = (props: taskInt) => {
  const { _id, title, createdBy, desc, category, image, value, status, deadline } = props;
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
        {title} <ICOEDIT />
        <div>
          <ICODOWNRIGHT />
          <Link to=''>created by</Link>&nbsp;
          {/* <ICODOWNRIGHT />
          <Link to=''>Notifications</Link> */}
        </div>
      </td>
      <td>
        {desc} <ICOEDIT />
      </td>
      <td>
        {category} <ICOEDIT />{" "}
      </td>
      <td>
        <div>
          <img src={image} alt='' className='admin-page__table__img' />
        </div>
        <Link to={image}>Link</Link> <ICOEDIT />
      </td>
      <td>
        {value} <ICOEDIT />
      </td>
      <td>
        {status} <ICOEDIT />
      </td>
      <td>
        {deadline ? deadline.slice(0, 10) : "none"} <ICOEDIT />
      </td>
    </tr>
  );
};

export default TasksRow;
