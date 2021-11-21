import { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { userInt } from "../../typings/interfaces";

type AdminNavbarProps = {
  user: userInt;
  form: any;
  setForm: any;
};

const AdminNavbar = (props: AdminNavbarProps) => {
  const { user, form, setForm } = props;
  const dropdown = ["Users", "Tasks", "Features", "Something"];
  const changeDropdown = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setForm({
      ...form,
      dropdown: value,
    });
  };
  return (
    <Navbar bg='light' expand='lg'>
      <Navbar.Brand href='#home'>Welcome, {user.username}</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Form className='admin-page__form'>
          <Nav className='mr-auto'>
            {/* <Nav.Link href='#link'>Link</Nav.Link> */}
            <Form.Group className='admin-page__form-dropdown' id='dropdown'>
              <Form.Control as='select' onChange={changeDropdown}>
                {dropdown.map((d) => (
                  <option key={d} selected={form.dropdown === d}>
                    {d}
                  </option>
                ))}
                <option value='' disabled>
                  ---
                </option>
                <option value='Some other link'>Some other link</option>
              </Form.Control>
            </Form.Group>
            REFRESH FORM
          </Nav>
          <div className='admin-page__form-search'>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </div>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AdminNavbar;
