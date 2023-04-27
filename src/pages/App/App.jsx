import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { getTransactions } from "../../utilities/transactions-api";
import { getUserBalances } from "../../utilities/userBalances-api"
import AuthPage from "../AuthPage/AuthPage";
import OverviewPage from "../OverviewPage/OverviewPage";
import NavBar from "../../components/NavBar/NavBar";
import { getHoldings } from "../../utilities/holdings-api";
import { getNewsData } from "../../utilities/news-api";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [transactions, setTransactions] = useState([]);
  const [newsArticles, setNewsArticles] = useState([])
  const [userBalances, setUserBalances] = useState(getUserBalances());
  const [holdings, setHoldings] = useState(getHoldings());


  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await getTransactions();
      setTransactions(transactions);
    }
    async function fetchUser() {
      const user = await getUser();
      setUser(user);
    }
    async function fetchUserBalances() {
      const userBalances = await getUserBalances();
      setUserBalances(userBalances);
    }
    async function fetchUpdatedHoldings() {
      const holdings = await getHoldings();
      setHoldings(holdings);
    }
    async function fetchNewsArticles() {
      const newsArticles = await getNewsData();
      setNewsArticles(newsArticles);
    }
    if (user) {
      fetchTransactions()
      fetchUserBalances()
      fetchUpdatedHoldings()
      fetchNewsArticles()
    };
  }, [user]);

  async function handleTransactionAdded(newTransaction, addUpdatedUserBalances, addedHolding) {
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    setUserBalances(addUpdatedUserBalances)
    const newHoldings = await getHoldings()
    setHoldings(newHoldings)
  }

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route
              path="/overview"
              element={
                <OverviewPage
                  user={user}
                  handleTransactionAdded={handleTransactionAdded}
                  transactions={transactions}
                  userBalances={userBalances}
                  holdings={holdings}
                  newsArticles={newsArticles}
                />
              }
            />
            <Route path="/*" element={<Navigate to="/overview" />} />
          </Routes>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
