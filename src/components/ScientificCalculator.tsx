import React, { useState } from 'react';
import { ArrowLeft, X, Plus, Minus, Divide, Equal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ScientificCalculator = () => {
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

  const backspace = () => {
    if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
      setDisplay('0');
    } else {
      setDisplay(display.substring(0, display.length - 1));
    }
  };

  const performFunction = (fn: (x: number) => number) => {
    try {
      const result = fn(parseFloat(display));
      setDisplay(String(result));
      setWaitingForOperand(true);
    } catch (e) {
      setDisplay('Error');
      setWaitingForOperand(true);
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

      <div className="grid grid-cols-5 gap-2 mt-4">
        <button className="special-button" onClick={() => performFunction(x => Math.sin(x * Math.PI / 180))}>sin</button>
        <button className="special-button" onClick={() => performFunction(x => Math.cos(x * Math.PI / 180))}>cos</button>
        <button className="special-button" onClick={() => performFunction(x => Math.tan(x * Math.PI / 180))}>tan</button>
        <button className="special-button" onClick={() => performFunction(Math.log10)}>log</button>
        <button className="special-button" onClick={() => performFunction(Math.log)}>ln</button>

        <button className="special-button" onClick={() => performFunction(x => Math.asin(x) * 180 / Math.PI)}>sin⁻¹</button>
        <button className="special-button" onClick={() => performFunction(x => Math.acos(x) * 180 / Math.PI)}>cos⁻¹</button>
        <button className="special-button" onClick={() => performFunction(x => Math.atan(x) * 180 / Math.PI)}>tan⁻¹</button>
        <button className="special-button" onClick={() => performFunction(x => Math.pow(10, x))}>10ˣ</button>
        <button className="special-button" onClick={() => performFunction(x => Math.pow(Math.E, x))}>eˣ</button>

        <button className="special-button" onClick={() => performOperation('^')}>xʸ</button>
        <button className="special-button" onClick={() => performFunction(x => Math.sqrt(x))}>√x</button>
        <button className="special-button" onClick={() => performFunction(x => Math.pow(x, 2))}>x²</button>
        <button className="special-button" onClick={() => performFunction(x => Math.pow(x, 3))}>x³</button>
        <button className="special-button" onClick={() => setDisplay(String(Math.PI))}>π</button>

        <button className="number-button" onClick={() => inputDigit('7')}>7</button>
        <button className="number-button" onClick={() => inputDigit('8')}>8</button>
        <button className="number-button" onClick={() => inputDigit('9')}>9</button>
        <button className="special-button" onClick={clearAll}>AC</button>
        <button className="special-button" onClick={backspace}>
          <ArrowLeft size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('4')}>4</button>
        <button className="number-button" onClick={() => inputDigit('5')}>5</button>
        <button className="number-button" onClick={() => inputDigit('6')}>6</button>
        <button className="operator-button" onClick={() => performOperation('*')}>
          <X size={20} />
        </button>
        <button className="operator-button" onClick={() => performOperation('/')}>
          <Divide size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('1')}>1</button>
        <button className="number-button" onClick={() => inputDigit('2')}>2</button>
        <button className="number-button" onClick={() => inputDigit('3')}>3</button>
        <button className="operator-button" onClick={() => performOperation('+')}>
          <Plus size={20} />
        </button>
        <button className="operator-button" onClick={() => performOperation('-')}>
          <Minus size={20} />
        </button>

        <button className="number-button" onClick={() => inputDigit('0')}>0</button>
        <button className="number-button" onClick={inputDecimal}>.</button>
        <button 
          className="operator-button col-span-3" 
          onClick={handleEquals}
        >
          <Equal size={20} />
        </button>
      </div>
    </Card>
  );
};

export default ScientificCalculator;
