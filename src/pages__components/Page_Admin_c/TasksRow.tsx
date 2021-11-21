import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { taskInt } from "../../typings/interfaces";
import { ICODOWNRIGHT, ICOEDIT } from "../../utils/icons";

interface TasksRowProps extends taskInt {
  form: any;
  setForm: any;
}
const TasksRow = (props: TasksRowProps) => {
  const {
    _id,
    title,
    createdBy,
    desc,
    category,
    image,
    value,
    status,
    deadline,
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
        {title} <ICOEDIT />
        <div>
          <ICODOWNRIGHT />
          <Button
            variant='link'
            value={`Users:${createdBy}`}
            onClick={handleClick}>
            created by
          </Button>
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
