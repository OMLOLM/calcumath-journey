
import React, { useState } from 'react';
import Header from '@/components/Header';
import StandardCalculator from '@/components/StandardCalculator';
import ScientificCalculator from '@/components/ScientificCalculator';
import GraphCalculator from '@/components/GraphCalculator';
import FormulasReference from '@/components/FormulasReference';
import UnitConverter from '@/components/UnitConverter';
import { BookOpen, Calculator, LineChart, Sigma, Star, Moon, Sun } from 'lucide-react';
import { ThemeProvider } from '@/hooks/useTheme';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('standard');

  const getTabIcon = () => {
    switch (currentTab) {
      case 'standard': return <Calculator className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />;
      case 'functions': return <Sigma className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />;
      case 'graphs': return <LineChart className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />;
      case 'formulas': return <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />;
      case 'conversion': return <Star className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />;
      default: return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 transition-colors duration-300">
        <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
        
        <main className="flex-1 container py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
              {getTabIcon()}
              {currentTab === 'standard' && 'Standard Kalkulator'}
              {currentTab === 'functions' && 'Matematiske Funksjoner'}
              {currentTab === 'graphs' && 'Funksjonsgraf'}
              {currentTab === 'formulas' && 'Matematiske Formler'}
              {currentTab === 'conversion' && 'Enhetskonvertering'}
            </h2>

            <div className="p-4">
              {currentTab === 'standard' && <StandardCalculator />}
              {currentTab === 'functions' && <ScientificCalculator />}
              {currentTab === 'graphs' && <GraphCalculator />}
              {currentTab === 'formulas' && <FormulasReference />}
              {currentTab === 'conversion' && <UnitConverter />}
            </div>
          </div>
        </main>

        <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 py-4 border-t border-blue-800 dark:border-blue-950">
          <div className="container flex justify-between items-center">
            <p className="text-center text-white text-sm">
              Math 1-T Kalkulator © {new Date().getFullYear()} | Laget for norsk videregående skole
            </p>
            <ThemeToggle />
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
