import { Container, Row, Col } from "react-bootstrap";
import { dataInt, nameValTasks, reduxStateInt } from "../../typings/interfaces";
import { useAppSelector } from "../../redux/hooks";
import PieChartWithCustomizedLabel from "./Components/PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./Components/PieChartWithPaddingAngle";
import MixedBarChart from "./Components/MixedBarChart";
import "./styles.css";
import { returnMessage } from "../../utils/f_statistics";

const mixedBarChartSampleData = [
  {
    category: "Work",
    awaited: 4000,
    in_progress: 2400,
    completed: 1500,
  },
  {
    category: "Home",
    awaited: 3000,
    in_progress: 1398,
    completed: 1500,
  },
  {
    category: "Work1",
    awaited: 4000,
    in_progress: 2400,
    completed: 1500,
  },
  {
    category: "Home1",
    awaited: 3000,
    in_progress: 1398,
    completed: 1500,
  },
];

export default function StatsPage() {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  //const { my_user } = state.currentUser;
  //const { total_completed } = my_user;
  const { categories, awaited, in_progress, completed } = currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const mapByStatus = (data: dataInt) => {
    const tasksByStatus = [
      { title: "Awaited", tasks: awaited },
      { title: "In Progress", tasks: in_progress },
      { title: "Completed", tasks: completed },
    ];
    tasksByStatus.map((task, i) => {
      data.allByStatus.push({
        name: task.title,
        value: task.tasks.length,
        tasks: task.tasks,
      });
      return data;
    });
  };
  const mapByCategory = (data: dataInt) => {
    categories.map((category, i) => {
      data.allByCategory.push({
        name: category,
        value: 0,
        tasks: [],
      });
      return data;
    });
    for (let i = 0; i < allTasks.length; i++) {
      for (let j = 0; j < data.allByCategory.length; j++) {
        if (allTasks[i].category === data.allByCategory[j].name) {
          data.allByCategory[j].tasks.push(allTasks[i]);
          data.allByCategory[j].value++;
        }
      }
    }
  };
  const mapByType = (data: dataInt) => {
    const tasksByType: nameValTasks[] = [
      { name: "team", value: 0, tasks: [] },
      { name: "solo", value: 0, tasks: [] },
    ];
    for (let i = 0; i < allTasks.length; i++) {
      for (let j = 0; j < tasksByType.length; j++) {
        if (allTasks[i].type === tasksByType[j].name) {
          tasksByType[j].tasks.push(allTasks[i]);
          tasksByType[j].value++;
        }
      }
    }
    data.allByType = tasksByType;
  };
  const mapData = () => {
    let data: dataInt = {
      allByStatus: [],
      allByCategory: [],
      allByCreatedAt: [],
      allByUpdatedAt: [],
      allByType: [],
      allByDueDate: [],
    }; 
    // by status
    mapByStatus(data);
    // by category
    mapByCategory(data);
    // by type
    mapByType(data);
    return data;
  };
  const taskData = mapData();
  const STATUS_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const TYPE_COLORS = ["#000", "#FFF"];
  const timeSpecific = "overall"; // this week / last week
  const checkAmounts = `${allTasks.length / 2}-${
    taskData.allByStatus[0].tasks.length
  }-${taskData.allByStatus[1].tasks.length}-${
    taskData.allByStatus[2].tasks.length
  }`;
  const statusMessage =
    taskData.allByStatus[0].tasks.length > allTasks.length / 2
      ? `Over half of your tasks ${timeSpecific} are marked '${taskData.allByStatus[0].name}'`
      : taskData.allByStatus[1].tasks.length > allTasks.length / 2
      ? `Over half of your tasks ${timeSpecific} are marked '${taskData.allByStatus[1].name}'`
      : taskData.allByStatus[2].tasks.length > allTasks.length / 2
      ? `Over half of your tasks ${timeSpecific} are marked '${taskData.allByStatus[2].name}'`
      : taskData.allByStatus[0].tasks.length ===
          taskData.allByStatus[1].tasks.length &&
        taskData.allByStatus[0].tasks.length ===
          taskData.allByStatus[2].tasks.length
      ? `Your awaited, completed and in-progress tasks are evenly split`
      : taskData.allByStatus[0].tasks.length ===
        taskData.allByStatus[1].tasks.length
      ? `Your '${taskData.allByStatus[0].name}' and '${taskData.allByStatus[1].name}' tasks are evenly split`
      : checkAmounts;
  const soloOrTeamMessage = returnMessage(taskData, timeSpecific);
  console.log("TEST DATA=>", allTasks.length, taskData);
  return (
    <Container fluid>
      <Row className='m-2 main-stats'>
        <Col sm={12} className='p-2'>
          <h2>Statistics</h2>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa eius
            tempora nesciunt sapiente optio blanditiis vero nisi eos, provident
            ea distinctio praesentium non enim, saepe laudantium sit reiciendis
            nihil perspiciatis, quidem excepturi soluta suscipit odio amet
            commodi.
          </div>
        </Col>
        <Col sm={12} className='p-2'>
          <h4>Tasks by Category</h4>
          <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
          <MixedBarChart data={mixedBarChartSampleData} />
        </Col>
        <Col sm={12} className='p-2'>
          <h4>Tasks by Status, Deadline and Repetition</h4>
          <div>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</div>
        </Col>
        <Col className='p-2'>
          <h5>Awaited, In Progress or Completed?</h5>
          <div>
            {checkAmounts} {statusMessage}
          </div>
          <PieChartWithPaddingAngle
            deg360={false}
            data={taskData.allByStatus}
            colors={STATUS_COLORS}
          />
        </Col>
        <Col className='p-2'>
          <h5>Solo or Team?</h5>
          <div>{soloOrTeamMessage}</div>
          <PieChartWithCustomizedLabel
            data={taskData.allByType}
            colors={STATUS_COLORS}
          />
        </Col>
        <Col className='p-2'>
          <h5>Deadline?</h5>
        </Col>
        <Col className='p-2'>
          <h5>Repeat?</h5>
        </Col>
      </Row>
    </Container>
  );
}
