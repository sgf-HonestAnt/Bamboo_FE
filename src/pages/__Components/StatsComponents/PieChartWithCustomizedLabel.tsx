import { PieChart, Pie, Cell } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline='central'>
      {percent > 0 && `${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type PieChartWithCustomizedLabelProps = {
  data: genericTaskInt[];
  colors: string[];
  stat: string;
  width?: number;
  height?: number;
  labelLine?: boolean;
};

export default function PieChartWithCustomizedLabel(
  props: PieChartWithCustomizedLabelProps
) {
  const { data, colors, width, height, labelLine } = props;
  const twoColors = [colors[2], colors[15]];
  return (
    <PieChart width={width || 200} height={height || 200} className='m-auto'>
      <Pie
        data={data}
        cx='50%'
        cy='50%'
        labelLine={labelLine || false}
        label={renderCustomizedLabel}
        outerRadius={95}
        fill='#8884d8'
        dataKey='total'>
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={twoColors[index % twoColors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
}
