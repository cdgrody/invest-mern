import "./HoldingsRow.css";

export default function HoldingsRow({ holding }) {
  return (
    <>
      <tr>
        <td>{holding.asset.ticker}</td>
        <td>{holding.shares.toFixed(2)}</td>
        <td>$4500</td>
        <td>$4500</td>
      </tr>
    </>
  );
}
