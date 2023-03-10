import { useState, useEffect } from 'react'
import "./TransactionList.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import HoldingsTable from "../HoldingsTable/HoldingsTable";
import { getTransactions } from '../../utilities/transactions-api';

export default function TransactionList({ user, transactions }) {

  const [transactionList, setTransactionList] = useState(transactions)

  useEffect(() => {
    async function updateTransactionList() {
      const transactionList = await getTransactions();
      console.log(transactionList)
      setTransactionList(transactionList);
    }
    updateTransactionList();
  }, [transactions]);

  return (
    <>
      <div className="list-header">
        <div>Transactions </div> 
        <div>|</div> 
        <div>Holdings </div>
        </div>
        <HoldingsTable transactions={transactions}/>
      <div className="transaction-list-ctr">
        {transactionList.map((transaction, idx) => (
          <TransactionCard transaction={transaction} key={idx} />
        ))}
      </div>
    </>
  );
}
