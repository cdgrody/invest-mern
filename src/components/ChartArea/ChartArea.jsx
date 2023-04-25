import {React, useState, useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { computeUserPerformance } from '../../utilities/crypto-api';
import { getUserBalances } from '../../utilities/userBalances-api';
import './ChartArea.css'

export default function ChartArea({holdings, userBalances, user, transactions}) {

  const [data, setData] = useState([])
  const [minDollarValue, setMinDollarValue] = useState(1000)
  const [maxDollarValue, setMaxDollarValue] = useState(1000)
  const [newUserBalance, setNewUserBalance] = useState(userBalances)
  const [userNetWorth, setUserNetWorth] = useState(0)
  const [percentChange, setPercentChange] = useState(0)


  useEffect(() => {
    async function collectData(){
      const holdingsIterable = Array.from(holdings);
      const data = await computeUserPerformance(holdingsIterable, userBalances)
      const minDollarValue = Math.min(...data.map(item => item.dollars));
      const maxDollarValue = Math.max(...data.map(item => item.dollars));
      setMinDollarValue(minDollarValue.toFixed(0))
      setMaxDollarValue(maxDollarValue.toFixed(0))
      setUserNetWorth(data[data.length-1].dollars.toFixed(2))
      setPercentChange((100*(data[data.length-1].dollars - data[0].dollars)/(data[data.length-1].dollars)).toFixed(2))
      setData(data)
    }
    if(user) collectData()
  }, [transactions, holdings])

  useEffect(() => {
    async function updateUserBalances() {
      const balances = await getUserBalances(user._id);
      setNewUserBalance(balances);
    }
    if(user) updateUserBalances();
  }, [user._id]);

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${24 - label === 0 ? 'Now' : `${24 - label} hours ago`}`}</p>
          <p className="label">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }
  
    return null;
  }

  return (
    <>
    <div className='chart-title-info'>
    <h1>${userNetWorth}</h1>
    <h2 className={percentChange >= 0 ? `positive-percent` : `negative-percent`}>{percentChange >= 0 ? `⬆ %${percentChange}` : `⬇ %${percentChange * -1}`}</h2>
    <div className='toggle-time-range'>
      <div>HR</div>
      <div>DY</div>
      <div>WK</div>
      <div>MTH</div>
      <div>YR</div>
    </div>
    </div>
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
        <XAxis dataKey="time"/>
        <YAxis domain={[parseInt(minDollarValue)-2, parseInt(maxDollarValue)+2]}/>
        <Tooltip content={<CustomTooltip />} />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="dollars" stroke="gold" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </>
  );
}
