import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { beautifulDnD, reduxStateInt, taskInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import TasksFilterRow from "./Components/TasksFilterRow";
import DragDropContainer from "./Components/DragDropContainer";
import "./styles.css";
import {
  ANY_DUE,
  ANY_CAT,
  ANY_VAL,
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  ANY_TYPE,
} from "../../utils/appConstants";
import { getTaskByQuery, getTasks } from "../../utils/f_tasks";

type TasksPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
const TasksPage = (props: TasksPageProps) => {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const tasks = state.currentTasks;
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { history, location } = props;
  const [taskList, setTaskList] = useState<taskInt[]>(allTasks);
  // FILTER
  const [filter, setFilter] = useState({
    due: ANY_DUE,
    cat: ANY_CAT,
    val: ANY_VAL,
    type: ANY_TYPE,
  });
  // QUERY
  // const [query, setQuery] = useState("");
  // BEAUTIFUL DND
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  const retrieveTasks = async (query?: string) => {
    const data = query
      ? await getTaskByQuery(query, my_user._id)
      : await getTasks();
    let updatedTasks;
    if (query) {
      updatedTasks = data.tasks;
      setTaskList(updatedTasks);
    } else {
      const { awaited, in_progress, completed } = data;
      updatedTasks = awaited.concat(in_progress, completed);
      setTaskList(updatedTasks);
    }
  };
  useEffect(() => {
    if (taskList) {
      setInitialData({
        tasks: taskList, //[{}]
        lists: [
          {
            id: AWAITED,
            title: "To do",
            taskIds: taskList
              .filter((t) => t.status === AWAITED)
              .map((t) => t._id),
          },
          {
            id: IN_PROGRESS,
            title: "In Progress",
            taskIds: taskList
              .filter((t) => t.status === IN_PROGRESS)
              .map((t) => t._id),
          },
          {
            id: COMPLETED,
            title: "Completed",
            taskIds: taskList
              .filter((t) => t.status === COMPLETED)
              .map((t) => t._id),
          },
        ],
        listOrder: [AWAITED, IN_PROGRESS, COMPLETED],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskList]);
  useEffect(() => {
    const dueQuery = filter.due !== ANY_DUE ? `deadline=${filter.due}&` : "";
    const catQuery = filter.cat !== ANY_CAT ? `category=${filter.cat}&` : "";
    const valQuery = filter.val !== ANY_VAL ? `value=${filter.val}&` : "";
    const typeQuery = filter.type !== ANY_TYPE ? `type=${filter.type}&` : "";
    const fullQuery = `${dueQuery}${catQuery}${valQuery}${typeQuery}`;
    const queryWithoutAmpersand = fullQuery.slice(0, fullQuery.length - 1);
    retrieveTasks(queryWithoutAmpersand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  return (
    <Container fluid>
      <TasksFilterRow
        taskList={taskList}
        setTaskList={setTaskList}
        initialData={initialData}
        setInitialData={setInitialData}
        history={history}
        location={location}
        filter={filter}
        setFilter={setFilter}
        // query={query}
        // setQuery={setQuery}
      />
      <DragDropContainer
        initialData={initialData}
        setInitialData={setInitialData}
        taskList={taskList}
        setTaskList={setTaskList}
        history={history}
        location={location}
      />
    </Container>
  );
};

export default TasksPage;
