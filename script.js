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
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`);
    const data = await response.json();

    if (data.success && data.result !== undefined) {
      resultDiv.innerText = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
    } else {
      resultDiv.innerText = "Conversion failed. Try again.";
    }
  } catch (error) {
    resultDiv.innerText = "Error connecting to the API.";
  }
}

