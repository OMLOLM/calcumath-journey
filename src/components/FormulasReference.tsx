import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, BookOpen, Star, LineChart, 
  Sigma, Circle, ArrowRight, X, Plus, Minus, Divide, Equal, Search
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import SearchBar from './SearchBar';

const FormulasReference = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Formula categories and their data
  const algebraFormulas = [
    {
      title: "Kvadratiske Uttrykk",
      icon: <X className="h-4 w-4" />,
      formulas: [
        { name: "Kvadratsetninger", formula: "(a + b)² = a² + 2ab + b²" },
        { name: "", formula: "(a - b)² = a² - 2ab + b²" },
        { name: "", formula: "(a + b)(a - b) = a² - b²" },
        { name: "ABC-formelen", formula: "ax² + bx + c = 0 → x = (-b ± √(b² - 4ac)) / 2a" },
      ],
      explanation: "Kvadratiske uttrykk brukes for å løse andre grads likninger og er viktige i mange matematiske problemer."
    },
    {
      title: "Potenser og Logaritmer",
      icon: <ArrowRight className="h-4 w-4" />,
      formulas: [
        { name: "Potensregler", formula: "a^m · a^n = a^(m+n)" },
        { name: "", formula: "a^m / a^n = a^(m-n)" },
        { name: "", formula: "(a^m)^n = a^(m·n)" },
        { name: "", formula: "(a·b)^n = a^n · b^n" },
        { name: "Logaritmeregler", formula: "log(a·b) = log(a) + log(b)" },
        { name: "", formula: "log(a/b) = log(a) - log(b)" },
        { name: "", formula: "log(a^n) = n·log(a)" },
        { name: "", formula: "a^(log_a(x)) = x" },
      ],
      explanation: "Potenser og logaritmer er inverse operasjoner og er essensielle for å løse eksponentiallikninger."
    },
    {
      title: "Algebraiske Identiteter",
      icon: <Equal className="h-4 w-4" />,
      formulas: [
        { name: "Faktorisering", formula: "a² - b² = (a+b)(a-b)" },
        { name: "", formula: "a³ - b³ = (a-b)(a² + ab + b²)" },
        { name: "", formula: "a³ + b³ = (a+b)(a² - ab + b²)" },
      ],
      explanation: "Algebraiske identiteter er nyttige ved faktorisering og forenkling av uttrykk."
    },
  ];

  const geometryFormulas = [
    {
      title: "Arealer",
      icon: <Calculator className="h-4 w-4" />,
      formulas: [
        { name: "Rektangel", formula: "A = l · b" },
        { name: "Trekant", formula: "A = (g · h) / 2" },
        { name: "Sirkel", formula: "A = π · r²" },
        { name: "Trapes", formula: "A = ((a + c) / 2) · h" },
        { name: "Parallellogram", formula: "A = g · h" },
        { name: "Regulær n-kant", formula: "A = (n/4) · s² · cot(π/n)" },
      ],
      explanation: "Arealformler brukes til å beregne flateareal for ulike geometriske figurer."
    },
    {
      title: "Volum",
      icon: <Calculator className="h-4 w-4" />,
      formulas: [
        { name: "Kube", formula: "V = a³" },
        { name: "Rektangulært prisme", formula: "V = l · b · h" },
        { name: "Sylinder", formula: "V = π · r² · h" },
        { name: "Kjegle", formula: "V = (π · r² · h) / 3" },
        { name: "Kule", formula: "V = (4 · π · r³) / 3" },
        { name: "Pyramide", formula: "V = (1/3) · A · h" },
      ],
      explanation: "Volumformler brukes til å beregne rominnhold for ulike 3D geometriske figurer."
    },
    {
      title: "Trigonometri",
      icon: <Calculator className="h-4 w-4" />,
      formulas: [
        { name: "Pytagoras", formula: "a² + b² = c²" },
        { name: "sin", formula: "sin(θ) = motstående / hypotenus" },
        { name: "cos", formula: "cos(θ) = hosliggende / hypotenus" },
        { name: "tan", formula: "tan(θ) = motstående / hosliggende" },
        { name: "Sinussetningen", formula: "a/sin(A) = b/sin(B) = c/sin(C)" },
        { name: "Cosinussetningen", formula: "c² = a² + b² - 2ab·cos(C)" },
      ],
      explanation: "Trigonometri brukes til å beregne lengder og vinkler i geometriske figurer, spesielt triangler."
    },
  ];

  const functionsFormulas = [
    {
      title: "Lineære Funksjoner",
      icon: <ArrowRight className="h-4 w-4" />,
      formulas: [
        { name: "Lineær funksjon", formula: "f(x) = ax + b" },
        { name: "Stigning", formula: "a = (y₂ - y₁) / (x₂ - x₁)" },
        { name: "Lineær interpolasjon", formula: "y = y₁ + (x - x₁)(y₂ - y₁)/(x₂ - x₁)" },
      ],
      explanation: "Lineære funksjoner representerer rett linje og har konstant stigningstall."
    },
    {
      title: "Andre Funksjoner",
      icon: <LineChart className="h-4 w-4" />,
      formulas: [
        { name: "Andregradsfunksjon", formula: "f(x) = ax² + bx + c" },
        { name: "Eksponentialfunksjon", formula: "f(x) = b · a^x" },
        { name: "Potensfunksjon", formula: "f(x) = x^n" },
        { name: "Polynomfunksjon", formula: "f(x) = anx^n + ... + a₁x + a₀" },
        { name: "Logaritmefunksjon", formula: "f(x) = log_a(x)" },
      ],
      explanation: "Ulike typer funksjoner brukes til å modellere forskjellige matematiske sammenhenger."
    },
    {
      title: "Derivasjon",
      icon: <ArrowRight className="h-4 w-4" />,
      formulas: [
        { name: "Konstant", formula: "d/dx(c) = 0" },
        { name: "Potens", formula: "d/dx(x^n) = n·x^(n-1)" },
        { name: "Sum", formula: "d/dx(f(x) + g(x)) = f'(x) + g'(x)" },
        { name: "Produkt", formula: "d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)" },
        { name: "Kvotient", formula: "d/dx(f(x)/g(x)) = (f'(x)·g(x) - f(x)·g'(x))/g(x)²" },
        { name: "Kjerneregel", formula: "d/dx(f(g(x))) = f'(g(x))·g'(x)" },
        { name: "Eksponentialfunksjon", formula: "d/dx(e^x) = e^x" },
        { name: "Logaritme", formula: "d/dx(ln(x)) = 1/x" },
      ],
      explanation: "Derivasjon brukes til å finne stigningstallet til en kurve i et punkt, og er et grunnleggende konsept i matematisk analyse."
    },
  ];

  // Function to filter formulas based on search term
  const filterFormulas = (formulaCards: any[]) => {
    if (!searchTerm) return formulaCards;
    
    return formulaCards.filter(card => {
      // Search in title
      if (card.title.toLowerCase().includes(searchTerm.toLowerCase())) return true;
      
      // Search in formulas
      return card.formulas.some((f: { name: string; formula: string }) => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        f.formula.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  // Apply filters
  const filteredAlgebra = useMemo(() => filterFormulas(algebraFormulas), [searchTerm]);
  const filteredGeometry = useMemo(() => filterFormulas(geometryFormulas), [searchTerm]);
  const filteredFunctions = useMemo(() => filterFormulas(functionsFormulas), [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 flex items-center justify-center gap-2">
        <BookOpen className="h-5 w-5" /> Matematiske Formler for 1-T
      </h2>

      <SearchBar onSearch={handleSearch} placeholder="Søk etter formler..." />
      
      <Tabs defaultValue="algebra" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger 
            value="algebra" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            onClick={() => setActiveTopic(null)}
          >
            <Sigma className="h-4 w-4 mr-2" />
            Algebra
          </TabsTrigger>
          <TabsTrigger 
            value="geometry" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            onClick={() => setActiveTopic(null)}
          >
            <Circle className="h-4 w-4 mr-2" />
            Geometri
          </TabsTrigger>
          <TabsTrigger 
            value="functions" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            onClick={() => setActiveTopic(null)}
          >
            <LineChart className="h-4 w-4 mr-2" />
            Funksjoner
          </TabsTrigger>
        </TabsList>

        <TabsContent value="algebra" className="space-y-4">
          {filteredAlgebra.length > 0 ? (
            filteredAlgebra.map((formula, index) => (
              <FormulaCard
                key={`algebra-${index}`}
                title={formula.title}
                icon={formula.icon}
                formulas={formula.formulas}
                explanation={formula.explanation}
              />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">Ingen formler funnet for søket ditt.</p>
          )}
        </TabsContent>

        <TabsContent value="geometry" className="space-y-4">
          {filteredGeometry.length > 0 ? (
            filteredGeometry.map((formula, index) => (
              <FormulaCard
                key={`geometry-${index}`}
                title={formula.title}
                icon={formula.icon}
                formulas={formula.formulas}
                explanation={formula.explanation}
              />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">Ingen formler funnet for søket ditt.</p>
          )}
        </TabsContent>

        <TabsContent value="functions" className="space-y-4">
          {filteredFunctions.length > 0 ? (
            filteredFunctions.map((formula, index) => (
              <FormulaCard
                key={`functions-${index}`}
                title={formula.title}
                icon={formula.icon}
                formulas={formula.formulas}
                explanation={formula.explanation}
              />
            ))
          ) : (
            <p className="text-center py-8 text-gray-500">Ingen formler funnet for søket ditt.</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center">
          <Star className="h-4 w-4 mr-2 text-yellow-500" /> Visste du at:
        </h3>
        <p className="text-blue-700">
          Math 1-T er et teoretisk matematikkfag som legger grunnlaget for videre studier i realfag. 
          Gode basiskunnskaper i disse formlene er essensielt for suksess i matematikk på høyere nivå.
        </p>
      </div>
    </Card>
  );
};

// Keep the FormulaCard component the same
interface FormulaProps {
  title: string;
  icon?: React.ReactNode;
  formulas: { name: string; formula: string }[];
  explanation: string;
}

const FormulaCard = ({ title, icon, formulas, explanation }: FormulaProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
        {icon} {title}
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="ml-auto bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs py-1 px-2 rounded-md transition-colors">
              Vis mer
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">{icon} {title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-gray-700">{explanation}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Formel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formulas.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.name || "-"}</TableCell>
                      <TableCell className="font-mono bg-blue-50/70">{item.formula}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      </h3>
      
      <div className="space-y-2">
        {formulas.map((item, index) => (
          <HoverCard key={index} openDelay={300}>
            <HoverCardTrigger asChild>
              <div className="grid grid-cols-5 gap-2 cursor-help">
                {item.name && (
                  <span className="col-span-2 text-sm font-medium text-gray-700">{item.name}:</span>
                )}
                <div className={`${item.name ? 'col-span-3' : 'col-span-5'} bg-blue-50/70 p-2 rounded font-mono text-sm flex items-center justify-center`}>
                  {item.formula}
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white p-4 shadow-lg border border-blue-100">
              <p className="text-sm text-gray-600">{explanation}</p>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default FormulasReference;
