import "./ChartArea.css";

import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Sample chart data
const pdata = [
  {
    name: "MongoDb",
    student: 11,
    fees: 120,
  },
  {
    name: "Javascript",
    student: 15,
    fees: 12,
  },
  {
    name: "PHP",
    student: 5,
    fees: 10,
  },
  {
    name: "Java",
    student: 10,
    fees: 5,
  },
  {
    name: "C#",
    student: 9,
    fees: 4,
  },
  {
    name: "C++",
    student: 10,
    fees: 8,
  },
];

const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }, { name: "Page B", uv: 40, pv: 240, amt: 240 }];

// const renderLineChart = (
//   <LineChart width={400} height={400} data={data}>
//     <Line type="monotone" dataKey="uv" stroke="#8884d8" />
//   </LineChart>
// );

export default function App() {
  return (
    <ResponsiveContainer id="chart-container" width="50%" height="50%" aspect={4}>
      <LineChart data={pdata}  x={40} y={100}>
        {/* <CartesianGrid /> */}
        <XAxis dataKey="name" interval={"preserveStartEnd"} />
        <YAxis></YAxis>
        {/* <Legend /> */}
        <Tooltip />
        <Line dataKey="student" stroke="yellow" activeDot={{ r: 8 }} />
        <Line dataKey="fees" stroke="red" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
