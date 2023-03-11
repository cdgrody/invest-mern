import {React, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { computeUserPerformance } from '../../utilities/crypto-api';
import { getUserBalances } from '../../utilities/userBalances-api';

export default function ChartArea({holdings, userBalances, user}) {

  const [data, setData] = useState([])
  const [minDollarValue, setMinDollarValue] = useState(1000)
  const [maxDollarValue, setMaxDollarValue] = useState(1000)
  const [newUserBalance, setNewUserBalance] = useState(userBalances)


  useEffect(() => {
    async function collectData(){
      const holdingsIterable = Array.from(holdings);
      const data = await computeUserPerformance(holdingsIterable, userBalances)
      const minDollarValue = Math.min(...data.map(item => item.dollars));
      const maxDollarValue = Math.max(...data.map(item => item.dollars));
      setMinDollarValue(minDollarValue.toFixed(0))
      setMaxDollarValue(maxDollarValue.toFixed(0))
      setData(data)
    }
    collectData()
  }, [holdings])

  useEffect(() => {
    async function updateUserBalances() {
      const balances = await getUserBalances(user._id);
      setNewUserBalance(balances);
    }
    updateUserBalances();
  }, [user._id]);

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
        <YAxis domain={[parseInt(minDollarValue)-2, parseInt(maxDollarValue)+2]}/>
        <Tooltip contentStyle={{ color: 'black' }} wrapperStyle={{ backgroundColor: 'red' }}/>
        {/* <Legend /> */}
        <Line type="monotone" dataKey="dollars" stroke="gold" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    
  );
}
