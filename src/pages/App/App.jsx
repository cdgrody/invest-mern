import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { getTransactions } from "../../utilities/transactions-api";
import AuthPage from "../AuthPage/AuthPage";
import OverviewPage from "../OverviewPage/OverviewPage";
import NavBar from "../../components/NavBar/NavBar";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [transactions, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    async function fetchTransactions() {
      const transactions = await getTransactions();
      setTransactions(transactions);
    }
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser))
    // async function fetchUser() {
      // const userData = await getUser();
      // // console.log('userData from app.jsx end', user)
      // setUser(userData);
    // }
    if (user) {
      // fetchUser();
      fetchTransactions()
    };
  }, []);

  console.log('user in the app.jsx', user)

  async function handleTransactionAdded(newTransaction, addUpdatedUser) {
    const newTransactions = [...transactions, newTransaction];
    setTransactions(newTransactions);
    setUser(addUpdatedUser);
    localStorage.setItem('user', JSON.stringify(addUpdatedUser));
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
                  holdings={holdings}
                  setUser={user}
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
