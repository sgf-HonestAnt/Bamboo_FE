import { useState, useEffect } from "react";
import { History, Location } from "history";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { currentFeaturesInt, userInt } from "../../typings/interfaces";
import AdminNavbar from "../../pages__components/Page_Admin_c/AdminNavbar";
import { getUsersAsAdmin } from "../../utils/f_getUsers";
import { Link } from "react-router-dom";
import "./styles.css";

type AdminPageProps = {
  user: userInt; // to ensure admin role
  features: currentFeaturesInt; // to check featured challenges
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const AdminPage = (props: AdminPageProps) => {
  const { user, features, history, location } = props;
  const [users, setUsers] = useState<userInt[] | never>([]);
  const [form, setForm] = useState({ dropdown: "", search: "" });
  const loadAdmin = async () => {
    const usersData = await getUsersAsAdmin();
    setUsers(usersData);
  };
  useEffect(() => {
    loadAdmin();
  }, []);
  useEffect(() => {
    console.log(location.pathname);
  }, [location.pathname]);
  console.log(users);
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
          <thead>
            <tr>
              <th>Id</th>
              <th></th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Avatar</th>
              <th>Level</th>
              <th>XP</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {form.dropdown === "Users" &&
              users.map((u) => (
                <tr>
                  <td className='admin-page__table__id'>{u._id}</td>
                  <td>
                    {" "} 
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(u._id);
                      }}>
                      Copy
                    </Button>
                  </td>
                  <td>
                    {u.first_name} {u.last_name}
                  </td>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>{u.admin ? "Admin" : "General"}</td>
                  <td>
                    <Link to={u.avatar}>Link</Link>
                  </td>
                  <td>{u.level}</td>
                  <td>{u.xp}</td>
                  <td>{u.createdAt.slice(0, 10)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default AdminPage;
