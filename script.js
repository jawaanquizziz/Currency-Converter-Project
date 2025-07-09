const apiKey = "7d987ed20cc824c04aab3037"; 
const currencySymbols = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
  CNY: "¥",
  RUB: "₽",
  ZAR: "R",
  SGD: "S$",
  HKD: "HK$",
  NZD: "NZ$",
  KRW: "₩",
  BRL: "R$",
  MXN: "MX$",
  AED: "د.إ",
  SAR: "﷼",
  TRY: "₺"
};

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultDiv = document.getElementById("result");

  if (!amount || isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "Please enter a valid amount.";
    return;
  }

  resultDiv.innerText = "Converting...";

  try {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
      const rate = data.conversion_rates[to];
      const converted = (amount * rate).toFixed(2);
      const fromSymbol = currencySymbols[from] || from;
      const toSymbol = currencySymbols[to] || to;
      resultDiv.innerText = `${fromSymbol}${amount} ${from} = ${toSymbol}${converted} ${to}`;

    } else {
      resultDiv.innerText = "Conversion failed. Try again.";
    }
  } catch (error) {
    resultDiv.innerText = "Error connecting to API.";
    console.error(error);
  }
}

function swapCurrencies() {
  const fromSelect = document.getElementById("from");
  const toSelect = document.getElementById("to");

  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  convertCurrency();
}
