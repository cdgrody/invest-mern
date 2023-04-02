import { type } from "@testing-library/user-event/dist/type";

const assetPrices = [
  358.31, 296.0, 176.49, 68.8, 98.39, 25754.36, 1758.38, 0.076589, 316.54,
  0.3602,
]; //as of 3/14/23

const assetList = [
  {
    ticker: "VOO",
    fullName: "Vanguard S&P 500 ETF",
    type: "stock",
    about:
      "Vanguard S&P 500 ETF - This fund tracks the performance of the S&P 500 index, which consists of 500 large-cap U.S. stocks.",
  },
  {
    ticker: "QQQ",
    fullName: "Invesco QQQ Trust",
    type: "stock",
    about:
      "Invesco QQQ Trust - This fund tracks the performance of the Nasdaq-100 index, which is composed of 100 of the largest domestic and international non-financial companies listed on the Nasdaq Stock Market.",
  },
  {
    ticker: "IWM",
    fullName: "iShares Russell 2000 ETF",
    type: "stock",
    about:
      " iShares Russell 2000 ETF - This fund tracks the performance of the Russell 2000 index, which consists of 2,000 small-cap U.S. stocks.",
  },
  {
    ticker: "EFA",
    fullName: "iShares MSCI EAFE ETF",
    type: "stock",
    about:
      "iShares MSCI EAFE ETF - This fund tracks the performance of the MSCI EAFE index, which consists of large- and mid-cap stocks from developed markets outside of North America.",
  },
  {
    ticker: "AGG",
    fullName: "iShares Core U.S. Aggregate Bond ETF",
    type: "stock",
    about:
      "iShares Core U.S. Aggregate Bond ETF - This fund tracks the performance of the Bloomberg Barclays U.S. Aggregate Bond Index, which consists of investment-grade U.S. bonds across multiple sectors.",
  },
  {
    ticker: "BTC",
    fullName: "Bitcoin",
    type: "crypto",
    about:
      "the original cryptocurrency that started the digital asset revolution in 2009.",
  },
  {
    ticker: "ETH",
    fullName: "Ethereum",
    type: "crypto",
    about:
      "a blockchain platform that enables developers to create decentralized applications and smart contracts.",
  },
  {
    ticker: "DOGE",
    fullName: "Dogecoin",
    type: "crypto",
    about:
      "a cryptocurrency that started as a meme in 2013 and has gained popularity due to celebrity endorsements.",
  },
  {
    ticker: "BNB",
    fullName: "binancecoin",
    type: "crypto",
    about:
      " the native token of the Binance exchange and a key component of the Binance ecosystem.",
  },
  {
    ticker: "ADA",
    fullName: "binance-peg-cardano",
    type: "crypto",
    about:
      "a blockchain platform that aims to provide a more secure and sustainable infrastructure for decentralized applications.",
  },
];
export async function getCryptoData(symbol) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${assetList[
        symbol
      ].fullName.toLowerCase()}?tickers=true`
    );
    const data = await response.json();
    const price = data["market_data"]["current_price"].usd;
    return price;
  } catch (error) {
    console.log(error);
    return generateRandomPrice(symbol);
  }
  // return generateRandomPrice(symbol);
}

function generateRandomHistoricalPrices(symbol) {
  const randomHistoricalPrices = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  for (let randomHistoricalPrice of randomHistoricalPrices) {
    let idx = randomHistoricalPrices.indexOf(randomHistoricalPrice);
    randomHistoricalPrices[idx] = [idx, generateRandomPrice(symbol)];
  }
  return randomHistoricalPrices;
}

export async function getCryptoHistoricalData(symbol) {
    if(symbol < 5) {
      return generateRandomHistoricalPrices(symbol)
    } else {
      try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${assetList[
          symbol
        ].fullName.toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=hourly`
      );
      const data = await response.json();
      const price = data.prices;
      return price;
    } catch (error) {
      console.log(error);
      return generateRandomHistoricalPrices(symbol);
    }
  }
  // return generateRandomHistoricalPrices(symbol);
}

function generateRandomPrice(symbol) {
  const newPrice = assetPrices[symbol];
  return newPrice * (Math.random() * 0.1 + 0.95);
}

export async function computeUserPerformance(holdings, userBalances) {
  const performanceData = [
    { time: 0, dollars: userBalances.balance },
    { time: 1, dollars: userBalances.balance },
    { time: 2, dollars: userBalances.balance },
    { time: 3, dollars: userBalances.balance },
    { time: 4, dollars: userBalances.balance },
    { time: 5, dollars: userBalances.balance },
    { time: 6, dollars: userBalances.balance },
    { time: 7, dollars: userBalances.balance },
    { time: 8, dollars: userBalances.balance },
    { time: 9, dollars: userBalances.balance },
    { time: 10, dollars: userBalances.balance },
    { time: 11, dollars: userBalances.balance },
    { time: 12, dollars: userBalances.balance },
    { time: 13, dollars: userBalances.balance },
    { time: 14, dollars: userBalances.balance },
    { time: 15, dollars: userBalances.balance },
    { time: 16, dollars: userBalances.balance },
    { time: 17, dollars: userBalances.balance },
    { time: 18, dollars: userBalances.balance },
    { time: 19, dollars: userBalances.balance },
    { time: 20, dollars: userBalances.balance },
    { time: 21, dollars: userBalances.balance },
    { time: 22, dollars: userBalances.balance },
    { time: 23, dollars: userBalances.balance },
    { time: 24, dollars: userBalances.balance },
  ];
  const newPerformanceData = performanceData;
  for (let holding of holdings) {
    const holdingHistory = await getCryptoHistoricalData(holding.asset.key);
    for (let hh of holdingHistory) {
      let idx = holdingHistory.indexOf(hh);
      newPerformanceData[idx].dollars += holding.shares * hh[1];
    }
  }
  return newPerformanceData;
}

export async function computeGenericAssetPerformance(key) {
  const performanceData = [
    { time: 0, dollars: 0 },
    { time: 1, dollars: 0 },
    { time: 2, dollars: 0 },
    { time: 3, dollars: 0 },
    { time: 4, dollars: 0 },
    { time: 5, dollars: 0 },
    { time: 6, dollars: 0 },
    { time: 7, dollars: 0 },
    { time: 8, dollars: 0 },
    { time: 9, dollars: 0 },
    { time: 10, dollars: 0 },
    { time: 11, dollars: 0 },
    { time: 12, dollars: 0 },
    { time: 13, dollars: 0 },
    { time: 14, dollars: 0 },
    { time: 15, dollars: 0 },
    { time: 16, dollars: 0 },
    { time: 17, dollars: 0 },
    { time: 18, dollars: 0 },
    { time: 19, dollars: 0 },
    { time: 20, dollars: 0 },
    { time: 21, dollars: 0 },
    { time: 22, dollars: 0 },
    { time: 23, dollars: 0 },
    { time: 24, dollars: 0 },
  ];
  const newPerformanceData = performanceData;
  const holdingHistory = await getCryptoHistoricalData(key);
  for (let hh of holdingHistory) {
    let idx = holdingHistory.indexOf(hh);
    newPerformanceData[idx].dollars += hh[1];
  }
  return performanceData;
}

//retrieved api at https://www.coingecko.com/en/api/documentation
