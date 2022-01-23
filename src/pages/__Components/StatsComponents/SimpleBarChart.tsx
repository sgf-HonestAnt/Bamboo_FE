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
import { CUSTOM_COLORS } from "../../../utils/const/arr";

type SimpleBarChartProps = {
  data: genericTaskInt[];
  stat: string;
  width?: number;
  height?: number;
};

export default function SimpleBarChart(props: SimpleBarChartProps) {
  const { data, width, height } = props;
  const fillColor = CUSTOM_COLORS[6];
  return (
    <BarChart
      width={width || 200}
      height={height || 400}
      data={data}
      margin={{
        top: 30,
        right: 50,
        left: 10,
        bottom: 30,
      }}
      className='m-auto'>
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey='total' fill={fillColor} />
    </BarChart>
  );
}
