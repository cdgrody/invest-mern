import './HoldingsTable.css'

export default function HoldingsTable({ transactions }) {

    // const holdingsTickers = []
    // // const holdings = [{'ticker': 'BTC', 'shares': 3, 'price': 400}]
    // function createHoldings() {
    //     for (transaction in transactions) {
    //         if (!(transaction.asset.ticker in holdingsTickers)) holdingsTickers.push(transaction.asset.ticker)
    //     }
    //     console.log(holdingsTickers)
    // }

  return (
    <>
      <div className="holdings-table-area">
        <table>
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Current Price</th>
              <th>$USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>AAPL</td>
              <td>10</td>
              <td>$1200</td>
              <td>$1200</td>
            </tr>
            <tr>
              <td>GOOG</td>
              <td>5</td>
              <td>$4500</td>
              <td>$4500</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
