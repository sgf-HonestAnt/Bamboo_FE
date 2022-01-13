import { Button } from "react-bootstrap";
import { userInt } from "../../../typings/interfaces";
import { ICODELETE, ICODOWNRIGHT, ICOEDIT } from "../../../utils/appIcons";
import { AiFillStar } from "react-icons/ai";
import {
  DeleteUserButton,
  EditButton,
} from "../../__Components/Buttons";
import { NOTIFICATIONS, TASKS, USERS } from "../../../utils/const/str";
import { useState } from "react";
import EditDeleteUserModal from "./EditDeleteUserModal";

interface UsersRowProps extends userInt {
  signedInId: string | undefined;
  form: any;
  setForm: any;
}
const UsersRow = (props: UsersRowProps) => {
  const { signedInId, form, setForm } = props;
  const [show, setShow] = useState(false);
  const [deleteOption, setDeleteOption] = useState({ show: false, id: "" });
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleDelete = (e: {
    preventDefault: () => void;
    target: { value: string };
  }) => {
    e.preventDefault();
    const id = e.target.value;
    setDeleteOption({ show: true, id });
    handleShow();
  };
  const handleClick = (e: {
    preventDefault: () => void;
    currentTarget: any;
  }) => {
    e.preventDefault();
    const target = e.currentTarget;
    const dropdown = target.value.split(":")[0];
    if (dropdown === USERS) {
      // const search = target.value.split(":")[2];
      // setForm({ ...form, dropdown, search });
      handleShow();
    } else {
      const id = target.value.split(":")[1];
      setForm({ ...form, dropdown, id });
    }
  };
  return (
    <tr>
      <td>
        {props._id === signedInId ? (
          <Button variant='link' className='m-0 p-0 small-button' disabled>
            <ICOEDIT />
          </Button>
        ) : (
          <EditButton
            handleClick={handleClick}
            value={`${USERS}:${props._id}:${props.username}`}
          />
        )}
      </td>
      <td>
        {props._id === signedInId ? (
          <Button variant='link' className='m-0 p-0' disabled>
            <ICODELETE />
          </Button>
        ) : (
          <DeleteUserButton handleClick={handleDelete} value={`${props._id}`} />
        )}
      </td>
      <EditDeleteUserModal
        _id={props._id}
        first_name={props.first_name}
        last_name={props.last_name}
        username={props.username}
        email={props.email}
        avatar={props.avatar}
        bio={props.bio}
        level={props.level}
        xp={props.xp}
        total_xp={props.total_xp}
        total_completed={props.total_completed}
        tasks_to_hide={props.tasks_to_hide}
        notification={props.notification}
        createdAt={props.createdAt}
        updatedAt={props.updatedAt}
        show={show}
        handleClose={handleClose}
        setForm={setForm}
        setDeleteOption={setDeleteOption}
        showDeleteWarning={deleteOption.show}
      />
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
        <img src={props.avatar} alt='' className='tiny-round' />
      </td>
      <td>{props.level}</td>
      <td>{props.xp}</td>
      <td>{props.createdAt.slice(0, 10)}</td>
    </tr>
  );
};

export default UsersRow;
