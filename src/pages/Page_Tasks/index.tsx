import { Container, Row, Col, Button, Dropdown, Form } from "react-bootstrap";
import { currentTasksInt } from "../../typings/interfaces";
import { GrAddCircle } from "react-icons/gr";
import { FiClock } from "react-icons/fi";
import {
  MdOutlineStarBorder,
  MdOutlineStarHalf,
  MdOutlineStar,
} from "react-icons/md";
import "./styles.css";
import getCategories from "../../utils/funcs/categories";
import { useEffect, useState } from "react";
import PageTaskCards from "../../pages__components/Page_Tasks_c/PageTaskCards"; 

type TasksProps = {
  tasks: currentTasksInt;
};

const Tasks = (props: TasksProps) => {
  const { tasks } = props;
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const attemptLoad = async () => {
    const categories = await getCategories(allTasks);
    setAllCategories(categories);
  };
  useEffect(() => {
    attemptLoad();
  }, []);
  console.log(allCategories);
  return (
    <Container fluid>
      <Row className='tasks-page'>
        <Col sm={12}>
          <Row>Tasks | Schedule</Row>
          <Row className='tasks-page__filter-row'>
            <Button className='tasks-page__filter-row__add-btn'>
              <GrAddCircle />
            </Button>
            <div className='tasks-page__filter-row-inner'>
              Filters
              <div className='tasks-page__filter-row-inner-display'>
                <div>
                  <FiClock />
                </div>
                <div>
                  <MdOutlineStarBorder />
                  <MdOutlineStarHalf />
                  <MdOutlineStar />
                </div>
                <Dropdown>
                  <Dropdown.Toggle
                    variant='success'
                    id='dropdown-basic'
                    size='sm'>
                    category
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allCategories.map((c, i) => {
                      <Dropdown.Item href='#/action-1' key={i}>
                        {c}
                      </Dropdown.Item>;
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <Form>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check type='checkbox' label='In progress' />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check type='checkbox' label='Show completed tasks' />
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Row>
          <PageTaskCards tasks={allTasks} />
        </Col>
      </Row>
    </Container>
  );
};

export default Tasks;
