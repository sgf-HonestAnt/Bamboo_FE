import { Button, Badge } from "react-bootstrap";
import {
  FiPlus,
  FiRefreshCcw,
  FiCornerUpLeft,
  FiCheckSquare,
  FiXSquare,
  FiTrash2,
  FiEdit,
  FiGift,
  FiRotateCcw,
} from "react-icons/fi";
import { OVERDUE, TODAY, URGENT } from "../../utils/const/str";

type ButtonProps = {
  label?: string | null;
  className?: string;
  handleClick?: any;
  value?: string | number;
  variant?: string;
};
export const XButton = (props: ButtonProps) => (
  <>
    <Button
      variant='link'
      className='x-btn'
      value={props.value}
      onClick={props.handleClick}>
      x
    </Button>
  </>
);
export const RejectButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0 link-button'
    onClick={props.handleClick}>
    <FiXSquare />
  </Button>
);
export const AcceptButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0 link-button'
    onClick={props.handleClick}>
    <FiCheckSquare />
  </Button>
);
export const LinkButton = (props: ButtonProps) => (
  <Button
    className={!props.variant ? "m-0 p-0 btn-link" : `btn-${props.variant}`}
    value={props.value}
    onClick={props.handleClick}>
    {props.label}
  </Button>
);
export const ClearNotification = (props: ButtonProps) => (
  <div onClick={props.handleClick}>
    {props.label} <FiRotateCcw />
  </div>
);
export const EditButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0 small-button'
    value={props.value}
    onClick={props.handleClick}>
    {props.label} <FiEdit />
  </Button>
);
export const DeleteButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0' onClick={props.handleClick}>
    {props.label} <FiTrash2 />
  </Button>
);
export const OpenTaskButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0' onClick={props.handleClick}>
    {props.label}
  </Button>
);
export const DeleteTaskButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='delete-task-btn'
    onClick={props.handleClick}>
    <FiTrash2 />
  </Button>
);
export const DeleteUserButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0'
    value={props.value}
    onClick={props.handleClick}>
    <FiTrash2 />
  </Button>
);
export const AddNewTaskButton = (props: ButtonProps) => (
  <Button variant='light' className='mr-1' onClick={props.handleClick}>
    <FiPlus /> {props.label}
  </Button>
);
export const DashTaskButton = (props: ButtonProps) =>
  props.label ? (
    <Button
      variant={props.label.includes("All tasks") ? "info" : "info"}
      className={`${props.className} my-1 mr-1`}
      id={`custom-bg-${props.label
        .split("|")[0]
        .toLowerCase()
        .replace("_", " ")
        .replace(/\s/g, "-")}`}
      value={props.value}
      onClick={props.handleClick}>
      {props.label.split("|")[0].charAt(0)?.toUpperCase()}
      {props.label.split("|")[0].slice(1)?.replace("_", " ").toLowerCase()}
      &nbsp;
      <Badge
        bg={`${
          parseInt(props.label.split("|")[1]) > 0 &&
          (props.label.split("|")[0] === URGENT ||
            props.label.split("|")[0] === OVERDUE ||
            props.label.split("|")[0] === TODAY)
            ? "warning"
            : props.label && parseInt(props.label.split("|")[1]) < 1
            ? "secondary"
            : "primary"
        }`}
        id={`custom-bg-${props.label
          .split("|")[0]
          .toLowerCase()
          .replace("_", " ")
          .replace(/\s/g, "-")}`}>
        {/* regex match whitespace globally */}
        {props.label.split("|")[1]}
      </Badge>
    </Button>
  ) : (
    <></>
  );
export const ResetButton = (props: ButtonProps) => (
  <Button variant='light' className='mr-1' onClick={props.handleClick}>
    {props.label} <FiRefreshCcw />
  </Button>
);
export const RefreshButton = (props: ButtonProps) => (
  <Button variant='light' className='mb-3 mr-1' onClick={props.handleClick}>
    {props.label} <FiRefreshCcw />
  </Button>
);
export const SubmitButton = (props: ButtonProps) => (
  <Button variant='light' className='mb-3 mr-1' type='submit'>
    {props.label || "Submit"}
  </Button>
);
export const CompleteButton = () => (
  <Button variant='light' className='mb-3 mr-1' type='submit'>
    Complete
  </Button>
);
export const ProgressTaskButton = () => (
  <Button variant='light' className='mb-3 mr-1'>
    Task Started
  </Button>
);
export const CompleteTaskButton = () => (
  <Button variant='light' className='mb-3 mr-1'>
    Mark Complete
  </Button>
);
export const BackToDashButton = () => (
  <Button variant='light' className='mb-3 mr-1' href='/dash'>
    <FiCornerUpLeft />
  </Button>
);
export const SubmitButtonCol = (props: ButtonProps) => (
  <Button variant='light' className='m-1' type='submit'>
    {props.label}
  </Button>
);
export const BackToDashButtonCol = (props: ButtonProps) => (
  <Button variant='light' className='m-1' onClick={props.handleClick}>
    <FiCornerUpLeft /> {props.label}
  </Button>
);
export const SendGiftButton = (props: ButtonProps) => (
  <Button variant='secondary' value={props.value} onClick={props.handleClick}>
    Send gift <FiGift />
  </Button>
);
export const ContactAdminButton = (props: ButtonProps) => (
  <Button variant='primary' value={props.value} onClick={props.handleClick}>
    Send a message
  </Button>
);
