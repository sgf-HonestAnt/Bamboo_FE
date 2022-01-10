import { BarChart, Bar } from "recharts";

type TinyBarChartProps = {
  data: any;
  stat: string;
};

export default function TinyBarChart(props: TinyBarChartProps) {
  const { data } = props;
  return (
    <BarChart width={150} height={40} data={data}>
      <Bar dataKey='value' fill='#8884d8' />
    </BarChart>
  );
}
