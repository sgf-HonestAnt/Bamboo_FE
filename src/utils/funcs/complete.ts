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
    const username = await checkToken(refreshToken, history);
    if (username) {
      for (let i = 0; i < taskIds.length; i++) {
        console.log("ATTEMPTING TO COMPLETE TASK", i)
        const update = { status: "completed" };
        updateTask(taskIds[i], update, dispatch);
      }
    }
  } catch (error) {
    console.log("😥TROUBLE MARKING TASK COMPLETE", error)
    history.push("/login");
  }
};

export default attemptCompleteTasks;
