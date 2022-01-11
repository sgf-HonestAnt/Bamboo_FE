import { Container, Row, Col } from "react-bootstrap";
import {
  catStatusTasks,
  dataInt,
  genericTaskInt,
  reduxStateInt,
} from "../../typings/interfaces";
import { useAppSelector } from "../../redux/hooks";
import PieChartWithCustomizedLabel from "./Components/PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./Components/PieChartWithPaddingAngle";
import SimpleBarChart from "./Components/SimpleBarChart";
import MixedBarChart from "./Components/MixedBarChart";
// import { returnMessage } from "../../utils/f_statistics";
import { useEffect, useState } from "react";
import {
  findMostCommonStatus,
  findMostUsedType,
  findMostUsedValue,
} from "../../utils/f_statistics";
import {
  AWAITED,
  COMPLETED,
  IN_PROGRESS,
  NONE,
  SOLO,
  TEAM,
} from "../../utils/appConstants";
import "./styles.css";

export default function StatsPage() {
  const state: reduxStateInt = useAppSelector((state: reduxStateInt) => state);
  const { currentTasks } = state;
  const { categories, awaited, in_progress, completed } = currentTasks;
  const allTasks = awaited.concat(in_progress, completed);
  const [taskData, setTaskData] = useState<dataInt>({
    allByStatus: [],
    allByCategory: [],
    allByValue: [],
    allByCreatedAt: [],
    allByUpdatedAt: [],
    allByType: [],
    allByDueDate: [],
  });
  const [unused, setUnused] = useState<catStatusTasks[]>([]);
  const [loading, setLoading] = useState(true);
  //const [messages, setMessages] = useState({ status: "", soloOrTeam: "" });
  const mapByStatus = () => {
    const tasksByStatus = [
      { title: AWAITED, tasks: awaited },
      { title: IN_PROGRESS, tasks: in_progress },
      { title: COMPLETED, tasks: completed },
    ];
    let allByStatus: genericTaskInt[] = [];
    // eslint-disable-next-line array-callback-return
    tasksByStatus.map((task, i) => {
      allByStatus.push({
        name: task.title,
        total: task.tasks.length,
        tasks: task.tasks,
      });
    });
    return allByStatus;
  };
  const mapByCategory = () => {
    let allByCategory: catStatusTasks[] = [];
    // eslint-disable-next-line array-callback-return
    categories
      .filter((category) => category !== NONE)
      .map((category, i) => {
        allByCategory.push({
          category,
          total: 0,
          awaited: 0,
          in_progress: 0,
          completed: 0,
        });
      });
    for (let i = 0; i < allTasks.length; i++) {
      for (let j = 0; j < allByCategory.length; j++) {
        if (allTasks[i].category === allByCategory[j].category) {
          allByCategory[j].total++;
        }
        if (
          allTasks[i].category === allByCategory[j].category &&
          allTasks[i].status === AWAITED
        ) {
          allByCategory[j].awaited++;
        }
        if (
          allTasks[i].category === allByCategory[j].category &&
          allTasks[i].status === IN_PROGRESS
        ) {
          allByCategory[j].in_progress++;
        }
        if (
          allTasks[i].category === allByCategory[j].category &&
          allTasks[i].status === COMPLETED
        ) {
          allByCategory[j].completed++;
        }
      }
    }
    return allByCategory;
  };
  const mapByValue = () => {
    let allByValue: genericTaskInt[] = [
      { name: "10xp", total: 0, tasks: [] },
      { name: "20xp", total: 0, tasks: [] },
      { name: "30xp", total: 0, tasks: [] },
      { name: "40xp", total: 0, tasks: [] },
      { name: "50xp", total: 0, tasks: [] },
    ];
    // eslint-disable-next-line array-callback-return
    allTasks.map((task, i) => {
      if (allTasks[i].value === 10) {
        allByValue[0].total++;
        allByValue[0].tasks.push(allTasks[i]);
      } else if (allTasks[i].value === 20) {
        allByValue[1].total++;
        allByValue[1].tasks.push(allTasks[i]);
      } else if (allTasks[i].value === 30) {
        allByValue[2].total++;
        allByValue[2].tasks.push(allTasks[i]);
      } else if (allTasks[i].value === 40) {
        allByValue[3].total++;
        allByValue[3].tasks.push(allTasks[i]);
      } else {
        allByValue[4].total++;
        allByValue[4].tasks.push(allTasks[i]);
      }
    });
    return allByValue;
  };
  const mapByType = () => {
    let allByType: genericTaskInt[] = [
      {
        name: SOLO,
        total: 0,
        tasks: [],
      },
      {
        name: TEAM,
        total: 0,
        tasks: [],
      },
    ];
    for (let i = 0; i < allTasks.length; i++) {
      for (let j = 0; j < allByType.length; j++) {
        if (allTasks[i].type === allByType[j].name) {
          allByType[j].tasks.push(allTasks[i]);
          allByType[j].total++;
        }
      }
    }
    return allByType;
  };
  const getUnusedCategories = () => {
    let unusedCategories = [];
    const { allByCategory } = taskData;
    for (let i = 0; i < allByCategory.length; i++) {
      if (allByCategory[i].total === 0) {
        unusedCategories.push(allByCategory[i]);
      }
    }
    return unusedCategories;
  };
  // const noTasksWithoutCategory = () => {
  //   const tasksWithoutCategory = allTasks.filter(
  //     (task) => task.category === NONE
  //   );
  //   if (tasksWithoutCategory.length > 0) {
  //     return categories.length;
  //   } else {
  //     return categories.filter((category) => category !== NONE).length;
  //   }
  // };
  const mapData = async () => {
    // by status
    const allByStatus = mapByStatus();
    // by type
    const allByType = mapByType();
    // by value
    const allByValue = mapByValue();
    // get unused cats
    // by category
    const allByCategory = mapByCategory();
    setTaskData({
      ...taskData,
      allByStatus,
      allByType,
      allByValue,
      allByCategory,
    });
    const unusedCategories = getUnusedCategories();
    setUnused(unusedCategories);
    // const status = await returnMessage(
    //   "status",
    //   taskData,
    //   timeSpecific,
    //   allTasks.length
    // );
    // const soloOrTeam = await returnMessage(
    //   "type",
    //   taskData,
    //   timeSpecific,
    //   allTasks.length
    // );
    // setMessages({ status, soloOrTeam });
    setLoading(false);
  };
  const STATUS_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const TYPE_COLORS = ["#000", "#FFF"];
  //const timeSpecific = "overall"; // this week / last week
  useEffect(() => {
    mapData();
    console.log("TEST DATA=>", allTasks.length, taskData, unused);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container fluid>
      {!loading && (
        <Row className='m-2 main-stats'>
          <Col sm={12} className='p-2'>
            <h2>Statistics</h2>
            <div>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
              eius tempora nesciunt sapiente optio blanditiis vero nisi eos,
              provident ea distinctio praesentium non enim, saepe laudantium sit
              reiciendis nihil perspiciatis, quidem excepturi soluta suscipit
              odio amet commodi.
            </div>
          </Col>
          <Col sm={12} className='p-2'></Col>
          {allTasks.length > 0 && (
            <>
              <Col className='p-2'>
                {categories.filter((category) => category !== NONE).length /
                  allTasks.length <=
                0.5 ? (
                  <h5>Minimalist</h5>
                ) : categories.filter((category) => category !== NONE).length /
                    allTasks.length >
                    0.5 &&
                  categories.filter((category) => category !== NONE).length /
                    allTasks.length <
                    1 ? (
                  <h5>Prepper</h5> //
                ) : (
                  <h5>Accumulator</h5> //
                )}
                <div>
                  <span>
                    {unused.length > 0 &&
                      `You have ${unused.length} unused ${
                        unused.length > 1 ? "categories." : "category."
                      }`}
                  </span>
                  &nbsp;
                  <span>
                    You're using{" "}
                    {categories.filter((category) => category !== NONE).length -
                      unused.length}{" "}
                    {categories.filter((category) => category !== NONE).length -
                      unused.length >
                    1
                      ? "categories"
                      : "category"}{" "}
                    to organise {allTasks.length}{" "}
                    {allTasks.length > 1 ? "tasks" : "task"}.
                  </span>
                </div>
                <MixedBarChart
                  data={taskData.allByCategory.filter(
                    (data) => data.category !== NONE
                  )}
                  stat='category'
                />
              </Col>
              <Col className='p-2'>
                <h5>
                  {
                    findMostUsedValue(
                      taskData.allByValue,
                      allTasks.length
                    ).split("|")[0]
                  }
                </h5>
                <div>
                  {
                    findMostUsedValue(
                      taskData.allByValue,
                      allTasks.length
                    ).split("|")[1]
                  }
                </div>
                <SimpleBarChart data={taskData.allByValue} stat='value' />
              </Col>
              <Col sm={12}></Col>
              <Col className='p-2'>
                <h5>
                  {
                    findMostCommonStatus(
                      taskData.allByStatus,
                      allTasks.length
                    ).split("|")[0]
                  }
                </h5>
                <div>
                  {
                    findMostCommonStatus(
                      taskData.allByStatus,
                      allTasks.length
                    ).split("|")[1]
                  }
                </div>
                <PieChartWithPaddingAngle
                  deg360={false}
                  data={taskData.allByStatus}
                  colors={STATUS_COLORS}
                  stat='status'
                />
              </Col>
              <Col className='p-2'>
                <h5>
                  {
                    findMostUsedType(taskData.allByType, allTasks.length).split(
                      "|"
                    )[0]
                  }
                </h5>
                <div>
                  {
                    findMostUsedType(taskData.allByType, allTasks.length).split(
                      "|"
                    )[1]
                  }
                </div>
                <PieChartWithCustomizedLabel
                  data={taskData.allByType}
                  colors={STATUS_COLORS}
                  stat='type'
                />
              </Col>
              <Col className='p-2'>
                <h5>Anytime or deadline?</h5>
              </Col>
              <Col className='p-2'>
                <h5>Repeated or not?</h5>
              </Col>
            </>
          )}
        </Row>
      )}
    </Container>
  );
}
