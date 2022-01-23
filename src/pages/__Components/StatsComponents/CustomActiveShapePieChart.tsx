import { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from "recharts";
import { genericTaskInt } from "../../../typings/interfaces";
import { CUSTOM_COLORS } from "../../../utils/const/arr";

const renderActiveShape = (props: any) => {
  //const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    //midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    //percent,
    //total,
  } = props;
  //const sin = Math.sin(-RADIAN * midAngle);
  //const cos = Math.cos(-RADIAN * midAngle);
  //const sx = cx + (outerRadius + 10) * cos;
  //const sy = cy + (outerRadius + 10) * sin;
  //const mx = cx + (outerRadius + 30) * cos;
  //const my = cy + (outerRadius + 30) * sin;
  //const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  //const ey = my;
  //const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' /> */}
      {/* <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'>{`PV ${total}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'>
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

type CustomActiveShapePieChartProps = {
  data: genericTaskInt[];
  stat: string;
  width?: number;
  height?: number;
};

export default function CustomActiveShapePieChart(
  props: CustomActiveShapePieChartProps
) {
  const { data, width, height } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  const fillColor = CUSTOM_COLORS[6];
  return (
    <PieChart width={width || 200} height={height || 200} className='m-auto'>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx='50%'
        cy='50%'
        innerRadius={60}
        outerRadius={85}
        fill={fillColor}
        dataKey='total'
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
}
