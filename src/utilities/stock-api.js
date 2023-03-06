const API_KEY = '4CP6W5DA6KMJA4C1'

export async function getStockData(symbol) {
    try {
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
        const data = await response.json()
        const price = data['Global Quote']['05. price'];
        return price
    } catch (error) {
        console.log(error)
        return 0
    }
}
