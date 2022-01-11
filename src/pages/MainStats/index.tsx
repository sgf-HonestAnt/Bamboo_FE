import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import {
  categoryTaskInt,
  dataInt,
  genericTaskInt,
  reduxStateInt,
} from "../../typings/interfaces";
import PieChartWithCustomizedLabel from "./Components/PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./Components/PieChartWithPaddingAngle";
import SimpleBarChart from "./Components/SimpleBarChart";
import MixedBarChart from "./Components/MixedBarChart";
import CustomActiveShapePieChart from "./Components/CustomActiveShapePieChart";
import SimpleCloud from "./Components/SimpleCloud";
import StatisticsHeader from "./Components/StatisticsHeader";
import {
  findMostCommonStatus,
  findMostUsedDeadline,
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
    tagCloud: [],
    unusedCategories: [],
  });
  const [loading, setLoading] = useState(true);
  //const [messages, setMessages] = useState({ status: "", soloOrTeam: "" });
  const mapByStatus = async () => {
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
  const mapByCategory = async () => {
    let allByCategory: categoryTaskInt[] = [];
    // eslint-disable-next-line array-callback-return
    const tasksWithNoCategory = allTasks.filter(
      (task) => task.category === NONE
    );
    if (tasksWithNoCategory.length > 0) {
      // eslint-disable-next-line array-callback-return
      categories.map((category, i) => {
        allByCategory.push({
          category,
          total: 0,
          awaited: 0,
          in_progress: 0,
          completed: 0,
        });
      });
    } else {
      categories
        .filter((category) => category !== NONE)
        // eslint-disable-next-line array-callback-return
        .map((category, i) => {
          allByCategory.push({
            category,
            total: 0,
            awaited: 0,
            in_progress: 0,
            completed: 0,
          });
        });
    }
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
  const createDataForTagCloud = async (allByCategory: categoryTaskInt[]) => {
    const newData = [];
    for (let i = 0; i < allByCategory.length; i++) {
      newData.push({
        value: allByCategory[i].category,
        count: allByCategory[i].total,
      });
    }
    return newData;
  };
  const mapByValue = async () => {
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
  const mapByType = async () => {
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
  const mapByDeadline = async () => {
    let allByDueDate: genericTaskInt[] = [
      {
        name: "with deadline",
        total: 0,
        tasks: [],
      },
      {
        name: "no deadline",
        total: 0,
        tasks: [],
      },
    ];
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].deadline) {
        allByDueDate[0].tasks.push(allTasks[i]);
        allByDueDate[0].total++;
      } else {
        allByDueDate[1].tasks.push(allTasks[i]);
        allByDueDate[1].total++;
      }
    }
    allByDueDate[0].tasks.sort(function (a, b) {
      return new Date(a.deadline!).getTime() - new Date(b.deadline!).getTime();
    });
    return allByDueDate;
  };
  const getUnusedCategories = async (allByCategory: categoryTaskInt[]) => {
    let unusedCategories = [];
    for (let i = 0; i < allByCategory.length; i++) {
      if (allByCategory[i].total === 0) {
        unusedCategories.push(allByCategory[i]);
      }
    }
    return unusedCategories;
  };
  const mapData = async () => {
    const allByStatus = await mapByStatus();
    const allByType = await mapByType();
    const allByValue = await mapByValue();
    const allByCategory = await mapByCategory();
    const allByDueDate = await mapByDeadline();
    const tagCloud = await createDataForTagCloud(allByCategory);
    const unusedCategories = await getUnusedCategories(allByCategory);
    setTaskData({
      ...taskData,
      allByStatus,
      allByType,
      allByValue,
      allByCategory,
      allByDueDate,
      tagCloud,
      unusedCategories,
    });
    setLoading(false);
  };
  const STATUS_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const CATEGORY_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  // const TYPE_COLORS = ["#000", "#FFF"];
  //const timeSpecific = "overall"; // this week / last week
  useEffect(() => {
    mapData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("TEST DATA=>", allTasks.length, taskData);
  return (
    <Container fluid className='p-0'>
      {!loading &&
        taskData.allByCategory &&
        taskData.allByValue &&
        taskData.allByStatus &&
        taskData.allByType &&
        taskData.allByDueDate && (
          <Row className='main-stats'>
            <Col sm={12}>
              <Tabs defaultActiveKey='category' id='uncontrolled-tab-example'>
                <Tab eventKey='category' title='Tasks by Category'>
                  <StatisticsHeader />
                  <div className='flex-row'>
                    <div>
                      <h5>
                        {categories.length / allTasks.length <= 0.7
                          ? "Minimalist"
                          : categories.length / allTasks.length > 0.7 &&
                            categories.length / allTasks.length < 1
                          ? "Prepper"
                          : "Accumulator"}
                      </h5>
                      <div className='mb-3'>
                        <span>
                          You're using{" "}
                          {taskData.allByCategory.length -
                            taskData.unusedCategories.length}{" "}
                          {taskData.allByCategory.length -
                            taskData.unusedCategories.length >
                          1
                            ? "categories"
                            : "category"}{" "}
                          to organise {allTasks.length}{" "}
                          {allTasks.length > 1 ? "tasks" : "task"}.
                        </span>
                        <span>
                          {taskData.unusedCategories.length > 0 &&
                            ` You have ${
                              taskData.unusedCategories.length
                            } unused ${
                              taskData.unusedCategories.length > 1
                                ? "categories."
                                : "category."
                            }`}
                        </span>
                      </div>
                      <MixedBarChart
                        data={taskData.allByCategory}
                        stat='category'
                      />
                    </div>
                    <div className='float-center'>
                      <SimpleCloud data={taskData.tagCloud} />
                    </div>
                  </div>
                </Tab>
                <Tab eventKey='value' title='by Value'>
                  <StatisticsHeader />
                  <div>
                    <h5>
                      {
                        findMostUsedValue(
                          taskData.allByValue,
                          allTasks.length
                        ).split("|")[0]
                      }
                    </h5>
                    <div className='mb-3'>
                      <span>
                        {
                          findMostUsedValue(
                            taskData.allByValue,
                            allTasks.length
                          ).split("|")[2]
                        }
                      </span>
                    </div>
                    <SimpleBarChart data={taskData.allByValue} stat='value' />{" "}
                  </div>
                </Tab>
                <Tab eventKey='status' title='by Status'>
                  <StatisticsHeader />
                  <div>
                    <h5>
                      {
                        findMostCommonStatus(
                          taskData.allByStatus,
                          allTasks.length
                        ).split("|")[0]
                      }
                    </h5>
                    <div className='mb-3'>
                      {
                        findMostCommonStatus(
                          taskData.allByStatus,
                          allTasks.length
                        ).split("|")[1]
                      }
                    </div>
                    <PieChartWithPaddingAngle
                      deg360={true}
                      data={taskData.allByStatus}
                      colors={STATUS_COLORS}
                      stat='status'
                    />
                  </div>
                </Tab>
                <Tab eventKey='type' title='by Type'>
                  <StatisticsHeader />
                  <div>
                    <h5>
                      {
                        findMostUsedType(
                          taskData.allByType,
                          allTasks.length
                        ).split("|")[0]
                      }
                    </h5>
                    <div className='mb-3'>
                      {
                        findMostUsedType(
                          taskData.allByType,
                          allTasks.length
                        ).split("|")[1]
                      }
                    </div>
                    <PieChartWithCustomizedLabel
                      data={taskData.allByType}
                      colors={STATUS_COLORS}
                      stat='type'
                    />
                  </div>
                </Tab>
                <Tab eventKey='deadline' title='by Deadline'>
                  <StatisticsHeader />
                  <div>
                    <h5>
                      {
                        findMostUsedDeadline(
                          taskData.allByDueDate,
                          allTasks.length
                        ).split("|")[0]
                      }
                    </h5>
                    <div className='mb-3'>
                      {
                        findMostUsedDeadline(
                          taskData.allByDueDate,
                          allTasks.length
                        ).split("|")[1]
                      }
                    </div>{" "}
                    <CustomActiveShapePieChart
                      data={taskData.allByDueDate}
                      stat='deadline'
                    />
                  </div>
                </Tab>
                {/* <Tab eventKey='extra' title='by Lateness' disabled></Tab> */}
              </Tabs>
            </Col>
          </Row>
        )}
    </Container>
  );
}
