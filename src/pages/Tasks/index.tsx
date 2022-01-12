import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { beautifulDnD, reduxStateInt, taskInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import TasksFilterRow from "./TasksComponents/TasksFilterRow";
import DragDropContainer from "./TasksComponents/DragDropContainer";
import "./styles.css";
import {
  ANY_DUE,
  ANY_CAT,
  ANY_VAL,
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  ANY_TYPE,
  OVERDUE,
} from "../../utils/appConstants";
import { getTaskByQuery, getTasks } from "../../utils/f_tasks";
import { filterTasksByOverdue } from "../../utils/f_dates";

type TasksPageProps = {
  history: History<unknown> | string[];
  location: Location<unknown>;
};
export default function TasksPage(props: TasksPageProps) {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { my_user } = state.currentUser;
  const tasks = state.currentTasks;
  const { tasks_to_hide } = my_user;
  const { awaited, in_progress, completed } = tasks;
  const allTasks = awaited.concat(in_progress, completed);
  const { history, location } = props;
  const [taskList, setTaskList] = useState<taskInt[]>(allTasks);
  const [filter, setFilter] = useState({
    due: ANY_DUE,
    cat: ANY_CAT,
    val: ANY_VAL,
    type: ANY_TYPE,
  });
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  const filterTasksOverdue = async (updatedTasks: taskInt[]) => {
    let overdueTasks: taskInt[] = [];
    const tasksWithDeadlines = updatedTasks.filter(
      (task: taskInt) => task.deadline !== null
    );
    if (tasksWithDeadlines) {
      overdueTasks = await filterTasksByOverdue(tasksWithDeadlines);
    }
    setTaskList(overdueTasks);
  };
  const retrieveTasks = async (query?: string) => {
    const data = query
      ? await getTaskByQuery(query, my_user._id)
      : await getTasks();
    let updatedTasks;
    if (query) {
      updatedTasks = data.tasks;
      if (filter.due === OVERDUE) {
        filterTasksOverdue(updatedTasks);
      } else {
        setTaskList(updatedTasks);
      }
    } else {
      const { awaited, in_progress, completed } = data;
      updatedTasks = awaited.concat(in_progress, completed);
      setTaskList(updatedTasks);
      if (filter.due === OVERDUE) {
        filterTasksOverdue(updatedTasks);
      } else {
        setTaskList(updatedTasks);
      }
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
              .filter(
                (task: taskInt) => !tasks_to_hide.some((id) => id === task._id)
              )
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
    const dueQuery =
      filter.due !== ANY_DUE && filter.due !== OVERDUE
        ? `deadline=${filter.due}&`
        : "";
    const catQuery = filter.cat !== ANY_CAT ? `category=${filter.cat}&` : "";
    const valQuery = filter.val !== ANY_VAL ? `value=${filter.val}&` : "";
    const typeQuery = filter.type !== ANY_TYPE ? `type=${filter.type}&` : "";
    const fullQuery = `${dueQuery}${catQuery}${valQuery}${typeQuery}`;
    const queryWithoutAmpersand = fullQuery.slice(0, fullQuery.length - 1);
    retrieveTasks(queryWithoutAmpersand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  console.log("initialData at Tasks index=>", initialData)
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