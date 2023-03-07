import { useState, useEffect } from "react";
import "./TransactionForm.css";
import { addTransaction } from "../../utilities/transactions-api";
import { getStockData } from "../../utilities/stock-api";

export default function OverviewPage({ user, handleTransactionAdded }) {
  const [newTransaction, setNewTransaction] = useState({
    ticker: "",
    transactionType: true,
    dollars: 0,
    shares: 0,
    comment: "",
    public: true,
    user: user,
  });
  const [stockPrice, setStockPrice] = useState(0)

  useEffect(() => {
    async function fetchStockData(){
      const stockPrice = await getStockData(newTransaction.ticker);
      setStockPrice(stockPrice)
    }
    fetchStockData()
  }, [newTransaction.ticker])

  function checkForStockData(isValid){
    if (isValid) return newTransaction.ticker
    isValid = false
  }

  function handleChange(evt) {
    const newFormData = {
      ...newTransaction,
      shares: shareCalculator(),
      [evt.target.name]: evt.target.value,
    };
    setNewTransaction(newFormData);
  }

  function shareCalculator() {
    if (!stockPrice) return 0
    return newTransaction.dollars/stockPrice
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
    return await handleTransactionAdded(addedTransaction)
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
            <label> = {stockPrice} $ / share</label>
          </div>
          <div className="amount-ctr">
            <input
              name="dollars"
              placeholder="Enter $$$"
              onChange={handleChange}
              value={newTransaction.dollars}
            ></input>
            <label name="shares"> = {shareCalculator().toFixed(2)} shares</label>
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
