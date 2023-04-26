import { type } from "@testing-library/user-event/dist/type";

const assetPrices = [
  358.31, 296.0, 176.49, 68.8, 98.39, 25754.36, 1758.38, 0.076589, 316.54,
  0.3602,
]; //as of 3/14/23

const assetList = [
  {
    ticker: "VOO",
    fullName: "Vanguard S&P 500 ETF",
},
  {
    ticker: "QQQ",
    fullName: "Invesco QQQ Trust",
 },
  {
    ticker: "IWM",
    fullName: "iShares Russell 2000 ETF",
  },
  {
    ticker: "EFA",
    fullName: "iShares MSCI EAFE ETF",
},
  {
    ticker: "AGG",
    fullName: "iShares Core U.S. Aggregate Bond ETF",
},
  {
    ticker: "BTC",
    fullName: "Bitcoin",
},
  {
    ticker: "ETH",
    fullName: "Ethereum",
},
  {
    ticker: "DOGE",
    fullName: "Dogecoin",
},
  {
    ticker: "BNB",
    fullName: "binancecoin",
},
  {
    ticker: "ADA",
    fullName: "binance-peg-cardano",
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
  const randomHistoricalPrices = Array.from({ length: 25}, (x, i) => [i+1, generateRandomPrice(symbol)])
  return randomHistoricalPrices;
}

export async function getCryptoHistoricalData(symbol) {
  //   if(symbol < 5) {
  //     return generateRandomHistoricalPrices(symbol)
  //   } else {
  //     try {
  //     const response = await fetch(
  //       `https://api.coingecko.com/api/v3/coins/${assetList[
  //         symbol
  //       ].fullName.toLowerCase()}/market_chart?vs_currency=usd&days=1&interval=hourly`
  //     );
  //     const data = await response.json();
  //     const price = data.prices;
  //     return price;
  //   } catch (error) {
  //     console.log(error);
  //     return generateRandomHistoricalPrices(symbol);
  //   }
  // }
  return generateRandomHistoricalPrices(symbol); //use in case of errors with API
}

function generateRandomPrice(symbol) {
  const newPrice = assetPrices[symbol];
  return newPrice * (Math.random() * 0.1 + 0.95);
}

export async function computeUserPerformance(holdings, userBalances) {
  const performanceData = Array.from({ length: 25}, (x, i) => ({'time': i+1, 'dollars': userBalances.balance}))
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
  const performanceData = Array.from({ length: 25}, (x, i) => ({'time': i+1, 'dollars': 0}))
  const newPerformanceData = performanceData;
  const holdingHistory = await getCryptoHistoricalData(key);
  for (let hh of holdingHistory) {
    let idx = holdingHistory.indexOf(hh);
    newPerformanceData[idx].dollars += hh[1];
  }
  return performanceData;
}

//retrieved api at https://www.coingecko.com/en/api/documentation
