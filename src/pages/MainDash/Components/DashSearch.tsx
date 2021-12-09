import { useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { publicUserInt, reduxStateInt } from "../../../typings/interfaces";
import { Form, FormControl, Button } from "react-bootstrap";
import { SubmitButton } from "../../../pages__SharedComponents/Buttons";
import { requestFollow } from "../../../utils/f_follows";
import { getUserByQuery } from "../../../utils/f_users";

type ResultProps = {
  found: boolean;
  user: publicUserInt | null;
  message: string;
};
type DashSearchProps = {
  search: string;
  setSearch: any;
};
const DashSearch = (props: DashSearchProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { followedUsers, my_user } = state.currentUser;
  const { _id } = my_user;
  // const tasks = state.currentTasks;
  // const categories = tasks.categories;
  // const features = state.currentFeatures;
  // const settings = state.currentSettings;
  // const achievements = state.currentAchievements;
  // const { list, superlist } = achievements;
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
    <div className='dashboard__search-bar m-2 px-4'>
      <div className='dashboard__card-header'>Find a User</div>
      <Form onSubmit={handleSubmit}>
        <FormControl
          type='text'
          placeholder='Search by username or email'
          className='mr-sm-2'
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
    </div>
  );
};

export default DashSearch;
