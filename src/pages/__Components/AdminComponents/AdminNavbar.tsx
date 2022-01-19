import { Nav, Form, FormControl } from "react-bootstrap";
import { taskInt, userInt } from "../../../typings/interfaces";
import { ResetButton } from "../Buttons";
import {
  FEATURES,
  NOTIFICATIONS,
  TASKS,
  USERS,
  USERS_SORT_BY,
} from "../../../utils/const/str";
import { useState, useEffect } from "react";

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
  const [loadingForm, setLoadingForm] = useState(false);
  const handleChange = (e: { target: { id: any; value: any } }) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "sortBy" && value === USERS_SORT_BY[0]) {
      setForm({ ...form, sortBy: value });
    } else {
      setForm({ ...form, [id]: value });
    }
  };
  const handleReset = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setForm({ dropdown: USERS, id: "", search: "" });
    setLoadingForm(true);
  };
  const usersNum = users.length;
  const tasksNum =
    form.id.length > 0
      ? tasks.filter((t) => t.createdBy === id || t.sharedWith?.includes(id))
          .length
      : tasks.length;
  const notifNum =
    users.filter((u) => u._id === form.id).length > 0
      ? users.filter((u) => u._id === form.id)[0].notification.length
      : 0;
  const usersHeader =
    id.length > 0 && form.search.length < 2
      ? `Found user '${username}' _id '${id}'`
      : form.search.length > 1
      ? `Found ${usersNum} user${usersNum !== 1 ? "s" : ""} containing '${
          form.search
        }'`
      : `Found ${usersNum} user${usersNum !== 1 ? "s" : ""}`;
  const tasksHeader =
    id.length > 0 && form.search.length < 2
      ? `Found ${tasksNum} task${
          tasksNum !== 1 ? "s" : ""
        } for username: ${username}`
      : form.search.length > 1
      ? `Found ${tasksNum} task${
          tasksNum !== 1 ? "s" : ""
        } for ${usersNum} user${usersNum !== 1 ? "s" : ""} containing '${
          form.search
        }'`
      : `Found ${tasksNum} task${
          tasksNum !== 1 ? "s" : ""
        } for ${usersNum} user${usersNum !== 1 ? "s" : ""}`;
  const notifHeader =
    users.filter((u) => u._id === form.id).length > 0
      ? `Found ${notifNum} notification${
          notifNum !== 1 ? "s" : ""
        } for username: ${username}`
      : "";
  // const DEFAULT = "Sort by...";
  useEffect(() => {
    setLoadingForm(false);
  }, [loadingForm]);
  // console.log(form);
  return !loadingForm ? (
    <Form>
      <Nav className='admin-page__form p-2'>
        <div className='d-flex mr-auto'>
          <ResetButton label='Reset' handleClick={handleReset} />
          {form.dropdown.toLowerCase().includes(USERS) && (
            <Form.Group
              controlId='dropdown'
              className='admin-page__form-dropdown'
              id='dropdown'>
              <Form.Control as='select' onChange={handleChange}>
                {dropdown.map((d) => (
                  <option key={d}>
                    Filter {d[0].toUpperCase()}
                    {d.substring(1)}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}
          <div className='admin-page__form-header p-2'>
            {form.dropdown.toLowerCase().includes(USERS)
              ? usersHeader
              : form.dropdown.toLowerCase().includes(TASKS)
              ? tasksHeader
              : notifHeader}
          </div>
        </div>
        <div>
          {!form.dropdown.toLowerCase().includes(NOTIFICATIONS) && (
            <>
              <Form.Group
                controlId='search'
                className='admin-page__form-search'>
                <FormControl
                  type='text'
                  placeholder='Search'
                  className='mr-sm-2'
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Button variant='outline-success' disabled>
                      Search
                    </Button> */}
            </>
          )}
        </div>
        {/* {form.dropdown === USERS && (
                <Form.Group
                  controlId='sortBy'
                  className='admin-page__form-dropdown ml-1'
                  id='dropdown'
                  defaultValue={DEFAULT}>
                  <Form.Control as='select' onChange={handleChange}>
                    <option disabled>{DEFAULT}</option>
                    {USERS_SORT_BY.map((string, i) => (
                      <option key={i}>{string}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )} */}
      </Nav>
    </Form>
  ) : (
    <></>
  );
};

export default AdminNavbar;