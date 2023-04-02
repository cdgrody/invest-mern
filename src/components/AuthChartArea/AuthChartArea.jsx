import { React, useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  computeUserPerformance,
  computeGenericAssetPerformance,
} from "../../utilities/crypto-api";
import { getUserBalances } from "../../utilities/userBalances-api";
import "./AuthChartArea.css";

export default function AuthChartArea() {
  const [data, setData] = useState([]);
  const [minDollarValue, setMinDollarValue] = useState(0);
  const [maxDollarValue, setMaxDollarValue] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [ticker, setTicker] = useState(0)

  let x = 0
  const tickers = ['BTC', 'ETH', 'DOGE', 'BNB', 'ADA']
  // function cycle() {
  //   setTimeout(function() {
  //     // console.log(ticker)
  //     // x += 1
  //     // setTicker(x+5)
  //     // x %= 4
  //     console.log(ticker)
  //     x += 1
  //     setTicker(x)
  //     x %= 4
  //     cycle()
  //   }, 5000)
  // }
  function cycle() {
    const interval = setInterval(() => {
      setTicker((ticker) => (ticker + 1) % (tickers.length-1))
    }, 5000)
    return () => clearInterval(interval);
  }

  useEffect(() => {
    const cleanup = cycle();
    return cleanup;
  }, []);

  useEffect(() => {
    async function collectData() {
      const data = await computeGenericAssetPerformance(ticker+5);
      const minDollarValue = Math.min(...data.map((item) => item.dollars));
      const maxDollarValue = Math.max(...data.map((item) => item.dollars));
      setMinDollarValue(minDollarValue.toFixed(0));
      setMaxDollarValue(maxDollarValue.toFixed(0));
      setPercentChange(
        (
          (100 * (data[data.length - 1].dollars - data[0].dollars)) /
          data[data.length - 1].dollars
        ).toFixed(2)
      );
      setData(data);
    }
    collectData();
  }, [ticker]);

  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${
            24 - label === 0 ? "Now" : `${24 - label} hours ago`
          }`}</p>
          <p className="label">${payload[0].value.toFixed(2)}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <>
      <div className="auth-chart-title-info">
        <h1>{tickers[ticker]}</h1>
        <h2
          className={
            percentChange >= 0 ? `positive-percent` : `negative-percent`
          }
        >
          {percentChange >= 0
            ? `⬆ %${percentChange}`
            : `⬇ %${percentChange * -1}`}
        </h2>
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
          <XAxis dataKey="time" />
          <YAxis
            domain={[
              parseInt(minDollarValue) - 2,
              parseInt(maxDollarValue) + 2,
            ]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="dollars"
            stroke="gold"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
