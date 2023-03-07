import "./TransactionList.css";
import TransactionCard from "../TransactionCard/TransactionCard";
import HoldingsTable from "../HoldingsTable/HoldingsTable";

export default function TransactionList({ user, transactions }) {
  return (
    <>
      <div className="list-header">
        <div>Transactions </div> 
        <div>|</div> 
        <div>Holdings </div>
        </div>
        <HoldingsTable transactions={transactions}/>
      <div className="transaction-list-ctr">
        {transactions.map((transaction, idx) => (
          <TransactionCard transaction={transaction} key={idx} />
        ))}
      </div>
    </>
  );
}
