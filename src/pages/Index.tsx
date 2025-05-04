
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import StandardCalculator from '@/components/StandardCalculator';
import ScientificCalculator from '@/components/ScientificCalculator';
import GraphCalculator from '@/components/GraphCalculator';
import EnhancedFormulasReference from '@/components/EnhancedFormulasReference';
import UnitConverter from '@/components/UnitConverter';
import { BookOpen, Calculator, LineChart, Sigma, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('standard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContent, setFilteredContent] = useState<React.ReactNode | null>(null);

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

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    // Apply search filtering logic here if needed
    setFilteredContent(null); // Reset filtered content when not searching
  }, [searchTerm, currentTab]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 dark:text-white transition-colors duration-200">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} onSearch={handleSearch} />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
            {getTabIcon()}
            {currentTab === 'standard' && 'Standard Kalkulator'}
            {currentTab === 'functions' && 'Matematiske Funksjoner'}
            {currentTab === 'graphs' && 'Funksjonsgraf'}
            {currentTab === 'formulas' && 'Matematiske Formler'}
            {currentTab === 'conversion' && 'Enhetskonvertering'}
          </h2>

          {currentTab === 'formulas' && (
            <div className="mb-4 flex justify-center">
              <Link to="/problem-solver">
                <Button variant="outline" className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-800/30 dark:hover:bg-blue-700/40">
                  <Calculator className="mr-2 h-4 w-4" /> Gå til 1-T Eksamen Problemløser
                </Button>
              </Link>
            </div>
          )}

          <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            {searchTerm && filteredContent ? (
              filteredContent
            ) : (
              <>
                {currentTab === 'standard' && <StandardCalculator />}
                {currentTab === 'functions' && <ScientificCalculator />}
                {currentTab === 'graphs' && <GraphCalculator />}
                {currentTab === 'formulas' && <EnhancedFormulasReference />}
                {currentTab === 'conversion' && <UnitConverter />}
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 dark:from-gray-800 dark:to-indigo-900 py-4 border-t border-blue-800 dark:border-gray-700">
        <div className="container">
          <p className="text-center text-white text-sm">
            Math 1-T Kalkulator © {new Date().getFullYear()} | Laget for norsk videregående skole
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
