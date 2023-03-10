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
      setTransactionList(newHoldings);
    }
    updateTransactionList();
    updateHoldingsTable();
  }, []);


  return (
    <>
      <div className="holdings-table-area">
        {/* <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Current Price</th>
              <th>$USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AAPL</td>
              <td>10</td>
              <td>$1200</td>
              <td>$1200</td>
            </tr>
            <tr> */}
              {newHoldings.map((holding, idx) => (
                <HoldingsRow holding={holding} key={idx} />
              ))}
            {/* </tr>
            <tr>
              <td>GOOG</td>
              <td>5</td>
              <td>$4500</td>
              <td>$4500</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </>
  );
}
