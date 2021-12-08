import { Button, Modal } from "react-bootstrap";
import { taskInt } from "../../../typings/interfaces";
import { CompleteTaskButton, ProgressTaskButton } from "../../../pages__SharedComponents/Buttons";

type PageTaskButtonWithModalProps = {
  task: taskInt;
  index: number;
  show: any; 
  handleShow: any;
  handleClose: any;
  statusClass: any;
  icon: any;
};

const PageTaskButtonWithModal = (props: PageTaskButtonWithModalProps) => {
  const { task, index, show, handleShow, handleClose, statusClass, icon } =
    props;
  return (
    <>
      <Button
        key={index}
        variant='light'
        className={statusClass}
        onClick={handleShow}>
        {icon} {task.title} ({task.value}XP)
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{task.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={task.image} alt={task.title} className='img-fluid' />
          <div>Category: {task.category}</div>
          <div>Description: {task.desc}</div>
          <div>Value: {task.value}XP</div>
          <div>Deadline: {task.deadline}</div>
          <ProgressTaskButton />
          <CompleteTaskButton />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' className='mb-3 mr-1' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PageTaskButtonWithModal;
