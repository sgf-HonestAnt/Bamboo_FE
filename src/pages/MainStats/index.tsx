import { Container, Row, Col } from "react-bootstrap";
import { reduxStateInt, taskInt } from "../../typings/interfaces";
import { useAppSelector } from "../../redux/hooks";
import SimplePieChart from "./Components/SimplePieChart";
import "./styles.css";

type pieChartProps = { name: string; value: number; tasks: taskInt[] };

type dataProps = {
  allByStatus: pieChartProps[];
  allByCategory: pieChartProps[];
  allByCreatedAt: any[];
  allByUpdatedAt: any[];
  allByType: pieChartProps[];
  allByDueDate: any[];
};

export default function StatsPage() {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  //const { my_user } = state.currentUser;
  //const { total_completed } = my_user;
  const { categories, awaited, in_progress, completed } = currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const mapByStatus = (data: dataProps) => {
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
  const mapByCategory = (data: dataProps) => {
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
  const mapByType = (data: dataProps) => {
    const tasksByType: pieChartProps[] = [
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
    let data: dataProps = {
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
  const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const TYPE_COLORS = ["#000", "#FFF"];
  console.log("TEST DATA=>", allTasks.length, taskData);
  return (
    <Container fluid>
      <Row>
        {/* <Col sm={4} className='p-5'>
          I want charts for:-
          <ul>
            <li>
              Percentage of tasks being delivered on time vs late (status =
              completed and updatedAtAsDate lt/= deadlineAsDate)
            </li>
            <li>
              "At a glance" category dispersal: how many tasks exist that are
              part of all the sep categories. And similar with status, value,
              shared. Try StackedBarChart or MixBarChart to show uv, pv and amt
            </li>
            <li>
              Most active time of day for task creation and task completion. Try
              TinyLineChart or SimpleLineChart.
            </li>
            <li>
              What users do we share with most frequently and ? what is the
              value of all tasks we share with them ? Try
              PieChartWithPaddingAngle, PieChartWithCustomizedLabel
            </li>
          </ul>
        </Col> */}
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Status'
            data={taskData.allByStatus}
            colors={STATUS_COLORS}
          />
        </Col>
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Type'
            data={taskData.allByType}
            colors={TYPE_COLORS}
          />
        </Col>
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Category'
            data={taskData.allByCategory}
            colors={CATEGORY_COLORS}
          />
        </Col>
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Status'
            data={taskData.allByStatus}
            colors={STATUS_COLORS}
          />
        </Col>
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Type'
            data={taskData.allByType}
            colors={TYPE_COLORS}
          />
        </Col>
        <Col sm={4}>
          <SimplePieChart
            title='Tasks by Category'
            data={taskData.allByCategory}
            colors={CATEGORY_COLORS}
          />
        </Col>
      </Row>
    </Container>
  );
}
