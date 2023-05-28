import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import CurrencyInput from './CurrencyInput';
import CurrencyInput from '../currency_converter_input/currency_input';
import './currency_converter.css';

const CurrencyConverter = ({currencyApi}) => {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('KZT');
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.apilayer.com/fixer/latest?base=USD&apikey=${currencyApi}`)
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

 
  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

 function format(number) {
    return number.toFixed(2);
  }
  
  function handleAmount1Change(amount1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div className="currency-body">
      <h1>Currency exchange rate</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
};

export default CurrencyConverter;
