import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, BookOpen, Star, LineChart, 
  Sigma, Circle, ArrowRight, X, Plus, Minus, Divide, Equal 
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface EnhancedFormulasReferenceProps {
  onSelectFormula?: (formula: string) => void;
}

const EnhancedFormulasReference = ({ onSelectFormula }: EnhancedFormulasReferenceProps) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/40 dark:to-purple-950/30 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-blue-200 flex items-center justify-center gap-2">
        <BookOpen className="h-5 w-5" /> Matematiske Formler for 1-T
      </h2>
      
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
          <FormulaCard
            title="Kvadratiske Uttrykk"
            icon={<X className="h-4 w-4" />}
            formulas={[
              { 
                id: "kvadratsetning1", 
                name: "Kvadratsetninger", 
                formula: "(a + b)² = a² + 2ab + b²",
                hasCalculator: true
              },
              { 
                id: "kvadratsetning2", 
                name: "", 
                formula: "(a - b)² = a² - 2ab + b²",
                hasCalculator: true
              },
              { 
                id: "kvadratsetning3", 
                name: "", 
                formula: "(a + b)(a - b) = a² - b²",
                hasCalculator: true
              },
              { 
                id: "abc", 
                name: "ABC-formelen", 
                formula: "ax² + bx + c = 0 → x = (-b ± √(b² - 4ac)) / 2a",
                hasCalculator: false
              },
            ]}
            explanation="Kvadratiske uttrykk brukes for å løse andre grads likninger og er viktige i mange matematiske problemer."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Potenser og Logaritmer"
            icon={<ArrowRight className="h-4 w-4" />}
            formulas={[
              { id: "power1", name: "Potensregler", formula: "a^m · a^n = a^(m+n)" },
              { id: "power2", name: "", formula: "a^m / a^n = a^(m-n)" },
              { id: "power3", name: "", formula: "(a^m)^n = a^(m·n)" },
              { id: "power4", name: "", formula: "(a·b)^n = a^n · b^n" },
              { id: "log1", name: "Logaritmeregler", formula: "log(a·b) = log(a) + log(b)" },
              { id: "log2", name: "", formula: "log(a/b) = log(a) - log(b)" },
              { id: "log3", name: "", formula: "log(a^n) = n·log(a)" },
              { id: "log4", name: "", formula: "a^(log_a(x)) = x" },
            ]}
            explanation="Potenser og logaritmer er inverse operasjoner og er essensielle for å løse eksponentiallikninger."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Algebraiske Identiteter"
            icon={<Equal className="h-4 w-4" />}
            formulas={[
              { id: "factor1", name: "Faktorisering", formula: "a² - b² = (a+b)(a-b)" },
              { id: "factor2", name: "", formula: "a³ - b³ = (a-b)(a² + ab + b²)" },
              { id: "factor3", name: "", formula: "a³ + b³ = (a+b)(a² - ab + b²)" },
            ]}
            explanation="Algebraiske identiteter er nyttige ved faktorisering og forenkling av uttrykk."
            onSelectFormula={onSelectFormula}
          />
        </TabsContent>

        <TabsContent value="geometry" className="space-y-4">
          <FormulaCard
            title="Arealer"
            icon={<Calculator className="h-4 w-4" />}
            formulas={[
              { id: "rect-area", name: "Rektangel", formula: "A = l · b" },
              { 
                id: "triangle-area", 
                name: "Trekant", 
                formula: "A = (g · h) / 2",
                hasCalculator: true
              },
              { 
                id: "circle-area", 
                name: "Sirkel", 
                formula: "A = π · r²",
                hasCalculator: true
              },
              { id: "trapezoid", name: "Trapes", formula: "A = ((a + c) / 2) · h" },
              { id: "parallelogram", name: "Parallellogram", formula: "A = g · h" },
              { id: "polygon", name: "Regulær n-kant", formula: "A = (n/4) · s² · cot(π/n)" },
            ]}
            explanation="Arealformler brukes til å beregne flateareal for ulike geometriske figurer."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Volum"
            icon={<Calculator className="h-4 w-4" />}
            formulas={[
              { id: "cube", name: "Kube", formula: "V = a³" },
              { id: "rect-prism", name: "Rektangulært prisme", formula: "V = l · b · h" },
              { id: "cylinder", name: "Sylinder", formula: "V = π · r² · h" },
              { id: "cone", name: "Kjegle", formula: "V = (π · r² · h) / 3" },
              { id: "sphere", name: "Kule", formula: "V = (4 · π · r³) / 3" },
              { id: "pyramid", name: "Pyramide", formula: "V = (1/3) · A · h" },
            ]}
            explanation="Volumformler brukes til å beregne rominnhold for ulike 3D geometriske figurer."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Trigonometri"
            icon={<Calculator className="h-4 w-4" />}
            formulas={[
              { 
                id: "pytagoras", 
                name: "Pytagoras", 
                formula: "a² + b² = c²",
                hasCalculator: true
              },
              { 
                id: "sin", 
                name: "sin", 
                formula: "sin(θ) = motstående / hypotenus",
                hasCalculator: true
              },
              { 
                id: "cos", 
                name: "cos", 
                formula: "cos(θ) = hosliggende / hypotenus",
                hasCalculator: true
              },
              { 
                id: "tan", 
                name: "tan", 
                formula: "tan(θ) = motstående / hosliggende",
                hasCalculator: true
              },
              { id: "sinlaw", name: "Sinussetningen", formula: "a/sin(A) = b/sin(B) = c/sin(C)" },
              { id: "coslaw", name: "Cosinussetningen", formula: "c² = a² + b² - 2ab·cos(C)" },
            ]}
            explanation="Trigonometri brukes til å beregne lengder og vinkler i geometriske figurer, spesielt triangler."
            onSelectFormula={onSelectFormula}
          />
        </TabsContent>

        <TabsContent value="functions" className="space-y-4">
          <FormulaCard
            title="Lineære Funksjoner"
            icon={<ArrowRight className="h-4 w-4" />}
            formulas={[
              { id: "linear", name: "Lineær funksjon", formula: "f(x) = ax + b" },
              { id: "slope", name: "Stigning", formula: "a = (y₂ - y₁) / (x₂ - x₁)" },
              { id: "interpolation", name: "Lineær interpolasjon", formula: "y = y₁ + (x - x₁)(y₂ - y₁)/(x₂ - x₁)" },
            ]}
            explanation="Lineære funksjoner representerer rett linje og har konstant stigningstall."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Andre Funksjoner"
            icon={<LineChart className="h-4 w-4" />}
            formulas={[
              { id: "quadratic", name: "Andregradsfunksjon", formula: "f(x) = ax² + bx + c" },
              { id: "exponential", name: "Eksponentialfunksjon", formula: "f(x) = b · a^x" },
              { id: "power", name: "Potensfunksjon", formula: "f(x) = x^n" },
              { id: "polynomial", name: "Polynomfunksjon", formula: "f(x) = anx^n + ... + a₁x + a₀" },
              { id: "logarithmic", name: "Logaritmefunksjon", formula: "f(x) = log_a(x)" },
            ]}
            explanation="Ulike typer funksjoner brukes til å modellere forskjellige matematiske sammenhenger."
            onSelectFormula={onSelectFormula}
          />
          <FormulaCard
            title="Derivasjon"
            icon={<ArrowRight className="h-4 w-4" />}
            formulas={[
              { id: "deriv1", name: "Konstant", formula: "d/dx(c) = 0" },
              { id: "deriv2", name: "Potens", formula: "d/dx(x^n) = n·x^(n-1)" },
              { id: "deriv3", name: "Sum", formula: "d/dx(f(x) + g(x)) = f'(x) + g'(x)" },
              { id: "deriv4", name: "Produkt", formula: "d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)" },
              { id: "deriv5", name: "Kvotient", formula: "d/dx(f(x)/g(x)) = (f'(x)·g(x) - f(x)·g'(x))/g(x)²" },
              { id: "deriv6", name: "Kjerneregel", formula: "d/dx(f(g(x))) = f'(g(x))·g'(x)" },
              { id: "deriv7", name: "Eksponentialfunksjon", formula: "d/dx(e^x) = e^x" },
              { id: "deriv8", name: "Logaritme", formula: "d/dx(ln(x)) = 1/x" },
            ]}
            explanation="Derivasjon brukes til å finne stigningstallet til en kurve i et punkt, og er et grunnleggende konsept i matematisk analyse."
            onSelectFormula={onSelectFormula}
          />
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <h3 className="font-bold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
          <Star className="h-4 w-4 mr-2 text-yellow-500" /> Visste du at:
        </h3>
        <p className="text-blue-700 dark:text-blue-300">
          Math 1-T er et teoretisk matematikkfag som legger grunnlaget for videre studier i realfag. 
          Gode basiskunnskaper i disse formlene er essensielt for suksess i matematikk på høyere nivå.
        </p>
      </div>
    </Card>
  );
};

interface FormulaItem {
  id: string;
  name: string;
  formula: string;
  hasCalculator?: boolean;
}

interface FormulaProps {
  title: string;
  icon?: React.ReactNode;
  formulas: FormulaItem[];
  explanation: string;
  onSelectFormula?: (formula: string) => void;
}

const FormulaCard = ({ title, icon, formulas, explanation, onSelectFormula }: FormulaProps) => {
  return (
    <div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
      <h3 className="text-lg font-bold text-blue-900 dark:text-blue-200 mb-3 flex items-center gap-2">
        {icon} {title}
        
        <Dialog>
          <DialogTrigger asChild>
            <button className="ml-auto bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 text-blue-800 dark:text-blue-200 text-xs py-1 px-2 rounded-md transition-colors">
              Vis mer
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">{icon} {title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{explanation}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Navn</TableHead>
                    <TableHead>Formel</TableHead>
                    {onSelectFormula && <TableHead className="w-24">Handling</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formulas.map((item, index) => (
                    <TableRow key={item.id || index}>
                      <TableCell className="font-medium">{item.name || "-"}</TableCell>
                      <TableCell className="formula-text bg-blue-50/70 dark:bg-blue-900/20">{item.formula}</TableCell>
                      {onSelectFormula && (
                        <TableCell>
                          {item.hasCalculator && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => onSelectFormula(item.id)}
                              className="w-full"
                            >
                              <Calculator className="h-3 w-3 mr-1" /> Beregn
                            </Button>
                          )}
                        </TableCell>
                      )}
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
          <HoverCard key={item.id || index} openDelay={300}>
            <HoverCardTrigger asChild>
              <div className="grid grid-cols-5 gap-2 cursor-help">
                {item.name && (
                  <span className="col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300">{item.name}:</span>
                )}
                <div className={`${item.name ? 'col-span-3' : 'col-span-5'} bg-blue-50/70 dark:bg-blue-900/20 p-2 rounded formula-text flex items-center justify-center`}>
                  {item.formula}
                  {item.hasCalculator && onSelectFormula && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFormula(item.id);
                      }}
                      className="ml-2 h-6 w-6 p-0"
                    >
                      <Calculator className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="bg-white dark:bg-gray-800 p-4 shadow-lg border border-blue-100 dark:border-blue-900">
              <p className="text-sm text-gray-600 dark:text-gray-300">{explanation}</p>
              {item.hasCalculator && onSelectFormula && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSelectFormula(item.id)}
                  className="mt-3 w-full"
                >
                  <Calculator className="h-3 w-3 mr-1" /> Bruk kalkulator
                </Button>
              )}
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default EnhancedFormulasReference;
