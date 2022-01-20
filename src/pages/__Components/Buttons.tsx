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
  bg?: string;
};

export const LoginBtn = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    {props.label || "Login"}
  </Button>
);
export const SubmitBtn = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    type='submit'>
    {props.label || "Submit"}
  </Button>
);

export const XButton = (props: ButtonProps) => (
  <>
    <Button
      variant={props.variant || "link"}
      className={props.className || "x-btn"}
      value={props.value}
      onClick={props.handleClick}>
      x
    </Button>
  </>
);
export const RejectButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "primary"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    <FiXSquare /> Reject
  </Button>
);
export const AcceptButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "secondary"}
    className={props.variant || "m-1"}
    onClick={props.handleClick}>
    <FiCheckSquare /> Accept
  </Button>
);
export const LinkButton = (props: ButtonProps) => (
  <Button
    className={props.variant ? "m-1 btn-link" : `m-1 btn-${props.variant}`}
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
    variant={props.variant || "link"}
    className={props.className || "m-1 small-button"}
    value={props.value}
    onClick={props.handleClick}>
    {props.label} <FiEdit />
  </Button>
);
export const DeleteButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "link"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    {props.label} <FiTrash2 />
  </Button>
);
export const OpenTaskButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "link"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    {props.label}
  </Button>
);
export const DeleteTaskBadge = (props: ButtonProps) => (
  <Badge
    bg={props.bg || "dark"}
    className={props.className || "delete-task-badge m-1"}
    onClick={props.handleClick}>
    <FiTrash2 />
  </Badge>
);
export const DeleteUserButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "link"}
    className={props.className || "m-1"}
    value={props.value}
    onClick={props.handleClick}>
    <FiTrash2 />
  </Button>
);
export const AddNewTaskButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    <FiPlus /> {props.label}
  </Button>
);
export const DashTaskButton = (props: ButtonProps) =>
  props.label ? (
    <Button
      variant={props.label.includes("All tasks") ? "info" : "info"}
      className={`${props.className} m-1`}
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
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    {props.label} <FiRefreshCcw />
  </Button>
);
export const RefreshButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    {props.label} <FiRefreshCcw />
  </Button>
);

export const CompleteButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    type='submit'>
    Complete
  </Button>
);
export const ProgressTaskButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}>
    Task Started
  </Button>
);
export const CompleteTaskButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}>
    Mark Complete
  </Button>
);
export const BackToDashButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    href='/dash'>
    <FiCornerUpLeft />
  </Button>
);
export const SubmitBtnCol = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    type='submit'>
    {props.label}
  </Button>
);
export const BackToDashButtonCol = (props: ButtonProps) => (
  <Button
    variant={props.variant || "light"}
    className={props.className || "m-1"}
    onClick={props.handleClick}>
    <FiCornerUpLeft /> {props.label}
  </Button>
);
export const SendGiftButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "primary"}
    className={props.className || "m-1"}
    value={props.value}
    onClick={props.handleClick}>
    Send gift <FiGift />
  </Button>
);
export const ContactAdminButton = (props: ButtonProps) => (
  <Button
    variant={props.variant || "primary"}
    className={props.className || "m-1"}
    value={props.value}
    onClick={props.handleClick}>
    Send a message
  </Button>
);
