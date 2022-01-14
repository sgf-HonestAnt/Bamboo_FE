import { History } from "history";
import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  currentUserInt,
  publicUserInt,
  reduxStateInt,
} from "../../typings/interfaces";
import { Form, FormControl, Button, Col } from "react-bootstrap";
import { SubmitButton } from "./Buttons";
import { requestFollow } from "../../utils/funcs/f_follows";
import { getUserByQuery } from "../../utils/funcs/f_users";

type ResultProps = {
  found: boolean;
  user: publicUserInt | null;
  message: string;
};
type FindTeamProps = {
  history: History<unknown> | string[];
  search: string;
  setSearch: any;
};
const FindTeam = (props: FindTeamProps) => {
  const currentUser: currentUserInt = useAppSelector(
    (state: reduxStateInt) => state.currentUser
  );
  const { followedUsers, my_user } = currentUser;
  const { _id } = my_user;
  const { search, setSearch } = props;
  const [result, setResult] = useState<ResultProps>({
    found: false,
    user: null,
    message: "",
  });
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { publicUsers } = await getUserByQuery(`/^${search}$/i`);
    if (publicUsers.length > 0) {
      setResult({ found: true, user: publicUsers[0], message: "User found:" });
    } else setResult({ found: true, user: null, message: "No user found" });
  };
  const sendRequest = async () => {
    const success = await requestFollow(result.user ? result.user?._id : "");
    if (success) {
      setResult({
        ...result,
        user: null,
        message: "Request sent. You will be notified if accepted",
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
    <Col className='col-12 bamboo-card-mid dashboard__search-bar'>
      <div className='dashboard__alt__card-header pt-1'>Find Teammates</div>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type='text'
          placeholder='Search by username or email'
          className='mr-sm-2'
          id="search"
          onChange={handleChange}
        />
        <SubmitButton />
      </Form>
      {result.found && result.user ? (
        <>
          <div>
            <img
              src={result.user?.avatar}
              alt=''
              className='dashboard__search-bar__avatar'
            />
          </div>
          {result.user?.username}{" "}
          {_id !== result.user._id &&
            !followedUsers.some((u) => u._id === result.user?._id) && (
              <div>
                <Button variant='link' onClick={sendRequest}>
                  Request to follow user?
                </Button>
              </div>
            )}
        </>
      ) : result.found ? (
        <div>{result.message}</div>
      ) : (
        <></>
      )}
    </Col>
  );
};

export default FindTeam;
