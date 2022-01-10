import { PieChart, Pie, Cell } from "recharts";

type PieChartWithPaddingAngleProps = {
  data: any;
  colors: string[];
  deg360: boolean;
  stat: string;
};

export default function PieChartWithPaddingAngle(
  props: PieChartWithPaddingAngleProps
) {
  const { data, colors, deg360 } = props;
  return (
    <PieChart width={200} height={200}>
      {deg360 ? (
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      ) : (
        <Pie
          data={data}
          cx={100}
          cy={100}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='value'>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
