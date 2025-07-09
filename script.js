async function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value);
  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  resultDiv.textContent = "Converting...";

  try {
    // Fetch rates with your API key
    const response = await fetch('https://v6.exchangerate-api.com/v6/7d987ed20cc824c04aab3037/latest/' + from);
    const data = await response.json();

    if (data.result !== "success") {
      resultDiv.textContent = "Failed to fetch rates. Try again later.";
      return;
    }

    const rate = data.conversion_rates[to];
    if (!rate) {
      resultDiv.textContent = "Currency not supported.";
      return;
    }

    const converted = amount * rate;
    resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching rates.";
  }
}
