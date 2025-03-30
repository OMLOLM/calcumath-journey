
import React from 'react';
import { Calculator } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Header = ({
  currentTab,
  setCurrentTab
}: {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <header className="w-full bg-white shadow-sm py-4">
      <div className="container flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-math-blue" />
          <h1 className="text-xl font-bold text-gray-800">Math 1-T Kalkulator</h1>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 w-full sm:w-[400px]">
            <TabsTrigger value="standard" className="text-sm sm:text-base">Standard</TabsTrigger>
            <TabsTrigger value="functions" className="text-sm sm:text-base">Funksjoner</TabsTrigger>
            <TabsTrigger value="graphs" className="text-sm sm:text-base">Graf</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </header>
  );
};

export default Header;
