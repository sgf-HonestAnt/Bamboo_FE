import { Button } from "react-bootstrap";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import { ICOBACK, ICODELETE, ICOEDIT, ICOROTATE } from "../utils/appIcons";

type ButtonProps = {
  label?: string | null;
  className?: string
  handleClick?: any;
  value?: string;
};
export const LinkButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0 link-button' value={props.value} onClick={props.handleClick}>
    {props.label} 
  </Button>
);
export const ClearNotification = (props: ButtonProps) => (
  <Button variant='link' className='mb-3 mr-1' onClick={props.handleClick}>
    {props.label} <ICOROTATE />
  </Button>
);
export const EditButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0 small-button' onClick={props.handleClick}>
    {props.label} <ICOEDIT />
  </Button>
);
export const DeleteButton = (props: ButtonProps) => (
  <Button variant='link' className='m-0 p-0' onClick={props.handleClick}>
    {props.label} <ICODELETE />
  </Button>
);
export const AddNewTaskButton = (props: ButtonProps) => (
  <Button variant='light' className='mb-3 mr-1' onClick={props.handleClick}>
    <FiPlus />Add Task
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
export const SubmitButtonCol = () => (
  <Button variant='light' className='my-1' type='submit'>
    Submit
  </Button>
);
export const BackToDashButtonCol = () => (
  <Button variant='light' className='my-1' href='/dash'>
    <ICOBACK />
  </Button>
);
