
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormulaSearchProps {
  onSearch: (term: string) => void;
  onCategoryFilter: (category: string | null) => void;
}

const FormulaSearch = ({ onSearch, onCategoryFilter }: FormulaSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { id: 'algebra', label: 'Algebra' },
    { id: 'geometry', label: 'Geometri' },
    { id: 'functions', label: 'Funksjoner' },
    { id: 'statistics', label: 'Statistikk' },
    { id: 'trigonometry', label: 'Trigonometri' }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryClick = (categoryId: string | null) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      onCategoryFilter(null);
    } else {
      setActiveCategory(categoryId);
      onCategoryFilter(categoryId);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Søk etter formler..."
          className="pl-10 pr-10"
          value={searchTerm}
          onChange={handleSearch}
        />
        {searchTerm && (
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={clearSearch}
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick(null)}
          className="text-xs"
        >
          Alle
        </Button>
        {categories.map(category => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleCategoryClick(category.id)}
            className="text-xs"
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FormulaSearch;
