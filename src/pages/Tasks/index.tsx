import { History, Location } from "history";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { beautifulDnD, reduxStateInt, taskInt } from "../../typings/interfaces";
import { Container } from "react-bootstrap";
import TasksFilterRow from "../__Components/TasksComponents/TasksFilterRow";
import DragDropContainer from "../__Components/TasksComponents/DragDropContainer";
import {
  ANY_DUE,
  ANY_CAT,
  ANY_VAL,
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  ANY_TYPE,
  OVERDUE,
  ANY_STATUS,
  TEAM,
  SOLO,
} from "../../utils/const/str";
import { getTaskByQuery, getTasks } from "../../utils/funcs/f_tasks";
import { filterTasksByOverdue } from "../../utils/funcs/f_dates";
import "./styles.css";

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
  const { search } = location;
  const [taskList, setTaskList] = useState<taskInt[]>(allTasks);
  const [filter, setFilter] = useState({
    due: ANY_DUE,
    cat: ANY_CAT,
    val: ANY_VAL,
    type: ANY_TYPE,
    status: ANY_STATUS,
  });
  const [initialData, setInitialData] = useState<beautifulDnD>({
    tasks: [],
    lists: [],
    listOrder: [],
  });
  const filterTasksByType = async (type: string) => {
    let allShared: taskInt[] = [];
    if (type === TEAM) {
      allShared = allTasks.filter(
        (task) => task?.sharedWith && task.sharedWith.length > 1
      );
    }
    if (type === SOLO) {
      allShared = allTasks.filter(
        (task) => task?.sharedWith && task.sharedWith.length < 2
      );
    }
    setTaskList(allShared);
  };
  const filterTasksByStatus = async (status: string) => {
    let tasksByStatus: taskInt[] = [];
    if (status === AWAITED) {
      tasksByStatus = awaited;
    }
    if (status === IN_PROGRESS) {
      tasksByStatus = in_progress;
    }
    if (status === COMPLETED) {
      tasksByStatus = completed;
    }
    setTaskList(tasksByStatus);
  };
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
      } else if (filter.status !== ANY_STATUS) {
        filterTasksByStatus(filter.status);
      } else if (filter.type !== ANY_TYPE) {
        filterTasksByType(filter.type);
      } else {
        setTaskList(updatedTasks);
      }
    } else {
      const { awaited, in_progress, completed } = data;
      updatedTasks = awaited.concat(in_progress, completed);
      setTaskList(updatedTasks);
      if (filter.due === OVERDUE) {
        filterTasksOverdue(updatedTasks);
      } else if (filter.status !== ANY_STATUS) {
        filterTasksByStatus(filter.status);
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
            title: "To Do",
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
    // if (filter.type !== ANY_TYPE) {
    //   const allShared = allTasks.filter(
    //     (task) => task?.sharedWith && task.sharedWith.length > 1
    //   );
    //   setTaskList(allShared);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);
  useEffect(() => {
    if (search.includes("?category")) {
      setFilter({ ...filter, cat: search.split("=")[1].split("?")[0] });
    }
    // if (search.includes("?status")) {
    //   setFilter({ ...filter, status: search.split("=")[1].split("?")[0] });
    // }
    // if (search.includes("?value")) {
    //   setFilter({ ...filter, val: search.split("=")[1].split("?")[0] });
    // }
    // if (search.includes("?type")) {
    //   setFilter({ ...filter, type: search.split("=")[1].split("?")[0] });
    // }
    // if (search.includes("?deadline")) {
    //   setFilter({ ...filter, due: search.split("=")[1].split("?")[0] });
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);
  // useEffect(() => {
  //   const { search } = location;
  //   if (search.includes(task!._id)) {
  //     setShow(true);
  //     setView(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [location]);
  console.log("TASKS PAGE")
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
}
