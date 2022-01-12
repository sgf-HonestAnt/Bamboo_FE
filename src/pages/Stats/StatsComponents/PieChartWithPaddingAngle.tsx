import { PieChart, Pie, Cell } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

type PieChartWithPaddingAngleProps = {
  data: genericTaskInt[];
  colors: string[];
  deg360: boolean;
  stat: string;
  width?: number;
  height?: number;
};

export default function PieChartWithPaddingAngle(
  props: PieChartWithPaddingAngleProps
) {
  const { data, colors, deg360, width, height } = props;
  return (
    <PieChart width={width ? width : 350} height={height ? height : 350}>
      {deg360 ? (
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill='#8884d8'
          paddingAngle={5}
          dataKey='total'>
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
          dataKey='total'>
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      )}
    </PieChart>
  );
}
