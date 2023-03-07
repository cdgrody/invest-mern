// const API_KEY = '4CP6W5DA6KMJA4C1'
const API_KEY_ARRAY = [
  "4CP6W5DA6KMJA4C1",
  "JR7L7NXPSTBIR6KJ",
  "UO85UMA1B5XXUL4W",
  "J1ZLMOU86EWNJXLK",
  "PI8VG1OSHALC53BC"
];
let key_picker = 0;

export async function getStockData(symbol) {
//   try {
//     key_picker += 1;
//     key_picker %= 5;
//     const response = await fetch(
//       `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY_ARRAY[key_picker]}`
//     );
//     const data = await response.json();
//     const price = data["Global Quote"]["05. price"];
//     return price;
//   } catch (error) {
//     console.log(error);
//     return 0;
//   }
return 50
}

//retrieved api key at https://www.alphavantage.co/