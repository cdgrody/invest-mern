import { useState, useEffect } from "react";
import "./TransactionList.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import HoldingsTable from "../HoldingsTable/HoldingsTable";
import { getTransactions } from "../../utilities/transactions-api";

export default function TransactionList({ user, transactions }) {
  const [transactionList, setTransactionList] = useState(transactions);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    async function updateTransactionList() {
      const transactionList = await getTransactions();
      setTransactionList(transactionList);
    }
    updateTransactionList();
  }, [transactions]);

  function handleClick(evt) {
    setShowOptions(!showOptions)
  }

  return (
    <>
      <div className="list-header">
        <div onClick={handleClick} className="list-header-el" id={showOptions ? "show-option" : ""}>Transactions </div>
        <div onClick={handleClick} className="list-header-el" id={showOptions ? "" : "show-option"}>Holdings </div>
      </div>
{
  !showOptions ?
      <div className="holdings-table-ctr">
        <HoldingsTable transactions={transactions} />
      </div>
      :
      <div className="transaction-list-ctr">
        {transactionList.map((transaction, idx) => (
          <TransactionCard transaction={transaction} key={idx} />
        ))}
      </div>
      }
    </>
  );
}
