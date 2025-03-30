
import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FormulasReference = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Matematiske Formler for 1-T</h2>
      
      <Tabs defaultValue="algebra" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="algebra" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Algebra</TabsTrigger>
          <TabsTrigger value="geometry" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Geometri</TabsTrigger>
          <TabsTrigger value="functions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Funksjoner</TabsTrigger>
        </TabsList>

        <TabsContent value="algebra" className="space-y-4">
          <FormulaCard
            title="Kvadratiske Uttrykk"
            formulas={[
              { name: "Kvadratsetninger", formula: "(a + b)² = a² + 2ab + b²" },
              { name: "", formula: "(a - b)² = a² - 2ab + b²" },
              { name: "", formula: "(a + b)(a - b) = a² - b²" },
              { name: "ABC-formelen", formula: "ax² + bx + c = 0 → x = (-b ± √(b² - 4ac)) / 2a" },
            ]}
          />
          <FormulaCard
            title="Potenser og Logaritmer"
            formulas={[
              { name: "Potensregler", formula: "a^m · a^n = a^(m+n)" },
              { name: "", formula: "a^m / a^n = a^(m-n)" },
              { name: "", formula: "(a^m)^n = a^(m·n)" },
              { name: "", formula: "(a·b)^n = a^n · b^n" },
              { name: "Logaritmeregler", formula: "log(a·b) = log(a) + log(b)" },
              { name: "", formula: "log(a/b) = log(a) - log(b)" },
              { name: "", formula: "log(a^n) = n·log(a)" },
            ]}
          />
        </TabsContent>

        <TabsContent value="geometry" className="space-y-4">
          <FormulaCard
            title="Arealer"
            formulas={[
              { name: "Rektangel", formula: "A = l · b" },
              { name: "Trekant", formula: "A = (g · h) / 2" },
              { name: "Sirkel", formula: "A = π · r²" },
              { name: "Trapes", formula: "A = ((a + c) / 2) · h" },
            ]}
          />
          <FormulaCard
            title="Volum"
            formulas={[
              { name: "Kube", formula: "V = a³" },
              { name: "Rektangulært prisme", formula: "V = l · b · h" },
              { name: "Sylinder", formula: "V = π · r² · h" },
              { name: "Kjegle", formula: "V = (π · r² · h) / 3" },
              { name: "Kule", formula: "V = (4 · π · r³) / 3" },
            ]}
          />
        </TabsContent>

        <TabsContent value="functions" className="space-y-4">
          <FormulaCard
            title="Lineære Funksjoner"
            formulas={[
              { name: "Lineær funksjon", formula: "f(x) = ax + b" },
              { name: "Stigning", formula: "a = (y₂ - y₁) / (x₂ - x₁)" },
            ]}
          />
          <FormulaCard
            title="Andre Funksjoner"
            formulas={[
              { name: "Andregradsfunksjon", formula: "f(x) = ax² + bx + c" },
              { name: "Eksponentialfunksjon", formula: "f(x) = b · a^x" },
              { name: "Potensfunksjon", formula: "f(x) = x^n" },
              { name: "Polynomfunksjon", formula: "f(x) = anx^n + ... + a₁x + a₀" },
            ]}
          />
          <FormulaCard
            title="Derivasjon"
            formulas={[
              { name: "Konstant", formula: "d/dx(c) = 0" },
              { name: "Potens", formula: "d/dx(x^n) = n·x^(n-1)" },
              { name: "Sum", formula: "d/dx(f(x) + g(x)) = f'(x) + g'(x)" },
              { name: "Produkt", formula: "d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)" },
            ]}
          />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const FormulaCard = ({ title, formulas }: { title: string, formulas: { name: string, formula: string }[] }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 shadow">
      <h3 className="text-lg font-bold text-blue-900 mb-3">{title}</h3>
      <div className="space-y-2">
        {formulas.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-2">
            {item.name && (
              <span className="col-span-2 text-sm font-medium text-gray-700">{item.name}:</span>
            )}
            <div className={`${item.name ? 'col-span-3' : 'col-span-5'} bg-blue-50/70 p-2 rounded font-mono text-sm flex items-center justify-center`}>
              {item.formula}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormulasReference;
