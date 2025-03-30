
import React, { useState } from 'react';
import { ArrowLeft, X, Plus, Minus, Divide, Equal, Calculator, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from "sonner";

const StandardCalculator = () => {
  const [display, setDisplay] = useState('0');
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<string[]>([]);

  const clearDisplay = () => {
    setDisplay('0');
    setWaitingForOperand(false);
  };

  const clearAll = () => {
    setDisplay('0');
    setStoredValue(null);
    setOperator(null);
    setWaitingForOperand(false);
    toast("Kalkulator nullstilt", {
      icon: <Calculator size={16} />,
    });
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
      
      // Add to history
      const historyItem = `${storedValue} ${operator} ${inputValue} = ${result}`;
      setCalculationHistory(prev => [historyItem, ...prev.slice(0, 9)]);
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
      
      // Add to history
      const historyItem = `${storedValue} ${operator} ${inputValue} = ${result}`;
      setCalculationHistory(prev => [historyItem, ...prev.slice(0, 9)]);
      
      setStoredValue(null);
      setOperator(null);
      setWaitingForOperand(true);
    }
  };

  const toggleHistory = () => {
    setHistoryVisible(!historyVisible);
  };

  const useHistoryItem = (item: string) => {
    const result = item.split(' = ')[1];
    setDisplay(result);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Card className="p-4 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 max-w-md w-full mx-auto animate-fade-in rounded-xl">
        <div className="calc-display h-24 flex flex-col justify-end bg-white/80 backdrop-blur-sm rounded-lg shadow-inner">
          <div className="text-gray-500 text-sm mb-1 px-4 pt-3">
            {storedValue !== null ? `${storedValue} ${operator}` : ''}
          </div>
          <div className="text-3xl font-bold truncate px-4 pb-3">{display}</div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          <button className="special-button bg-gradient-to-br from-red-400 to-red-500 text-white" onClick={clearAll}>AC</button>
          <button className="special-button bg-gradient-to-br from-amber-400 to-amber-500 text-white" onClick={toggleSign}>+/-</button>
          <button className="special-button bg-gradient-to-br from-amber-400 to-amber-500 text-white" onClick={inputPercent}>%</button>
          <button className="operator-button bg-gradient-to-br from-math-blue to-indigo-600" onClick={() => performOperation('/')}>
            <Divide size={20} />
          </button>

          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('7')}>7</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('8')}>8</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('9')}>9</button>
          <button className="operator-button bg-gradient-to-br from-math-blue to-indigo-600" onClick={() => performOperation('*')}>
            <X size={20} />
          </button>

          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('4')}>4</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('5')}>5</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('6')}>6</button>
          <button className="operator-button bg-gradient-to-br from-math-blue to-indigo-600" onClick={() => performOperation('-')}>
            <Minus size={20} />
          </button>

          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('1')}>1</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('2')}>2</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('3')}>3</button>
          <button className="operator-button bg-gradient-to-br from-math-blue to-indigo-600" onClick={() => performOperation('+')}>
            <Plus size={20} />
          </button>

          <button className="special-button bg-gradient-to-br from-gray-400 to-gray-500 text-white" onClick={backspace}>
            <ArrowLeft size={20} />
          </button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={() => inputDigit('0')}>0</button>
          <button className="number-button bg-gradient-to-b from-white to-gray-100" onClick={inputDecimal}>.</button>
          <button className="operator-button bg-gradient-to-br from-green-500 to-teal-600" onClick={handleEquals}>
            <Equal size={20} />
          </button>
        </div>

        <button 
          className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:opacity-90 transition-all"
          onClick={toggleHistory}
        >
          <Calculator size={16} />
          {historyVisible ? 'Skjul historikk' : 'Vis historikk'}
          <Sparkles size={16} />
        </button>
      </Card>

      {historyVisible && (
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg max-w-md w-full mx-auto rounded-xl">
          <h3 className="text-lg font-bold mb-3 text-gray-700">Utregningshistorikk</h3>
          {calculationHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Ingen utregninger ennå</p>
          ) : (
            <ul className="space-y-2">
              {calculationHistory.map((item, index) => (
                <li 
                  key={index} 
                  className="bg-white/80 p-3 rounded-lg shadow-sm cursor-pointer hover:bg-blue-50 transition-colors"
                  onClick={() => useHistoryItem(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </div>
  );
};

export default StandardCalculator;
