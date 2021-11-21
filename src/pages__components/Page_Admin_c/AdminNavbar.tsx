import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { taskInt, userInt } from "../../typings/interfaces";
import { ResetButton } from "../../utils/buttons";
import { FEATURES, NOTIFICATIONS, TASKS, USERS } from "../../utils/constants";

type AdminNavbarProps = {
  user: userInt;
  username: string;
  users: userInt[];
  tasks: taskInt[];
  form: any;
  setForm: any;
};

const AdminNavbar = (props: AdminNavbarProps) => {
  const { user, username, users, tasks, form, setForm } = props;
  const { id } = form;
  const dropdown = [USERS, TASKS, NOTIFICATIONS, FEATURES];
  const changeDropdown = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setForm({
      ...form,
      dropdown: value,
    });
  };
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ dropdown: USERS, id: "", search: "" });
  };
  const usersNum = users.length;
  const tasksNum =
    form.id.length > 0
      ? tasks.filter((t) => t.createdBy === id).length
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
        } belonging to user ${username}`
      : `found ${tasksNum} task${
          tasksNum > 1 ? "s" : ""
        } belonging to ${usersNum} user${usersNum !== 1 ? "s" : ""}`;
  const notifHeader =
    users.filter((u) => u._id === form.id).length > 0
      ? `${notifNum} notification${
          notifNum !== 1 ? "s" : ""
        } belonging to user ${username}`
      : "";
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form>
          <Nav className='mr-auto admin-page__form'>
            <ResetButton label='Reset' handleClick={handleClick} />
            <Form.Group className='admin-page__form-dropdown' id='dropdown'>
              <Form.Control as='select' onChange={changeDropdown}>
                {dropdown.map((d) => (
                  <option key={d} selected={form.dropdown === d}>
                    {d}
                  </option>
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
            <Form.Group className='admin-page__form-search'>
              <FormControl
                type='text'
                placeholder='Search'
                className='mr-sm-2'
              />
            </Form.Group>
            <Button variant='outline-success'>Search</Button>
          </Nav>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
