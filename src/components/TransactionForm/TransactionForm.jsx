import { useState, useEffect } from "react";
import "./TransactionForm.css";
import { addTransaction } from "../../utilities/transactions-api";
import { getHoldings, manageHolding } from "../../utilities/holdings-api";
import { updateUserBalances, getUserBalances } from "../../utilities/userBalances-api";
import { getStockData } from "../../utilities/stock-api";
import { getCryptoData } from "../../utilities/crypto-api";

export default function OverviewPage({ user, handleTransactionAdded, userBalances, holdings }) {

  const assetList = [
    {key: 0, ticker: 'VOO', fullName: 'Vanguard S&P 500 ETF', type: 'stock', about: 'Vanguard S&P 500 ETF - This fund tracks the performance of the S&P 500 index, which consists of 500 large-cap U.S. stocks.'},
    {key: 1, ticker: 'QQQ', fullName: 'Invesco QQQ Trust', type: 'stock', about: 'Invesco QQQ Trust - This fund tracks the performance of the Nasdaq-100 index, which is composed of 100 of the largest domestic and international non-financial companies listed on the Nasdaq Stock Market.'},
    {key: 2, ticker: 'IWM', fullName: 'iShares Russell 2000 ETF', type: 'stock', about: ' iShares Russell 2000 ETF - This fund tracks the performance of the Russell 2000 index, which consists of 2,000 small-cap U.S. stocks.'},
    {key: 3, ticker: 'EFA', fullName: 'iShares MSCI EAFE ETF', type: 'stock', about: 'iShares MSCI EAFE ETF - This fund tracks the performance of the MSCI EAFE index, which consists of large- and mid-cap stocks from developed markets outside of North America.'},
    {key: 4, ticker: 'AGG', fullName: 'iShares Core U.S. Aggregate Bond ETF', type: 'stock', about: 'iShares Core U.S. Aggregate Bond ETF - This fund tracks the performance of the Bloomberg Barclays U.S. Aggregate Bond Index, which consists of investment-grade U.S. bonds across multiple sectors.'},
    {key: 5, ticker: 'BTC', fullName: 'Bitcoin', type: 'crypto', about: 'the original cryptocurrency that started the digital asset revolution in 2009.'},
    {key: 6, ticker: 'ETH', fullName: 'Ethereum', type: 'crypto', about: 'a blockchain platform that enables developers to create decentralized applications and smart contracts.'},
    {key: 7, ticker: 'DOGE', fullName: 'Dogecoin', type: 'crypto', about: 'a cryptocurrency that started as a meme in 2013 and has gained popularity due to celebrity endorsements.'},
    {key: 8, ticker: 'BNB', fullName: 'Binance Coin', type: 'crypto', about: ' the native token of the Binance exchange and a key component of the Binance ecosystem.'},
    {key: 9, ticker: 'ADA', fullName: 'Cardano', type: 'crypto', about: 'a blockchain platform that aims to provide a more secure and sustainable infrastructure for decentralized applications.'},
]

  const [newTransaction, setNewTransaction] = useState({
    asset: 10,
    transactionType: "-1",
    dollars: 0,
    shares: 0,
    comment: "",
    public: true,
    holding: null,
    user: user,
  });

  const [newHolding, setNewHolding] = useState({
    asset: 10,
    shares: 0,
    investment: 0,
    user: user,
  });

  const [assetPrice, setAssetPrice] = useState(0)
  
  const [newUserBalance, setNewUserBalance] = useState(userBalances)

  const [holdingsTracker, setHoldingsTracker] = useState(holdings)

  const [universalMultiplier, setUniversalMultiplier] = useState(1)

  useEffect(() => {
    async function fetchStockData(){
      const stockPrice = await getStockData(newTransaction.asset);
      setAssetPrice(stockPrice)
    }
    async function fetchCryptoData(){
      const cryptoPrice = await getCryptoData(newTransaction.asset);
      setAssetPrice(cryptoPrice)
    }
    if(newTransaction.asset <= 4) fetchStockData()
    if(newTransaction.asset > 4 && newTransaction.asset !== 10) fetchCryptoData()
  }, [newTransaction.asset])

  useEffect(() => {
    async function updateUserBalances() {
      const balances = await getUserBalances(user._id);
      setNewUserBalance(balances);
    }
    updateUserBalances();
  }, [user._id]);

  function checkForStockData(isValid){
    if (isValid) return newTransaction.ticker
    isValid = false
  }

  useEffect(() => {
    async function updateHoldingsTable() {
      const holdingsTracker = await getHoldings();
      setHoldingsTracker(holdingsTracker);
    }
    updateHoldingsTable();
  }, [handleTransactionAdded]);

  async function changeUniversalMultiplier(evt) {
    setUniversalMultiplier(-1*parseInt(evt.target.value))
    handleChange(evt)
  }

  function handleChange(evt) {
    const newTransactionData = {
      ...newTransaction,
      shares: shareCalculator(),
      [evt.target.name]: evt.target.value,
    };
    const newHoldingData = {
      ...newHolding,
      shares: shareCalculator(),
      [evt.target.name]: evt.target.value
    }
    setNewTransaction(newTransactionData);
    setNewHolding(newHoldingData);
  }

  function shareCalculator() {
    if (!assetPrice) return 0
    return newTransaction.dollars/assetPrice
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const multiplier = await universalMultiplier;
    newHolding.shares = multiplier * shareCalculator();
    newHolding.investment = multiplier * newTransaction.dollars
    const addedHolding = await manageHolding(newHolding, holdingsTracker);
    newTransaction.shares = shareCalculator();
    const addedTransaction = await addTransaction(newTransaction);
    const newBalance = userBalances.balance + parseInt(newTransaction.transactionType) * newTransaction.dollars
    userBalances.balance = newBalance;
    const addUpdatedUserBalances = await updateUserBalances(userBalances)
    if(newBalance > 0) setNewUserBalance(userBalances)
    setNewUserBalance({
      balance: newBalance,
      user: user
    })
    setNewTransaction({
      asset: 10,
      transactionType: -1,
      dollars: 0,
      shares: 0,
      comment: "",
      holding: null,
      public: true,
      user: user,
    });
    setNewHolding({
      asset: 10,
      shares: 0,
      investment: 0,
      user: user,
    });
    setUniversalMultiplier(1)
    return await handleTransactionAdded(addedTransaction, addUpdatedUserBalances, addedHolding)
  }

  return (
    <>
      <div className="transaction-form-ctr">
        <form className="left-area-body" onSubmit={handleSubmit}>
          <label id="buying-power">Buying Power: ${newTransaction.transactionType === "-1" && newTransaction.dollars > 0 ? newUserBalance.balance + parseInt(newTransaction.transactionType) * newTransaction.dollars : newUserBalance.balance}</label>
          <div className="ticker-ctr">
            <select
              name="asset"
              onChange={handleChange}
              value={newTransaction.asset}
              className="ticker-selector"
            >
              <option>Select</option>
              <option value={9}>{assetList[9].ticker}</option>
              <option value={8}>{assetList[8].ticker}</option>
              <option value={5}>{assetList[5].ticker}</option>
              <option value={7}>{assetList[7].ticker}</option>
              <option value={6}>{assetList[6].ticker}</option>
              <option value={0}>{assetList[0].ticker}</option>
              <option value={1}>{assetList[1].ticker}</option>
              <option value={2}>{assetList[2].ticker}</option>
              <option value={3}>{assetList[3].ticker}</option>
              <option value={4}>{assetList[4].ticker}</option>
            </select>
            <label> = ${assetPrice.toFixed(2)} / share</label>
          </div>
          <div className="amount-ctr">
            <input
              name="dollars"
              placeholder="Enter $$$"
              onChange={handleChange}
              type="number"
              value={newTransaction.dollars}
              className="enter-dollars-input"
              min="1"
            ></input>
            <label name="shares"> = {shareCalculator().toFixed(2)} shares</label>
          </div>
          <div className="options-ctr">
            <select name="public" onChange={handleChange} value={newTransaction.public} className="public-selector">
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </select>
            <select name="transactionType" onChange={changeUniversalMultiplier} value={newTransaction.transactionType} className="transaction-selector">
              <option value={"-1"}>Buy</option>
              <option value={"1"}>Sell</option>
            </select>
          </div>
          <div className="comment-ctr">
            <input
              name="comment"
              placeholder="comment..."
              onChange={handleChange}
              value={newTransaction.comment}
              className="enter-comment-input"
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
