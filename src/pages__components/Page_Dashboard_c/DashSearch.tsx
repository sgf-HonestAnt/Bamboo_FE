import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";
import { SubmitButton } from "../../utils/buttons";

type DashSearchProps = {};

const DashSearch = (props: DashSearchProps) => {
  //   const {} = props;
  const [search, setSearch] = useState("");
  const handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    setSearch(value);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(search);
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
    </div>
  );
};

export default DashSearch;
