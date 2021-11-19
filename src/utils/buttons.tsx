import { Button } from "react-bootstrap";
import { FiPlus, FiRefreshCcw } from "react-icons/fi";
import { ICOBACK } from "./icons";

export const AddNewTaskButton = () => (
  <Button variant='light' className='mb-3 mr-1' href='tasks-add-new'>
    <FiPlus />
  </Button>
);
export const RefreshButton = () => (
  <Button variant='light' className='mb-3 mr-1'>
    <FiRefreshCcw />
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
