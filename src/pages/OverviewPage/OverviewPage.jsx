import { useState } from "react";
import "./OverviewPage.css";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import ChartArea from "../../components/ChartArea/ChartArea";

export default function OverviewPage({
  user,
  transactions,
  handleTransactionAdded,
  userBalances,
  holdings,
}) {
  const [showTransactionForm, setShowTransactionForm] = useState(true);
  const [showNews, setShowNews] = useState(true);
  const [showAI, setShowAI] = useState(true);

  function handleTransactionFormShow() {
    setShowTransactionForm(!showTransactionForm);
  }

  function handleShowNews() {
    setShowNews(!showNews);
  }

  function handleShowAI() {
    setShowAI(!showAI);
  }

  return (
    <div className="main-body">
      <div className="chart-area"><ChartArea /></div>
      <div className="bottom-half">
        <div className="left-area">
          {showTransactionForm ? (
            <>
              <div
                className="transaction-form-preview"
                onClick={handleTransactionFormShow}
              >
                New Transaction ▶
              </div>
            </>
          ) : (
            <>
              <div
                className="transaction-form-preview"
                onClick={handleTransactionFormShow}
              >
                New Transaction ▼
              </div>
              <div className="transaction-form">
                <TransactionForm
                  user={user}
                  handleTransactionAdded={handleTransactionAdded}
                  userBalances={userBalances}
                />
              </div>
            </>
          )}
          {showNews ? (
            <>
              <div className="news-preview" onClick={handleShowNews}>
                Show Crypto News ▶
              </div>
            </>
          ) : (
            <>
              <div className="news-preview" onClick={handleShowNews}>
                Show Crypto News ▼
              </div>
            </>
          )}
          {showAI ? (
            <>
              <div
                className="ai-investing-advice-preview"
                onClick={handleShowAI}
              >
                AI Investing Advice ▶
              </div>
            </>
          ) : (
            <>
              <div
                className="ai-investing-advice-preview"
                onClick={handleShowAI}
              >
                AI Investing Advice ▼
              </div>
            </>
          )}
        </div>
        <div className="right-area">
          <TransactionList
            user={user}
            transactions={transactions}
            holdings={holdings}
          />
        </div>
      </div>
    </div>
  );
}
