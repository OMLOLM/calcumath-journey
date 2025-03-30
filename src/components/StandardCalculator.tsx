import React, { useState } from 'react';
import { ArrowLeft, X, Plus, Minus, Divide, Equal } from 'lucide-react';
import { Card } from '@/components/ui/card';

const StandardCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const inputPercent = () => {
    const value = parseFloat(display) / 100;
    setDisplay(String(value));
  };

  const toggleSign = () => {
    const value = parseFloat(display) * -1;
    setDisplay(String(value));
  };

  const backspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      setStoredValue(inputValue);
    } else if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setStoredValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      case '^':
        return Math.pow(firstOperand, secondOperand);
      default:
        return secondOperand;
    }
  };

  const handleEquals = () => {
    const inputValue = parseFloat(display);

    if (storedValue === null) {
      return;
    }

    if (operator) {
      const result = calculate(storedValue, inputValue, operator);
      setDisplay(String(result));
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  return (
    <Card className="p-4 shadow-lg bg-gray-50 max-w-md w-full mx-auto animate-fade-in">
      <div className="calc-display h-24 flex flex-col justify-end">
        <div className="text-gray-500 text-sm mb-1">
          {storedValue !== null ? `${storedValue} ${operator}` : ''}
        </div>
        <div className="text-3xl font-bold truncate">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        <button className="special-button" onClick={clearAll}>AC</button>
        <button className="special-button" onClick={toggleSign}>+/-</button>
        <button className="special-button" onClick={inputPercent}>%</button>
        <button className="operator-button" onClick={() => performOperation('/')}>
          <Divide size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('7')}>7</button>
        <button className="number-button" onClick={() => inputDigit('8')}>8</button>
        <button className="number-button" onClick={() => inputDigit('9')}>9</button>
        <button className="operator-button" onClick={() => performOperation('*')}>
          <X size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('4')}>4</button>
        <button className="number-button" onClick={() => inputDigit('5')}>5</button>
        <button className="number-button" onClick={() => inputDigit('6')}>6</button>
        <button className="operator-button" onClick={() => performOperation('-')}>
          <Minus size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('1')}>1</button>
        <button className="number-button" onClick={() => inputDigit('2')}>2</button>
        <button className="number-button" onClick={() => inputDigit('3')}>3</button>
        <button className="operator-button" onClick={() => performOperation('+')}>
          <Plus size={20} />
        </button>

        <button className="special-button" onClick={backspace}>
          <ArrowLeft size={20} />
        </button>
        <button className="number-button" onClick={() => inputDigit('0')}>0</button>
        <button className="number-button" onClick={inputDecimal}>.</button>
        <button className="operator-button" onClick={handleEquals}>
          <Equal size={20} />
        </button>
      </div>
    </Card>
  );
};

export default StandardCalculator;
