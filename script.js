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
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await response.json();

    if (!data.rates || !data.rates[to]) {
      resultDiv.textContent = "Currency not supported or API error.";
      return;
    }

    const converted = data.rates[to];
    resultDiv.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    resultDiv.textContent = "Error fetching rates.";
  }
}
