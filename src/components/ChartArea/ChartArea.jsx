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

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 40, pv: 240, amt: 240 },
];

export default function App() {
  return (
    <>
      <div className="chart-ctr" style={{ overflowX: "hidden" }}>
        <ResponsiveContainer width="80%" aspect={4.5}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 15,
              right: 600,
              bottom: 0,
              left: -400,
            }}
            responsive={true}
          >
            <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
            <XAxis dataKey="name" tick={{ fill: "#fff" }} />
            <YAxis tick={{ fill: "#fff" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
              itemStyle={{ color: "#fff" }}
              cursor={false}
            />
            <Line
              type="monotone"
              dataKey="Iphone"
              stroke="#8884d8"
              strokeWidth="5"
              dot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 2,
                r: 5,
              }}
              activeDot={{
                fill: "#2e4355",
                stroke: "#8884d8",
                strokeWidth: 5,
                r: 10,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
