import { History } from "history";
import { Dispatch } from "redux";
import checkToken from "./checkToken";
import updateTask from "./updateTask";

const attemptCompleteTasks = async (
  taskIds: string[],
  refreshToken: string | undefined,
  history: string[] | History<unknown>,
  dispatch: Dispatch<any>
) => {
  try {
    const token = localStorage.getItem("token");
    const username = await checkToken(token, refreshToken, history);
    if (username) {
      for (let i = 0; i < taskIds.length; i++) {
        console.log("ATTEMPTING TO COMPLETE TASK", i)
        const update = { status: "completed" };
        updateTask(taskIds[i], update, dispatch);
      }
    }
  } catch (error) {
    console.log(error);
    history.push("/login");
  }
};

export default attemptCompleteTasks;
