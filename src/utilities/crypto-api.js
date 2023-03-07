export async function getCryptoData(symbol) {
    console.log('gettttttttting crypto data')
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol}?tickers=true`);
    const data = await response.json();
    const price = data["market_data"]["current_price"].usd;
    return price;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//retrieved api at https://www.coingecko.com/en/api/documentation
