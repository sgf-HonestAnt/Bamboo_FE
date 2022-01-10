import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

type MixedBarChartProps = {
    data: any;
}

export default function MixedBarChart(props:MixedBarChartProps) {
    const {data} = props
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="completed" stackId="a" fill="#ffc658" />
      <Bar dataKey="awaited" stackId="a" fill="#8884d8" />
      <Bar dataKey="in_progress" stackId="a" fill="#82ca9d" />
    </BarChart>
  );
}
