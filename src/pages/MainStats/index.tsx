import { Container, Row, Col } from "react-bootstrap";
import { reduxStateInt } from "../../typings/interfaces";
import { useAppSelector } from "../../redux/hooks";
import StatusBar from "./Components/StatusBar";
import CategoriesRadar from "./Components/CategoriesRadar";
import "./styles.css";
import { URGENT } from "../../utils/appConstants";

export default function StatsPage() {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  const { my_user } = state.currentUser;
  const { total_completed } = my_user;
  const { awaited, in_progress } = currentTasks;
  const allTasks = awaited.concat(in_progress);
  const urgentTasks = allTasks.filter((task) => task.category === URGENT);
  const tasksTotal = [
    { title: "Urgent", tasks: urgentTasks },
    { title: "Awaited", tasks: awaited },
    { title: "In Progress", tasks: in_progress },
  ];
  console.log(tasksTotal);
  const mapData = () => {
    let data: any[] = [
      {
        name: "Completed",
        uv: total_completed + 0.1,
        pv: tasksTotal.length * 2000,
        amt: tasksTotal.length,
      },
    ];
    tasksTotal.map((task, i) => {
      data.push({
        name: task.title,
        uv: task.tasks.length + 0.1,
        pv: i * 2000,
        amt: i,
      });
    });
    return data;
  };
  const testData = mapData();
  const statusData = [
    {
      name: "Page A",
      uv: 10,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 11,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 15,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 12,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 18,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 30,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 21,
      pv: 4300,
      amt: 2100,
    },
  ];
  // const categoriesData = [
  //   {
  //     subject: "Math",
  //     A: 120,
  //     B: 110,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: "Chinese",
  //     A: 98,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: "English",
  //     A: 86,
  //     B: 130,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: "Geography",
  //     A: 99,
  //     B: 100,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: "Physics",
  //     A: 85,
  //     B: 90,
  //     fullMark: 150,
  //   },
  //   {
  //     subject: "History",
  //     A: 65,
  //     B: 85,
  //     fullMark: 150,
  //   },
  // ];
  console.log("TEST DATA=>", testData);
  return (
    <Container fluid>
      <Row>
        <Col sm={4} className='p-5'>
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
          <div>
            (***NOTE*** perhaps is not a good idea to be able to delete task
            once it's completed, as messes with these figures. Instead create a
            list of DeletedForMe ids and exclude them from the DroppableList)
          </div>
        </Col>
        <Col sm={3} className='p-5'>
          <StatusBar data={testData} />
        </Col>
        {/* <Col sm={6}>
          <CategoriesRadar data={categoriesData} />
        </Col> */}
      </Row>
    </Container>
  );
}
