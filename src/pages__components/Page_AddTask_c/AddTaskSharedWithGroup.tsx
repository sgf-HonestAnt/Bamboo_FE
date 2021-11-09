import { Form } from "react-bootstrap";
import { followedUserInt, setTaskInt } from "../../typings/interfaces";

type SharedWithGroupProps = {
  followedUsers: followedUserInt[];
  form: setTaskInt;
  changeSharedWith: any;
};

const SharedWithGroup = (props: SharedWithGroupProps) => {
  const { followedUsers, form, changeSharedWith } = props;
  return followedUsers.length > 0 ? (
    <Form.Group controlId='sharedWith'>
      <Form.Label>Choose up to 3</Form.Label>
      <Form.Control
        as='select'
        multiple
        onChange={changeSharedWith}
        aria-describedby='sharedWithHelpBlock'>
        <option value='' disabled selected>
          Select a username
        </option>
        {followedUsers.map((u, i) => (
          <option
            key={i}
            value={u._id}
            selected={form.sharedWith.includes(u._id)}>
            {u.username}
          </option>
        ))}
      </Form.Control>
      <Form.Text id='sharedWithHelpBlock' muted>
        Alternatively, you can create a new category.
      </Form.Text>
    </Form.Group>
  ) : (
    <div>You need to follow other users to share a task!</div>
  );
};

export default SharedWithGroup;
