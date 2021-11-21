type UsersTableHeadingProps = {
  usersNum: number;
  search: string;
};
export const UsersTableHeading = (props: UsersTableHeadingProps) => {
  const { usersNum, search } = props;
  const header =
    search.length > 0
      ? `found user _id ${search}`
      : `found ${usersNum} user${usersNum > 1 ? "s" : ""}`;
  return (
    <>
      <thead>
        <tr>
          <td colSpan={9}>{header}</td>
        </tr>
        <tr>
          <th>Id</th>
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
    </>
  );
};
type TasksTableHeadingProps = {
  tasksNum: number;
  search: string;
};
export const TasksTableHeading = (props: TasksTableHeadingProps) => {
  const { tasksNum, search } = props;
  const header =
    tasksNum > 0 && search.length > 0
      ? `found ${tasksNum} task${
          tasksNum > 1 ? "s" : ""
        } belonging to user ${search}`
      : `found ${tasksNum} task${tasksNum > 1 ? "s" : ""}`;
  return (
    <thead>
      <tr>
        <td colSpan={9}>{header}</td>
      </tr>
      <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Description</th>
        <th>Category</th>
        <th>Image</th>
        <th>Value</th>
        <th>Status</th>
        <th>Deadline</th>
      </tr>
    </thead>
  );
};
