
import React from 'react';
import { Calculator, BookOpen, Star, LineChart, SquareRoot } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = ({
  currentTab,
  setCurrentTab
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md py-4">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Math 1-T Kalkulator</h1>
          <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-5 w-full sm:w-[500px] bg-white/20 backdrop-blur-sm">
            <TabsTrigger value="standard" className="text-sm sm:text-base text-white data-[state=active]:bg-white data-[state=active]:text-blue-700">
              <Calculator className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Standard</span>
            </TabsTrigger>
            <TabsTrigger value="functions" className="text-sm sm:text-base text-white data-[state=active]:bg-white data-[state=active]:text-blue-700">
              <SquareRoot className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Funksjoner</span>
            </TabsTrigger>
            <TabsTrigger value="graphs" className="text-sm sm:text-base text-white data-[state=active]:bg-white data-[state=active]:text-blue-700">
              <LineChart className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Graf</span>
            </TabsTrigger>
            <TabsTrigger value="formulas" className="text-sm sm:text-base text-white data-[state=active]:bg-white data-[state=active]:text-blue-700">
              <BookOpen className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Formler</span>
            </TabsTrigger>
            <TabsTrigger value="conversion" className="text-sm sm:text-base text-white data-[state=active]:bg-white data-[state=active]:text-blue-700">
              <Star className="h-4 w-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Enheter</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
