import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Container, Row, Col, Table } from "react-bootstrap";
import { currentFeaturesInt, taskInt, userInt } from "../../typings/interfaces";
import { getUsersAsAdmin } from "../../utils/f_getUsers";
import AdminNavbar from "../../pages__components/Page_Admin_c/AdminNavbar";
import {
  TasksTableHeading,
  UsersTableHeading,
} from "../../pages__components/Page_Admin_c/TableHeadings";
import UsersRow from "../../pages__components/Page_Admin_c/UsersRow";
import "./styles.css";
import { getAllTasks } from "../../utils/f_getTasks";
import TasksRow from "../../pages__components/Page_Admin_c/TasksRow";

type AdminPageProps = {
  user: userInt; // to ensure admin role
  features: currentFeaturesInt; // to check featured challenges
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const AdminPage = (props: AdminPageProps) => {
  const { user, features, history, location } = props;
  const [users, setUsers] = useState<userInt[] | never>([]);
  const [tasks, setTasks] = useState<taskInt[] | never>([]);
  const [form, setForm] = useState({ dropdown: "Users", search: "" });
  let tasksData;
  const loadAdmin = async () => {
    const usersData = await getUsersAsAdmin(form.search);
    tasksData = await getAllTasks(form.search);
    setUsers(usersData);
    setTasks(tasksData.tasks);
  };
  useEffect(() => {
    loadAdmin();
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  console.log(form);
  return !user.admin ? (
    <Container fluid>
      <Row className='admin-page' id='denied'>
        <Col sm={6}>
          <h1>Access Denied</h1>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid>
      <Row>
        <Col sm='12' className='p-0 m-0'>
          <AdminNavbar user={user} form={form} setForm={setForm} />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          {form.dropdown === "Users" ? (
            <UsersTableHeading usersNum={users.length} search={form.search} />
          ) : (
            <TasksTableHeading tasksNum={tasks.length} search={form.search} />
          )}
          <tbody>
            {form.dropdown === "Users"
              ? users.map((u) => (
                  <UsersRow
                    _id={u._id}
                    first_name={u.first_name}
                    last_name={u.last_name}
                    bio={u.bio}
                    username={u.username}
                    email={u.email}
                    admin={u.admin}
                    avatar={u.avatar}
                    level={u.level}
                    xp={u.xp}
                    notification={u.notification}
                    createdAt={u.createdAt}
                    updatedAt={u.updatedAt}
                    form={form}
                    setForm={setForm}
                  />
                ))
              : tasks.map((t) => (
                  <TasksRow
                    _id={t._id}
                    title={t.title}
                    desc={t.desc}
                    category={t.category}
                    image={t.image}
                    repeats={t.repeats}
                    type={t.type}
                    status={t.status}
                    value={t.value}
                    createdBy={t.createdBy}
                    deadline={t.deadline}
                    _v={t._v}
                    form={form}
                    setForm={setForm}
                  />
                ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default AdminPage;
