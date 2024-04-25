<script>
  import { onMount } from "svelte";

  let fromCurrency = "";
  let toCurrency = "";
  let result = "0";
  let amountInput = "";

  async function convertCurrency() {
    const apikey = '9f0aae89154e7532d97ac7f8';
    const amount = parseFloat(amountInput); 

    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
      const data = await response.json();
      
      if (response.ok) {
        result = data.conversion_result;
        document.getElementById("resultField").textContent = result;
      } else {
        console.log("Ошибка при получении данных");
      }
    } catch (error) {
      console.log("Произошла ошибка");
    }
  }

  function handleInput() {
  if (amountInput === "") {
    result = "0";
  } else {
    convertCurrency();
  }
}

  onMount(() => {
    convertCurrency(); 
  });
</script>
<style>
 
  div {
    display: flex;
    align-items: flex-start;
    text-align: center;
    background-color: green;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
  }

 
  select {
    background-color: #f0f0f0;
    padding: 10px;
    font-size: 16px;
  }

  
  input[type="text"] {
    background-color: #f0f0f0;
    padding: 10px;
    font-size: 16px;
    width: 211px;
  }

  
  #resultField {
    background-color: #f0f0f0;
    padding: 10px;
    font-size: 16px;
    border: none;
    width: 231px;
  }

  .result {
    margin-top: 10px;
  }

  label {
    text-align: left;
    margin-bottom: 5px;
  }

  .amount {
    margin-top: 10px;
  }

</style>

<div>
  <label for="from">From:</label>
  <select bind:value={fromCurrency} on:change={convertCurrency}>
    <option value="CNY">Chinese Yuan (CNY)</option>
    <option value="RUB">Russian Ruble (RUB)</option>
    <option value="USD">US Dollar (USD)</option>
    <option value="EUR">Euro (EUR)</option>
    <option value="GBP">British Pound (GBP)</option>
    <option value="JPY">Japanese Yen (JPY)</option>
    <option value="AUD">Australian Dollar (AUD)</option>
    <option value="CAD">Canadian Dollar (CAD)</option>
    <option value="CHF">Swiss Franc (CHF)</option>
    <option value="SEK">Swedish Krona (SEK)</option>
    <option value="NZD">New Zealand Dollar (NZD)</option>
  </select>
  
  <label for="to">To:</label>
  <select bind:value={toCurrency} on:change={convertCurrency}>
    <option value="CNY">Chinese Yuan (CNY)</option>
    <option value="RUB">Russian Ruble (RUB)</option>
    <option value="USD">US Dollar (USD)</option>
    <option value="EUR">Euro (EUR)</option>
    <option value="GBP">British Pound (GBP)</option>
    <option value="JPY">Japanese Yen (JPY)</option>
    <option value="AUD">Australian Dollar (AUD)</option>
    <option value="CAD">Canadian Dollar (CAD)</option>
    <option value="CHF">Swiss Franc (CHF)</option>
    <option value="SEK">Swedish Krona (SEK)</option>
    <option value="NZD">New Zealand Dollar (NZD)</option>
  </select>
</div>

<div class="amount">
  <label for="amount">Amount:</label>
  <input type="text" bind:value={amountInput} on:input={handleInput} >
</div>

<div class="result">
  <label for="result">Result:</label>
  <input
    type="text"
    id="resultField"
    bind:value={result}
    on:input={handleInput}
    readonly
  />
</div>