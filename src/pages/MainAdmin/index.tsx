import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { currentFeaturesInt, taskInt, userInt } from "../../typings/interfaces";
import { getUsersAsAdmin } from "../../utils/f_users";
import AdminNavbar from "./Components/AdminNavbar";
import {
  NotificationsTableHeading,
  TasksTableHeading,
  UsersTableHeading,
} from "./Components/TableHeadings";
import UsersRow from "./Components/UsersRow";
import "./styles.css";
import { getAllTasks } from "../../utils/f_tasks";
import TasksRow from "./Components/TasksRow";
import { NOTIFICATIONS, TASKS, USERS } from "../../utils/appConstants";
import NotificationsRow from "./Components/NotificationsRow";
// import { Link } from "react-router-dom";
import { ICOURGENT } from "../../utils/appIcons";

type AdminPageProps = {
  user: userInt; // to ensure admin role
  features: currentFeaturesInt; // to check featured challenges
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const AdminPage = (props: AdminPageProps) => {
  const { user, location } = props;
  const signedInId = user._id;
  const [users, setUsers] = useState<userInt[] | never>([]);
  const [tasks, setTasks] = useState<taskInt[] | never>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [form, setForm] = useState({ dropdown: USERS, id: "", search: "" });
  const username = users.filter((u) => u._id === form.id)[0]?.username;
  let tasksData;
  const resetForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ dropdown: USERS, id: "", search: "" });
  };
  const loadAdmin = async () => {
    const usersData = await getUsersAsAdmin(form.id);
    tasksData = await getAllTasks(form.id);
    setUsers(usersData);
    setTasks(tasksData.tasks);
    form.dropdown === NOTIFICATIONS &&
      users.length > 0 &&
      setNotifications(users.filter((u) => u._id === form.id)[0].notification);
  };
  useEffect(() => {
    loadAdmin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  console.log(form);
  console.log("users=>", users);
  console.log("tasks=>", tasks);
  console.log("notif=>", notifications);
  return !user.admin ? (
    <Container fluid className='admin-page'>
      <Row id='denied'>
        <Col sm={6}>
          <h1>Access Denied</h1>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid className='admin-page'>
      <Row>
        <div className='red'>
          <ICOURGENT />
          add delete and edit function
        </div>
        <Col sm='12' className='p-0 m-0'>
          <AdminNavbar
            user={user}
            username={username}
            users={users}
            tasks={tasks}
            form={form}
            setForm={setForm}
          />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          {form.dropdown === USERS && users.length > 0 ? (
            <UsersTableHeading />
          ) : form.dropdown === TASKS && tasks.length > 0 ? (
            <TasksTableHeading />
          ) : form.dropdown === NOTIFICATIONS && notifications.length > 0 ? (
            <NotificationsTableHeading />
          ) : (
            <></>
          )}
          <tbody>
            {form.dropdown === USERS && form.id.length > 0 ? (
              users
                .filter((u) => u._id === form.id)
                .map((u, i) => (
                  <UsersRow
                    key={i}
                    signedInId={signedInId}
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
            ) : form.dropdown === USERS ? (
              users.map((u, i) => (
                <UsersRow
                  key={i}
                  signedInId={signedInId}
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
            ) : form.dropdown === TASKS && form.id.length > 0 ? (
              tasks
                .filter((t) => t.createdBy === form.id)
                .map((t, i) => (
                  <TasksRow
                    key={i}
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
                ))
            ) : form.dropdown === TASKS ? (
              tasks.map((t, i) => (
                <TasksRow
                  key={i}
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
              ))
            ) : users.filter((u) => u._id === form.id).length > 0 ? (
              users
                .filter((u) => u._id === form.id)[0]
                .notification.map((n, i) => (
                  <NotificationsRow
                    key={i}
                    notification={n}
                    form={form}
                    setForm={setForm}
                  />
                ))
            ) : (
              <tr>
                <td colSpan={4}>
                  Select a{" "}
                  <Button
                    variant='link'
                    onClick={resetForm}
                    className='m-0 p-0'>
                    user
                  </Button>{" "}
                  to search for notifications.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default AdminPage;
