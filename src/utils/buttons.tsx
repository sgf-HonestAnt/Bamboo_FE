import { Button } from "react-bootstrap";
import { FiPlus, FiRefreshCcw, FiCheck } from "react-icons/fi";

export const AddNewTaskButton = () => (
  <Button variant='light' className='mb-3 mr-1' href='tasks-add-new'>
    <FiPlus />
  </Button>
);
export const RefreshButton = () => (
  <Button variant='light' className='mb-3 mr-1' href='/tasks'>
    <FiRefreshCcw />
  </Button>
);
export const SubmitButton = () => (
  <Button variant='light' className='mb-3 mr-1' type='submit'>
    Submit
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
