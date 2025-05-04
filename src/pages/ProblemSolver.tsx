
import React from 'react';
import Header from '@/components/Header';
import ExamProblemSolver from '@/components/ExamProblemSolver';
import EnhancedFormulasReference from '@/components/EnhancedFormulasReference';
import { BookOpen, Calculator } from 'lucide-react';

const ProblemSolver = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 dark:text-white transition-colors duration-200">
      <Header currentTab="formulas" setCurrentTab={() => {}} onSearch={() => {}} />
      
      <main className="flex-1 container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
            <Calculator className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            1-T Eksamen Problemløser
          </h2>

          <div className="p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <ExamProblemSolver />
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center gap-2">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                Formelreferanse
              </h3>
              <EnhancedFormulasReference />
            </div>
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

export default ProblemSolver;
