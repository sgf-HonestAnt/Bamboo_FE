import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type SimpleBarChartProps = {
  data: genericTaskInt[];
  stat: string;
  width?: number;
  height?: number;
};

export default function SimpleBarChart(props: SimpleBarChartProps) {
  const { data, width, height } = props;
  return (
    <BarChart
      width={width || 350}
      height={height || 350}
      data={data}
      margin={{
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}
      className='m-auto'>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='total' fill='#000' />
    </BarChart>
  );
}
