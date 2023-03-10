import "./OverviewPage.css";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import ChartArea from "../../components/ChartArea/ChartArea";

export default function OverviewPage({
  user,
  transactions,
  handleTransactionAdded,
  userBalances,
  holdings
}) {
  return (
    <div className="main-body">
      <div className="chart-area">
        {/* <ChartArea /> */}
      </div>
      <div className="bottom-half">
        <div className="left-area">
          <TransactionForm
            user={user}
            handleTransactionAdded={handleTransactionAdded}
            userBalances={userBalances}
          />
        </div>
        <div className="right-area">
          <TransactionList user={user} transactions={transactions} holdings={holdings}/>
        </div>
      </div>
    </div>
  );
}
