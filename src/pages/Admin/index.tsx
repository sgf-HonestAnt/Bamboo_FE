import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Container, Row, Col, Table } from "react-bootstrap";
import {
  currentFeaturesInt,
  reduxStateInt,
  taskInt,
  userInt,
} from "../../typings/interfaces";
import {
  getUsersAsAdmin,
  sortUsersAsc,
  sortUsersDesc,
} from "../../utils/funcs/f_users";
import AdminNavbar from "../__Components/AdminComponents/AdminNavbar";
import {
  NotificationsTableHeading,
  TasksTableHeading,
  UsersTableHeading,
} from "../__Components/AdminComponents/TableHeadings";
import UsersRow from "../__Components/AdminComponents/UsersRow";
import { getAllTasks } from "../../utils/funcs/f_tasks";
import TasksRow from "../__Components/AdminComponents/TasksRow";
import {
  NAME_ASC,
  NAME_DESC,
  NOTIFICATIONS,
  TASKS,
  USERNAME_ASC,
  USERNAME_DESC,
  USERS,
} from "../../utils/const/str";
import NotificationsRow from "../__Components/AdminComponents/NotificationsRow";
import { useAppSelector } from "../../redux/hooks";
import "./styles.css";

type AdminPageForm = {
  dropdown: string;
  id: string;
  search: string;
  sortBy?: string;
};
type AdminPageProps = {
  user: userInt;
  features: currentFeaturesInt;
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function AdminPage(props: AdminPageProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const { user } = props;
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
    if (usersToDisplay && form.sortBy) {
      if (form.sortBy === USERNAME_ASC) {
        const sortedUsers = sortUsersAsc(usersToDisplay, "username");
        setUsersToDisplay(sortedUsers);
      } else if (form.sortBy === USERNAME_DESC) {
        const sortedUsers = sortUsersDesc(usersToDisplay, "username");
        setUsersToDisplay(sortedUsers);
      } else if (form.sortBy === NAME_ASC) {
        const sortedUsers = sortUsersDesc(usersToDisplay, "fullName");
        setUsersToDisplay(sortedUsers);
      } else if (form.sortBy === NAME_DESC) {
        const sortedUsers = sortUsersDesc(usersToDisplay, "fullName");
        setUsersToDisplay(sortedUsers);
      } else {
        return;
      }
    }
    if (num > 1) {
      if (usersData && dropdown.toLowerCase().includes(USERS)) {
        const filtered = usersData.filter(
          (user) =>
            user.username.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.first_name.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.last_name.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            user.first_name
              .concat(" ", user.last_name)
              .slice(0, num)
              .toLowerCase() === search.toLowerCase() ||
            user.email.slice(0, num).toLowerCase() === search.toLowerCase() ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
        setUsersToDisplay(filtered);
      }
      if (tasksData && dropdown.toLowerCase().includes(TASKS)) {
        const filtered = tasksData.filter(
          (task) =>
            task.title.toLowerCase().includes(search.toLowerCase()) ||
            task.desc.toLowerCase().includes(search.toLowerCase()) ||
            task.category.slice(0, num).toLowerCase() ===
              search.toLowerCase() ||
            task.category.toLowerCase().includes(search.toLowerCase())
        );
        setTasksToDisplay(filtered);
      }
    } else {
      setUsersToDisplay(usersData);
      setTasksToDisplay(tasksData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);
  return !user.admin ? (
    <Container fluid className='admin-page'>
      <Row id='denied'>
        <h1 className='m-auto'>Access Denied</h1>
      </Row>
    </Container>
  ) : usersToDisplay && tasksToDisplay ? (
    <Container fluid className='admin-page'>
      <Row>
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
        <Table
          striped
          bordered
          hover
          size='sm'
          responsive
          className='admin-page__admin-table'>
          {form.dropdown.toLowerCase().includes(USERS) &&
          usersToDisplay.length > 0 ? (
            <UsersTableHeading />
          ) : form.dropdown.toLowerCase().includes(TASKS) &&
            tasksToDisplay.length > 0 ? (
            <TasksTableHeading />
          ) : form.dropdown
              .toLowerCase()
              .includes(NOTIFICATIONS || "notification") &&
            notifications &&
            usersToDisplay.filter((u) => u._id === form.id).length > 0 ? (
            <NotificationsTableHeading />
          ) : (
            <></>
          )}
          <tbody>
            {form.dropdown.toLowerCase().includes(USERS) &&
            form.id.length > 0 ? (
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
                    rewards={u.rewards}
                    total_xp={u.total_xp}
                    total_completed={u.total_completed}
                    tasks_to_hide={u.tasks_to_hide}
                    notification={u.notification}
                    createdAt={u.createdAt}
                    updatedAt={u.updatedAt}
                    form={form}
                    setForm={setForm}
                  />
                ))
            ) : form.dropdown.toLowerCase().includes(USERS) ? (
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
                  rewards={u.rewards}
                  total_xp={u.total_xp}
                  total_completed={u.total_completed}
                  tasks_to_hide={u.tasks_to_hide}
                  notification={u.notification}
                  createdAt={u.createdAt}
                  updatedAt={u.updatedAt}
                  form={form}
                  setForm={setForm}
                />
              ))
            ) : form.dropdown.toLowerCase().includes(TASKS) &&
              form.id.length > 0 ? (
              tasksToDisplay
                .filter(
                  (t) =>
                    t.createdBy === form.id || t.sharedWith?.includes(form.id)
                )
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
            ) : form.dropdown.toLowerCase().includes(TASKS) ? (
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
                    users={usersToDisplay}
                  />
                ))
            ) : (
              <tr>
                <td colSpan={12}>Select a user to search for notifications.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Row>
    </Container>
  ) : (
    <></>
  );
}
