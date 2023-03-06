import "./TransactionCard.css";

export default function TransactionCard({ transaction }) {
  function dateFormat() {
    const dateObj = new Date(transaction.createdAt);
    return [dateObj.toLocaleDateString(), dateObj.toLocaleTimeString()];
  }

  return (
    <div className="transaction-card">
      <div className="ticker-date-ctr">
        <div className="ticker-card-text">{transaction.ticker}</div>
        <div>{dateFormat()[0]}</div>
      </div>
      <div className="ticker-card-price">
        {transaction.transactionType ? <div>+${transaction.dollars.toFixed(2)}</div> : <div>-${transaction.dollars.toFixed(2)}</div>}
      </div>
    </div>
  );
}
