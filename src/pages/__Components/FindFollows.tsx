import { History } from "history";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  currentUserInt,
  publicUserInt,
  reduxStateInt,
} from "../../typings/interfaces";
import { Form, FormControl, Button, Col } from "react-bootstrap";
import { SubmitBtn } from "./Buttons";
import { requestFollow } from "../../utils/funcs/f_follows";
import { getUserByQuery } from "../../utils/funcs/f_users";
import { Link } from "react-router-dom";

type ResultProps = {
  found: boolean;
  user: publicUserInt | null;
  message: string;
};
type FindFollowsProps = {
  history: History<unknown> | string[];
  search: string;
  setSearch: any;
};
const FindFollows = (props: FindFollowsProps) => {
  const currentUser: currentUserInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser
  );
  const { followedUsers, my_user } = currentUser;
  const { notification, username, email } = my_user;
  const { search, setSearch } = props;
  const [result, setResult] = useState<ResultProps>({
    found: false,
    user: null,
    message: "",
  });
  const foundUserNotInNotifications = !notification.includes(
    `${result.user?.username} has sent you a request`
  );
  function handleChange(e: { target: { value: any } }) {
    const value = e.target.value;
    setResult({
      found: false,
      user: null,
      message: "",
    });
    setSearch(value);
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // console.log("submit=>", search);
    const { publicUsers } = await getUserByQuery(search);
    if (publicUsers.length > 0) {
      setResult({ found: true, user: publicUsers[0], message: "User found:" });
    } else setResult({ found: true, user: null, message: "No user found" });
  };
  const sendRequest = async () => {
    // console.log("send");
    const success = await requestFollow(result.user ? result.user?._id : "");
    if (success) {
      setResult({
        ...result,
        user: null,
        message: "Request sent.",
      });
    } else {
      setResult({
        ...result,
        user: null,
        message: "Duplicate requests cannot be made",
      });
    }
  };
  return (
    <Col className='col-12 bamboo-card-mid dashboard__search-bar p-0 px-3 pb-1'>
      <div className='dashboard__alt__card-header pt-1'>Find Teammates</div>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type='text'
          placeholder='Search by username or email'
          className='mr-sm-2'
          id='search'
          onChange={handleChange}
        />
        <SubmitBtn label='Search' />
      </Form>
      {result.found && result.user ? (
        <>
          <div>
            {followedUsers.some((u) => u._id === result.user?._id) ? (
              <div>
                <h4>You are already teamed with {result.user?.username}</h4>
                <Link to={`/following?id=${result.user?._id}`}>
                  <img
                    src={result.user?.avatar}
                    alt=''
                    className='dotted-border tiny-round'
                  />
                </Link>
              </div>
            ) : search === email || search === username ? (
              <h4>You can't add yourself.</h4>
            ) : foundUserNotInNotifications ? (
              <>
                <h4>
                  Found user with {search.includes("@") ? "email" : "username"}{" "}
                  "{search}"
                </h4>
                <img
                  src={result.user?.avatar}
                  alt=''
                  className='dotted-border x-tiny-round'
                />
                <Button variant='link' onClick={sendRequest}>
                  <h5>Request teammate?</h5>
                </Button>
              </>
            ) : (
              <h4>
                This user already awaits your response (see notifications).
              </h4>
            )}
          </div>
        </>
      ) : result.found ? (
        <h4>{result.message}</h4>
      ) : (
        <></>
      )}
    </Col>
  );
};

export default FindFollows;
