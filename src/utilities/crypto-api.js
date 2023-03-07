export async function getCryptoData(symbol) {
    const assetList = [
        {ticker: 'VOO', fullName: 'Vanguard S&P 500 ETF', type: 'stock', about: 'Vanguard S&P 500 ETF - This fund tracks the performance of the S&P 500 index, which consists of 500 large-cap U.S. stocks.'},
        {ticker: 'QQQ', fullName: 'Invesco QQQ Trust', type: 'stock', about: 'Invesco QQQ Trust - This fund tracks the performance of the Nasdaq-100 index, which is composed of 100 of the largest domestic and international non-financial companies listed on the Nasdaq Stock Market.'},
        {ticker: 'IWM', fullName: 'iShares Russell 2000 ETF', type: 'stock', about: ' iShares Russell 2000 ETF - This fund tracks the performance of the Russell 2000 index, which consists of 2,000 small-cap U.S. stocks.'},
        {ticker: 'EFA', fullName: 'iShares MSCI EAFE ETF', type: 'stock', about: 'iShares MSCI EAFE ETF - This fund tracks the performance of the MSCI EAFE index, which consists of large- and mid-cap stocks from developed markets outside of North America.'},
        {ticker: 'AGG', fullName: 'iShares Core U.S. Aggregate Bond ETF', type: 'stock', about: 'iShares Core U.S. Aggregate Bond ETF - This fund tracks the performance of the Bloomberg Barclays U.S. Aggregate Bond Index, which consists of investment-grade U.S. bonds across multiple sectors.'},
        {ticker: 'BTC', fullName: 'Bitcoin', type: 'crypto', about: 'the original cryptocurrency that started the digital asset revolution in 2009.'},
        {ticker: 'ETH', fullName: 'Ethereum', type: 'crypto', about: 'a blockchain platform that enables developers to create decentralized applications and smart contracts.'},
        {ticker: 'DOGE', fullName: 'Dogecoin', type: 'crypto', about: 'a cryptocurrency that started as a meme in 2013 and has gained popularity due to celebrity endorsements.'},
        {ticker: 'BNB', fullName: 'binancecoin', type: 'crypto', about: ' the native token of the Binance exchange and a key component of the Binance ecosystem.'},
        {ticker: 'ADA', fullName: 'binance-peg-cardano', type: 'crypto', about: 'a blockchain platform that aims to provide a more secure and sustainable infrastructure for decentralized applications.'},
    ]
    try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${assetList[symbol].fullName.toLowerCase()}?tickers=true`);
    const data = await response.json();
    const price = data["market_data"]["current_price"].usd;
    console.log(price)
    return price;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//retrieved api at https://www.coingecko.com/en/api/documentation
