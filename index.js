import https from "node:https";

https.get(
  "https://api.coingecko.com/api/v3/coins/bitcoin?tickers=false",
  (res) => {
    let data = "";
    res.on("data", (s) => {
      data += s;
    });

    res.on("end", () => {
      console.log(data);
    });
  }
);
