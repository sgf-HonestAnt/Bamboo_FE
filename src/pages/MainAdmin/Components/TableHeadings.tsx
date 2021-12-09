import { ICODELETE, ICOEDIT } from "../../../utils/appIcons";

type UsersTableHeadingProps = {};
export const UsersTableHeading = (props: UsersTableHeadingProps) => {
  return (
    <>
      <thead>
        <tr>
          <th>
            <ICOEDIT />
          </th>
          <th>
            <ICODELETE />
          </th>
          <th>Id</th>
          <th>Name</th>
          <th>Username</th>
          <th>Tasks</th>
          <th>Notifications</th>
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
type TasksTableHeadingProps = {};
export const TasksTableHeading = (props: TasksTableHeadingProps) => {
  return (
    <thead>
      <tr>
        <th>
          <ICOEDIT />
        </th>
        <th>
          <ICODELETE />
        </th>
        <th>Id</th>
        <th>Title</th>
        <th>Created By</th>
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
type NotificationsTableHeadingProps = {};
export const NotificationsTableHeading = (props: NotificationsTableHeadingProps) => {
  return (
    <thead>
      <tr>
        <th>
          <ICOEDIT />
        </th>
        <th>
          <ICODELETE />
        </th>
        <th>Text</th>
        <th>Belongs to</th>
      </tr>
    </thead>
  );
};
