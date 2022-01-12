import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { dataInt, reduxStateInt } from "../../typings/interfaces";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import {
  mapByStatus,
  mapByCategory,
  createDataForTagCloud,
  mapByValue,
  mapByType,
  mapByDeadline,
  getUnusedCategories,
  findMostCommonStatus,
  findMostUsedDeadline,
  findMostUsedType,
  findMostUsedValue,
} from "../../utils/f_statistics";
import PieChartWithCustomizedLabel from "./StatsComponents/PieChartWithCustomizedLabel";
import PieChartWithPaddingAngle from "./StatsComponents/PieChartWithPaddingAngle";
import SimpleBarChart from "./StatsComponents/SimpleBarChart";
import MixedBarChart from "./StatsComponents/MixedBarChart";
import CustomActiveShapePieChart from "./StatsComponents/CustomActiveShapePieChart";
import SimpleCloud from "./StatsComponents/SimpleCloud";
import StatisticsHeader from "./StatsComponents/StatisticsHeader";
import "./styles.css";
import { STATUS_COLORS } from "../../utils/appConstants";

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
  const mapData = async () => {
    const allByStatus = await mapByStatus(currentTasks);
    const allByType = await mapByType(allTasks);
    const allByValue = await mapByValue(allTasks);
    const allByCategory = await mapByCategory(allTasks, categories);
    const allByDueDate = await mapByDeadline(allTasks);
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
