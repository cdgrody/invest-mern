import { useState } from "react";
import "./TransactionForm.css";

import { addTransaction } from "../../utilities/transactions-api";

export default function OverviewPage({ user }) {
  const [newTransaction, setNewTransaction] = useState({
    ticker: "",
    transactionType: true,
    dollars: 0,
    shares: 0,
    comment: "",
    public: true,
    user: user,
  });

  function handleChange(evt) {
    const newFormData = {
      ...newTransaction,
      [evt.target.name]: evt.target.value,
    };
    setNewTransaction(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const addedTransaction = await addTransaction(newTransaction);
    setNewTransaction({
      ticker: "",
      transactionType: true,
      dollars: 0,
      shares: 0,
      comment: "",
      public: true,
      user: user,
    });
  }

  return (
    <>
      <div className="transaction-form-ctr">
        <form className="left-area-body" onSubmit={handleSubmit}>
          <label id="buying-power">Buying Power: $100</label>
          <div className="ticker-ctr">
            <input
              name="ticker"
              placeholder="Ticker"
              onChange={handleChange}
              value={newTransaction.ticker}
            ></input>
            <label> = 1$ / share</label>
          </div>
          <div className="amount-ctr">
            <input
              name="dollars"
              placeholder="Enter $$$"
              onChange={handleChange}
              value={newTransaction.dollars}
            ></input>
            <label name="shares"> = shares</label>
          </div>
          <div className="options-ctr">
            <select name="public" onChange={handleChange} value={newTransaction.public}>
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </select>
            <select name="transactionType" onChange={handleChange} value={newTransaction.transactionType}>
              <option value={true}>Buy</option>
              <option value={false}>Sell</option>
            </select>
          </div>
          <div className="comment-ctr">
            <input
              name="comment"
              placeholder="comment..."
              onChange={handleChange}
              value={newTransaction.comment}
            ></input>
          </div>
          <button className="transact-button" type="submit">
            Complete Transaction
          </button>
        </form>
      </div>
    </>
  );
}
