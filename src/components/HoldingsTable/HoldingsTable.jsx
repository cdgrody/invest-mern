import "./HoldingsTable.css";
import { useState, useEffect } from "react";
import { getHoldings } from "../../utilities/holdings-api";
import { getTransactions } from "../../utilities/transactions-api";
import HoldingsRow from "../HoldingsRow/HoldingsRow";

export default function HoldingsTable({ transactions, holdings }) {
  const [newHoldings, setNewHoldings] = useState([]);
  const [transactionList, setTransactionList] = useState(getTransactions);

  useEffect(() => {
    async function updateTransactionList() {
      const transactionList = await getTransactions();
      setTransactionList(transactionList);
    }
    async function updateHoldingsTable() {
      const newHoldings = await getHoldings();
      setNewHoldings(newHoldings);
    }
    updateTransactionList();
    updateHoldingsTable();
  }, [transactions]);


  return (
    <>
      <div className="holdings-table-area">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Current Price</th>
              <th>Equity</th>
            </tr>
          </thead>
          <tbody>
              {newHoldings.map((holding, idx) => (
                <HoldingsRow holding={holding} key={idx} />
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
