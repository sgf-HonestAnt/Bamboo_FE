import React, { useState, useCallback } from "react";
import { BarChart, Bar, Cell } from "recharts";

type StatusBarProps = {
  data: any[];
};

const StatusBar = (props: StatusBarProps) => {
  const { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = data[activeIndex];
  const handleClick = useCallback(
    (entry: any, index: number) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );
  // console.log(data)
  return (
    <div>
      <p>Click to view numbers</p>
      <BarChart width={250} height={250} data={data}>
        <Bar dataKey='uv' onClick={handleClick}>
          {data.map((entry, index) => (
            <Cell
              cursor='pointer'
              fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
              key={`cell-${index}`}
            />
          ))}
        </Bar>
      </BarChart>
      <p className='content'>{`Total "${activeItem.name}" Tasks: ${
        activeItem.uv - 0.1
      }`}</p>
    </div>
  );
};

export default StatusBar;

// export default function App() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const activeItem = data[activeIndex];

//   const handleClick = useCallback(
//     (entry: any, index: number) => {
//       setActiveIndex(index);
//     },
//     [setActiveIndex]
//   );

//   return (
//     <div>
//       <p>Click each rectangle </p>
//       <BarChart width={150} height={40} data={data}>
//         <Bar dataKey="uv" onClick={handleClick}>
//           {data.map((entry, index) => (
//             <Cell
//               cursor="pointer"
//               fill={index === activeIndex ? "#82ca9d" : "#8884d8"}
//               key={`cell-${index}`}
//             />
//           ))}
//         </Bar>
//       </BarChart>
//       <p className="content">{`Uv of "${activeItem.name}": ${activeItem.uv}`}</p>
//     </div>
//   );
// }
