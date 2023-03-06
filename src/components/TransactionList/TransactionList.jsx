import "./TransactionList.css";
import TransactionCard from "../TransactionCard/TransactionCard";

export default function TransactionList({ user, transactions }) {
  return (
    <>
      <div className="list-header">Transactions</div>
      <div className="transaction-list-ctr">
        {transactions.map((transaction, idx) => (
          <TransactionCard transaction={transaction} key={idx} />
        ))}
      </div>
    </>
  );
}
