import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { publicUserInt } from "../../typings/interfaces";
import { SubmitButton } from "../../utils/appButtons";
import { getUserByQuery } from "../../utils/f_users";

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
  const { search, setSearch } = props;
  const [result, setResult] = useState<ResultProps>({
    found: false,
    user: null,
    message: "No user found",
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
  return (
    <div className='dashboard__search-bar m-2'>
      Find a user
      <Form onSubmit={handleSubmit}>
        <FormControl
          type='text'
          placeholder='Search'
          className='mr-sm-2'
          onChange={handleChange}
        />
        <SubmitButton />
      </Form>
      {result.found && result.user ? (
        <>
          <div>{result.message}</div>
          <div>
            <img
              src={result.user?.avatar}
              alt=''
              className='dashboard__search-bar__avatar'
            />
            {result.user?.username}
          </div>
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
