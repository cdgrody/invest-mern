import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { computeUserPerformance } from '../../utilities/crypto-api';

export default function ChartArea({holdings}) {

  const data = [
    {
      time:  1678417329751,
      dollars: 20055.9629740996,
    },
    {
      time: 1678420972467,
      dollars: 20098.69680757734,
    },
    {
      time: 1678424528660,
      dollars: 19923.68807279441,
    },
    {
      time: 1678428170530,
      dollars: 20014.593981052483,
    },
  ];

  console.log(computeUserPerformance(holdings))

  return (
    <ResponsiveContainer width="80%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="dollars" stroke="yellow" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
