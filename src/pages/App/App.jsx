import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { getTransactions } from "../../utilities/transactions-api";
import { getUserBalances } from "../../utilities/userBalances-api"
import AuthPage from "../AuthPage/AuthPage";
import OverviewPage from "../OverviewPage/OverviewPage";
import NavBar from "../../components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [transactions, setTransactions] = useState([]);
  const [userBalances, setUserBalances] = useState(getUserBalances());

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
    if (user) {
      fetchTransactions()
    };
  }, [user]);

  async function handleTransactionAdded(newTransaction, updatedUser) {
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    setUser(updatedUser);
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
