import { useState } from "react";
import "./TransactionCard.css";

export default function TransactionCard({ transaction }) {
  const [transactionDetail, setTransactionDetail] = useState(false);

  function dateFormat() {
    const dateObj = new Date(transaction.createdAt);
    return [dateObj.toLocaleDateString(), dateObj.toLocaleTimeString()];
  }

  function handleClick(evt) {
    setTransactionDetail(!transactionDetail);
    console.log(idVal);
  }

  function changeId() {
    console.log(transactionDetail);
    if (transactionDetail) return "detail";
    return "";
  }

  const idVal = transactionDetail ? "detail-view" : "";

  return (
    <>
      {transactionDetail ? (
        <>
          <div
            className="transaction-card-detail"
            id={idVal}
            onClick={handleClick}
            value={transaction}
          >
            <div className="ticker-date-ctr">
              <div className="ticker-card-text">{transaction.asset.ticker}</div>
              <div className="ticker-card-text">{transaction.shares.toFixed(2)}</div>
              <div className="ticker-card-price">
                {transaction.transactionType === "-1" ? (
                  <div>-${transaction.dollars.toFixed(2)}</div>
                ) : (
                  <div>+${transaction.dollars.toFixed(2)}</div>
                )}
              </div>
            </div>
            <div>
              {dateFormat()[0]} @ {dateFormat()[1]}
            </div>
            <div>---------</div>
            <div>"{transaction.comment}"</div>
          </div>
        </>
      ) : (
        <>
          <div
            className="transaction-card-preview"
            id={idVal}
            onClick={handleClick}
            value={transaction}
          >
            <div className="ticker-card-text-preview">
              {transaction.asset.ticker}
            </div>
            <div className="ticker-card-price-preview">
              {transaction.transactionType === "-1"  ? (
                <div>+${transaction.dollars.toFixed(2)}</div>
              ) : (
                <div>-${transaction.dollars.toFixed(2)}</div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
