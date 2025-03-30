
import React, { useState } from 'react';
import Header from '@/components/Header';
import StandardCalculator from '@/components/StandardCalculator';
import ScientificCalculator from '@/components/ScientificCalculator';
import GraphCalculator from '@/components/GraphCalculator';

const Index = () => {
  const [currentTab, setCurrentTab] = useState('standard');

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            {currentTab === 'standard' && 'Standard Kalkulator'}
            {currentTab === 'functions' && 'Matematiske Funksjoner'}
            {currentTab === 'graphs' && 'Funksjonsgraf'}
          </h2>

          <div className="p-4">
            {currentTab === 'standard' && <StandardCalculator />}
            {currentTab === 'functions' && <ScientificCalculator />}
            {currentTab === 'graphs' && <GraphCalculator />}
          </div>
        </div>
      </main>

      <footer className="bg-white py-4 border-t">
        <div className="container">
          <p className="text-center text-gray-500 text-sm">
            Math 1-T Kalkulator © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
