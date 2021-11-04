import updateTask from "./updateTask";

const completeTasks = async (taskIds: string[]) => {
    for (let i=0; i<taskIds.length; i++) {
        updateTask(taskIds[i], { status: "completed" })
        console.log("updating=>", taskIds[i])
    }
};

export default completeTasks;
