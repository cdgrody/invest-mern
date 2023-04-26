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

const interval = {
  'HR': {'days': 1, 'start': 0, 'length': 13, 'type': ''},
  'DY': {'days': 1, 'start': 0, 'length': 25, 'type': '&interval=hourly'},
  'WK': {'days': 7, 'start': 0, 'length': 8, 'type': '&interval=daily'},
  'MH': {'days': 31, 'start': 0, 'length': 32, 'type': '&interval=daily'},
  'YR': {'days': 365, 'start': 0, 'length': 366, 'type': '&interval=daily'},
}

export async function getCryptoHistoricalData(symbol, timeInterval) {
    if(symbol < 5) {
      return generateRandomHistoricalPrices(symbol)
    } else {
      try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${assetList[
          symbol
        ].fullName.toLowerCase()}/market_chart?vs_currency=usd&days=${interval[timeInterval].days}${interval[timeInterval].type}`
      );
      const data = await response.json();
      const price = data.prices;
      return price;
    } catch (error) {
      console.log(error);
      return generateRandomHistoricalPrices(symbol);
    }
    }
  // return generateRandomHistoricalPrices(symbol); //use in case of errors with API
}

export async function computeUserPerformance(holdings, userBalances, timeInterval) {
  const performanceData = Array.from({ length: interval[timeInterval].length}, (x, i) => ({'time': i + interval[timeInterval].start, 'dollars': userBalances.balance}))
  const newPerformanceData = performanceData;
  for (let holding of holdings) {
    let holdingHistory = await getCryptoHistoricalData(holding.asset.key, timeInterval);
    if(timeInterval === 'HR') {holdingHistory = holdingHistory.slice(289-13, 289)}
    for (let hh of holdingHistory) {
      let idx = holdingHistory.indexOf(hh);
      const newDollars = newPerformanceData[idx].dollars + holding.shares * hh[1];
      newPerformanceData[idx].dollars = newDollars;
        if(idx === interval[timeInterval].length) return newPerformanceData
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

function generateRandomHistoricalPrices(symbol) {
  const randomHistoricalPrices = Array.from({ length: 25}, (x, i) => [i, generateRandomPrice(symbol)])
  return randomHistoricalPrices;
}

function generateRandomPrice(symbol) {
  const newPrice = assetPrices[symbol];
  return newPrice * (Math.random() * 0.1 + 0.95);
}

//retrieved api at https://www.coingecko.com/en/api/documentation
