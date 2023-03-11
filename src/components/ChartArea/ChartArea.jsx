import {React, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { computeUserPerformance } from '../../utilities/crypto-api';

export default function ChartArea({holdings}) {

  const [data, setData] = useState([])


  useEffect(() => {
    async function collectData(){
      const holdingsIterable = Array.from(holdings);
      const data = await computeUserPerformance(holdingsIterable)
      setData(data)
    }
    collectData()
  }, [holdings])

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
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="time" />
        <YAxis domain={[600, 700]}/>
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="dollars" stroke="yellow" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
