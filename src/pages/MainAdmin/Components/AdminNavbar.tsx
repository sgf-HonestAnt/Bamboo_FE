import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { taskInt, userInt } from "../../../typings/interfaces";
import { ResetButton } from "../../../pages__SharedComponents/Buttons";
import {
  FEATURES,
  NOTIFICATIONS,
  TASKS,
  USERS,
} from "../../../utils/appConstants";

type AdminNavbarProps = {
  users: userInt[];
  username: string;
  tasks: taskInt[];
  form: any;
  setForm: any;
};
const AdminNavbar = (props: AdminNavbarProps) => {
  const { users, username, tasks, form, setForm } = props;
  const { id } = form;
  const dropdown = [USERS, TASKS, NOTIFICATIONS, FEATURES];
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    setForm({ ...form, [id]: value });
  };
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ dropdown: USERS, id: "", search: "" });
  };
  const usersNum = users.length;
  const tasksNum =
    form.id.length > 0
      ? tasks.filter((t) => t.createdBy === id || t.sharedWith?.includes(id))
          .length
      : tasks.length;
  const notifNum = users[0]?.notification?.length;
  const usersHeader =
    id.length > 0
      ? `found user '${username}' _id '${id}'`
      : `found ${usersNum} user${usersNum !== 1 ? "s" : ""}`;
  const tasksHeader =
    tasksNum > 0 && id.length > 0
      ? `found ${tasksNum} task${
          tasksNum !== 1 ? "s" : ""
        } for user: ${username}`
      : `found ${tasksNum} task${
          tasksNum !== 1 ? "s" : ""
        } for ${usersNum} user${usersNum !== 1 ? "s" : ""}`;
  const notifHeader =
    users.filter((u) => u._id === form.id).length > 0
      ? `${notifNum} notification${
          notifNum !== 1 ? "s" : ""
        } belonging to user ${username}`
      : "";
  console.log(form);
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form>
          <Nav className='mr-auto admin-page__form'>
            <ResetButton label='Reset' handleClick={handleClick} />
            <Form.Group
              controlId='dropdown'
              className='admin-page__form-dropdown'
              id='dropdown'>
              <Form.Control as='select' onChange={handleChange}>
                {dropdown.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className='mx-2 admin-page__form-header'>
              {form.dropdown === USERS
                ? usersHeader
                : form.dropdown === TASKS
                ? tasksHeader
                : notifHeader}
            </div>
            <Form.Group controlId='search' className='admin-page__form-search'>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant='outline-success' disabled>
              Search
            </Button>
            {form.dropdown === USERS && (
              <Form.Group
                controlId='sortBy'
                className='admin-page__form-dropdown ml-1'
                id='dropdown'
                // defaultValue={"Sort by..."}
                >
                <Form.Control as='select' onChange={handleChange}>
                  <option selected disabled>
                    Sort by...
                  </option>
                  <option>Name (Asc)</option>
                  <option>Username(Asc)</option>
                  <option>Email (Asc)</option>
                  <option>Role (Admin-General)</option>
                  <option>Level (Asc)</option>
                  <option>XP (Asc)</option>
                  <option>Total XP (Asc)</option>
                  <option>Total Completed (Asc)</option>
                </Form.Control>
              </Form.Group>
            )}
          </Nav>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
