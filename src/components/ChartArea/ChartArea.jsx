import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ChartArea({holdings}) {

  const data = [
    {
      name: 'DOGE',
      dollars: 2000,
    },
    {
      name: 'VOO',
      dollars: 3000,
    },
    {
      name: 'ETH',
      dollars: -2000,
    },
    {
      name: 'AGG',
      dollars: 2780,
    },
  ];

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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="dollars" stroke="yellow" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
