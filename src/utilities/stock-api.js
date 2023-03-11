// const API_KEY = '4CP6W5DA6KMJA4C1'
const API_KEY_ARRAY = [
  "4CP6W5DA6KMJA4C1",
  "JR7L7NXPSTBIR6KJ",
  "UO85UMA1B5XXUL4W",
  "J1ZLMOU86EWNJXLK",
  "PI8VG1OSHALC53BC"
];
let key_picker = 0;

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
export async function getStockData(symbol) {
  try {
    key_picker += 1;
    key_picker %= 5;
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${assetList[symbol].ticker}&apikey=${API_KEY_ARRAY[key_picker]}`
    );
    const data = await response.json();
    const price = data["Global Quote"]["05. price"];
    return price;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//retrieved api key at https://www.alphavantage.co/