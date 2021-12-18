import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import {
  currentFeaturesInt,
  reduxStateInt,
  taskInt,
  userInt,
} from "../../typings/interfaces";
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
import { ICOURGENT } from "../../utils/appIcons";
import { useAppSelector } from "../../redux/hooks";

type AdminPageForm = {
  dropdown: string;
  id: string;
  search: string;
};
type AdminPageProps = {
  user: userInt; // to ensure admin role
  features: currentFeaturesInt; // to check featured challenges
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const AdminPage = (props: AdminPageProps) => {
  // console.log("FIX NEEDED ON ADMINPAGE"); // 🔨 FIX NEEDED: CHANGE SELECTED FEATURE
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  // include search users by username or email
  const { user, location, history } = props;
  const signedInId = my_user._id;
  const [usersData, setUsersData] = useState<userInt[]>();
  const [usersToDisplay, setUsersToDisplay] = useState<userInt[]>();
  const [tasksData, setTasksData] = useState<taskInt[]>();
  const [tasksToDisplay, setTasksToDisplay] = useState<taskInt[]>();
  const [notifications, setNotifications] = useState<string[]>();
  const [form, setForm] = useState<AdminPageForm>({
    dropdown: USERS,
    id: "",
    search: "",
  });
  const userByFormId = usersToDisplay?.find((u) => u._id === form.id);
  const username = usersToDisplay && userByFormId ? userByFormId.username : "";
  const resetForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ dropdown: USERS, id: "", search: "" });
    history.push("/admin-dash");
  };
  const loadAdmin = async () => {
    const data = await getUsersAsAdmin(form.id);
    const allTasks = await getAllTasks(form.id);
    setUsersData(data);
    setUsersToDisplay(data);
    setTasksData(allTasks.tasks);
    setTasksToDisplay(allTasks.tasks);
    form.dropdown === NOTIFICATIONS &&
      usersData &&
      usersData.length > 0 &&
      setNotifications(
        usersData.filter((u) => u._id === form.id)[0].notification
      );
  };
  useEffect(() => {
    loadAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const { search, dropdown } = form;
    const num = search.length;
    if (num > 2) {
      if (usersData && dropdown === USERS) {
        const filtered = usersData.filter(
          (user) =>
            user.username.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.first_name.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.last_name.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.first_name
              .concat(" ", user.last_name)
              .slice(0, num)
              .toLowerCase() === search.toLowerCase() ||
            user.email.slice(0, num).toLowerCase() === search.toLowerCase()
        );
        console.log(filtered.length);
        setUsersToDisplay(filtered);
      } else if (tasksData && dropdown === TASKS) {
        const filtered = tasksData.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.desc.toLowerCase().includes(search.toLowerCase()) ||
            task.category.slice(0, num).toLowerCase() === search.toLowerCase()
        );
        console.log(filtered.length);
        setTasksToDisplay(filtered);
      } else {
        console.log("notifications drop");
      }
    } else {
      setUsersToDisplay(usersData)
      setTasksToDisplay(tasksData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  // useEffect(() => {
  //   const { search, dropdown } = form;
  //   const num = search.length;
  //   if (num > 2) {/* 🔨 FIX NEEDED: should also change as num goes down! */}
  //     if (usersData && dropdown === USERS) {
  //       const filtered = usersData.filter(
  //         (user) =>
  //           user.username.slice(0, num).toLowerCase() ===
  //             search.toLowerCase() ||
  //           user.first_name.slice(0, num).toLowerCase() ===
  //             search.toLowerCase() ||
  //           user.last_name.slice(0, num).toLowerCase() ===
  //             search.toLowerCase() ||
  //           user.first_name
  //             .concat(" ", user.last_name)
  //             .slice(0, num)
  //             .toLowerCase() === search.toLowerCase() ||
  //           user.email.slice(0, num).toLowerCase() === search.toLowerCase()
  //       );
  //       setUsersToDisplay(filtered);
  //     }
  //     if (tasks && dropdown === TASKS) {
  //       const filtered = tasks.filter(
  //         (task) =>
  //           task.title.toLowerCase().includes(search.toLowerCase()) ||
  //           task.desc.toLowerCase().includes(search.toLowerCase()) ||
  //           task.category.slice(0, num).toLowerCase() === search.toLowerCase()
  //       );
  //       setTasksToDisplay(filtered);
  //       }
  //     if (notifications && dropdown === NOTIFICATIONS) {
  //       console.log("HI")
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [form]);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  return !user.admin ? (
    <Container fluid className='admin-page'>
      <Row id='denied'>
        <Col sm={6}>
          <h1>Access Denied</h1>
        </Col>
      </Row>
    </Container>
  ) : usersToDisplay && tasksToDisplay ? (
    <Container fluid className='admin-page'>
      <Row>
        <div className='red'>
          <ICOURGENT />
          add delete and edit function
        </div>
        <Col sm='12' className='p-0 m-0'>
          <AdminNavbar
            users={usersToDisplay}
            username={username}
            tasks={tasksToDisplay}
            form={form}
            setForm={setForm}
          />
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover>
          {form.dropdown === USERS && usersToDisplay.length > 0 ? (
            <UsersTableHeading />
          ) : form.dropdown === TASKS && tasksToDisplay.length > 0 ? (
            <TasksTableHeading />
          ) : form.dropdown === NOTIFICATIONS &&
            notifications &&
            notifications.length > 0 ? (
            <NotificationsTableHeading />
          ) : (
            <></>
          )}
          <tbody>
            {form.dropdown === USERS && form.id.length > 0 ? (
              usersToDisplay
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
                    total_xp={u.total_xp}
                    total_completed={u.total_completed}
                    notification={u.notification}
                    createdAt={u.createdAt}
                    updatedAt={u.updatedAt}
                    form={form}
                    setForm={setForm}
                  />
                ))
            ) : form.dropdown === USERS ? (
              usersToDisplay.map((u, i) => (
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
                  total_xp={u.total_xp}
                  total_completed={u.total_completed}
                  notification={u.notification}
                  createdAt={u.createdAt}
                  updatedAt={u.updatedAt}
                  form={form}
                  setForm={setForm}
                />
              ))
            ) : form.dropdown === TASKS && form.id.length > 0 ? (
              tasksToDisplay
                .filter((t) => t.createdBy === form.id || t.sharedWith?.includes(form.id))
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
                    users={usersData}
                    form={form}
                    setForm={setForm}
                  />
                ))
            ) : form.dropdown === TASKS ? (
              tasksToDisplay.map((t, i) => (
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
                  users={usersData}
                  form={form}
                  setForm={setForm}
                />
              ))
            ) : usersToDisplay.filter((u) => u._id === form.id).length > 0 ? (
              usersToDisplay
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
  ) : (
    <></>
  );
};

export default AdminPage;
