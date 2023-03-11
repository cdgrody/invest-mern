import { useState, useEffect } from "react";
import "./HoldingsRow.css";
import { getStockData } from "../../utilities/stock-api";
import { getCryptoData } from "../../utilities/crypto-api";

export default function HoldingsRow({ holding }) {

  const [assetPrice, setAssetPrice] = useState(0)

    useEffect(() => {
        async function fetchStockData(){
          const stockPrice = await getStockData(holding.asset.key);
          setAssetPrice(stockPrice)
        }
        async function fetchCryptoData(){
          const cryptoPrice = await getCryptoData(holding.asset.key);
          setAssetPrice(cryptoPrice)
        }
        holding.asset.key <= 4 ? fetchStockData() : fetchCryptoData()
      }, [holding.asset])

  return (
    <>
      <tr>
        <td>{holding.asset.ticker}</td>
        <td>{holding.shares.toFixed(2)}</td>
        <td>${assetPrice}</td>
        <td>${(assetPrice*holding.shares).toFixed(2)}</td>
      </tr>
    </>
  );
}
