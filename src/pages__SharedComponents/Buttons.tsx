import { Button } from "react-bootstrap";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import {
  ICOBACK,
  ICOCHECK,
  ICOCROSS,
  ICODELETE,
  ICOEDIT,
  ICOROTATE,
} from "../utils/appIcons";

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
    <ICOCROSS />
  </Button>
);
export const AcceptButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0 link-button'
    onClick={props.handleClick}>
    <ICOCHECK />
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
  <Button variant='link' className='mb-3 mr-1' onClick={props.handleClick}>
    {props.label} <ICOROTATE />
  </Button>
);
export const EditButton = (props: ButtonProps) => (
  <Button
    variant='link'
    className='m-0 p-0 small-button'
    onClick={props.handleClick}>
    {props.label} <ICOEDIT />
  </Button>
);
export const DeleteButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0' onClick={props.handleClick}>
    {props.label} <ICODELETE />
  </Button>
);
export const OpenTaskButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0' onClick={props.handleClick}>
    {props.label}
  </Button>
);
export const DeleteTaskButton = (props: ButtonProps) => (
  <Button variant='link' onClick={props.handleClick}>
    <ICODELETE />
  </Button>
);
export const AddNewTaskButton = (props: ButtonProps) => (
  <Button variant='light' className='mr-1' onClick={props.handleClick}>
    <FiPlus /> {props.label}
  </Button>
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
export const SubmitButton = () => (
  <Button variant='light' className='mb-3 mr-1' type='submit'>
    Submit
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
    <ICOBACK />
  </Button>
);
export const SubmitButtonCol = (props: ButtonProps) => (
  <Button variant='light' className='m-1' type='submit'>
    {props.label}
  </Button>
);
export const BackToDashButtonCol = (props: ButtonProps) => (
  <Button variant='light' className='m-1' onClick={props.handleClick}>
    <ICOBACK /> {props.label}
  </Button>
);
export const SendGiftButton = (props: ButtonProps) => (
  <Button variant='link' value={props.value} onClick={props.handleClick}>
    Send gift 🎁
  </Button>
);
