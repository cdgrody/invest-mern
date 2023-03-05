import "./TransactionForm.css";

export default function OverviewPage() {
  return (
    <>
      <div className="transaction-form-ctr">
        <form className="left-area-body">
          <label id="buying-power">Buying Power: $100</label>
          <div className="ticker-ctr">
            <input name="ticker" placeholder="Ticker"></input>
            <label> = $/share</label>
          </div>
          <div className="amount-ctr">
            <input name="dollars" placeholder="Enter Amount"></input>
            <label name="shares"> = x shares</label>
          </div>
          <div className="options-ctr">
            <select name="public">
              <option>Public</option>
              <option>Private</option>
            </select>
            <select name="transactionType">
              <option>Buy</option>
              <option>Sell</option>
            </select>
          </div>
          <div className="comment-ctr">
            <input name="comment" placeholder="comment..."></input>
          </div>
          <button type="submit">Complete Transaction</button>
        </form>
      </div>
    </>
  );
}
