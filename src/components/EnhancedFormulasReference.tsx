
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, BookOpen, Star, LineChart, 
  Sigma, Circle, ArrowRight, X, Plus, Minus, Divide, Equal 
} from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import FormulaSearch from './FormulaSearch';

const EnhancedFormulasReference = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [filteredFormulas, setFilteredFormulas] = useState<any[]>([]);

  // All formulas organized by category
  const allFormulas = [
    {
      category: "algebra",
      title: "Algebraiske Formler",
      formulas: [
        { name: "Kvadratsetninger", formula: "(a + b)² = a² + 2ab + b²", explanation: "Kvadratet av en sum er lik kvadratet av første ledd pluss dobbelt produkt av leddene pluss kvadratet av andre ledd." },
        { name: "", formula: "(a - b)² = a² - 2ab + b²", explanation: "Kvadratet av en differanse er lik kvadratet av første ledd minus dobbelt produkt av leddene pluss kvadratet av andre ledd." },
        { name: "", formula: "(a + b)(a - b) = a² - b²", explanation: "Produktet av summen og differansen av to ledd er lik differansen av kvadratene av leddene." },
        { name: "Konjugatsetningen", formula: "(a + b)(c + d) = ac + ad + bc + bd", explanation: "Produktet av to binomer er summen av produktene av alle ledd." },
        { name: "Faktorisering", formula: "a² - b² = (a+b)(a-b)", explanation: "Differansen av to kvadrater kan faktoriseres som produktet av summen og differansen." },
        { name: "", formula: "a³ - b³ = (a-b)(a² + ab + b²)", explanation: "Differansen av to kuber kan faktoriseres som vist." },
        { name: "", formula: "a³ + b³ = (a+b)(a² - ab + b²)", explanation: "Summen av to kuber kan faktoriseres som vist." },
      ]
    },
    {
      category: "algebra",
      title: "Potensregler",
      formulas: [
        { name: "Produkt av potenser", formula: "a^m · a^n = a^(m+n)", explanation: "Ved multiplikasjon av potenser med samme grunntall, adderes eksponentene." },
        { name: "Kvotient av potenser", formula: "a^m / a^n = a^(m-n)", explanation: "Ved divisjon av potenser med samme grunntall, subtraheres eksponentene." },
        { name: "Potens av potens", formula: "(a^m)^n = a^(m·n)", explanation: "En potens opphøyd i en potens er lik grunntallet opphøyd i produktet av eksponentene." },
        { name: "Potens av produkt", formula: "(a·b)^n = a^n · b^n", explanation: "Et produkt opphøyd i en potens er lik produktet av faktorene opphøyd i potensen." },
        { name: "Potens av kvotient", formula: "(a/b)^n = a^n / b^n", explanation: "En brøk opphøyd i en potens er lik telleren opphøyd i potensen dividert med nevneren opphøyd i potensen." }
      ]
    },
    {
      category: "algebra",
      title: "Logaritmeregler",
      formulas: [
        { name: "Logaritme av produkt", formula: "log(a·b) = log(a) + log(b)", explanation: "Logaritmen til et produkt er lik summen av logaritmene til faktorene." },
        { name: "Logaritme av kvotient", formula: "log(a/b) = log(a) - log(b)", explanation: "Logaritmen til en kvotient er lik differansen mellom logaritmen til telleren og logaritmen til nevneren." },
        { name: "Logaritme av potens", formula: "log(a^n) = n·log(a)", explanation: "Logaritmen til en potens er lik eksponenten multiplisert med logaritmen til grunntallet." },
        { name: "Potens av logaritme", formula: "a^(log_a(x)) = x", explanation: "Hvis vi tar logaritmen av et tall og bruker resultatet som eksponent med samme base, får vi tilbake det opprinnelige tallet." }
      ]
    },
    {
      category: "geometry",
      title: "Areal- og omkrets-formler",
      formulas: [
        { name: "Rektangel (areal)", formula: "A = l · b", explanation: "Arealet av et rektangel er lengde ganger bredde." },
        { name: "Rektangel (omkrets)", formula: "O = 2(l + b)", explanation: "Omkretsen av et rektangel er to ganger summen av lengde og bredde." },
        { name: "Trekant (areal)", formula: "A = (g · h) / 2", explanation: "Arealet av en trekant er halvparten av produktet av grunnlinje og høyde." },
        { name: "Sirkel (areal)", formula: "A = π · r²", explanation: "Arealet av en sirkel er π ganger kvadratet av radiusen." },
        { name: "Sirkel (omkrets)", formula: "O = 2 · π · r", explanation: "Omkretsen av en sirkel er 2π ganger radiusen." },
        { name: "Trapes (areal)", formula: "A = ((a + c) / 2) · h", explanation: "Arealet av et trapes er gjennomsnittlig grunnlinje ganger høyde." },
        { name: "Parallellogram", formula: "A = g · h", explanation: "Arealet av et parallellogram er grunnlinje ganger høyde." }
      ]
    },
    {
      category: "geometry",
      title: "Volumformler",
      formulas: [
        { name: "Prisme", formula: "V = Ag · h", explanation: "Volumet av et prisme er grunnflatearealet ganger høyden." },
        { name: "Kube", formula: "V = a³", explanation: "Volumet av en kube er kubikken av sidelengden." },
        { name: "Rektangulært prisme", formula: "V = l · b · h", explanation: "Volumet av et rektangulært prisme er lengde ganger bredde ganger høyde." },
        { name: "Sylinder", formula: "V = π · r² · h", explanation: "Volumet av en sylinder er grunnflatearealet (π·r²) ganger høyden." },
        { name: "Kjegle", formula: "V = (π · r² · h) / 3", explanation: "Volumet av en kjegle er en tredjedel av sylindervolumet med samme grunnflate og høyde." },
        { name: "Kule", formula: "V = (4 · π · r³) / 3", explanation: "Volumet av en kule er 4/3 π ganger kubikken av radiusen." },
        { name: "Pyramide", formula: "V = (1/3) · A · h", explanation: "Volumet av en pyramide er en tredjedel av grunnflatearealet ganger høyden." }
      ]
    },
    {
      category: "trigonometry",
      title: "Trigonometriske Formler",
      formulas: [
        { name: "Pytagoras", formula: "a² + b² = c²", explanation: "I en rettvinklet trekant er kvadratet av hypotenusen lik summen av kvadratene av katetene." },
        { name: "sin", formula: "sin(θ) = motstående / hypotenus", explanation: "Sinus til en vinkel er forhold mellom motstående katet og hypotenusen." },
        { name: "cos", formula: "cos(θ) = hosliggende / hypotenus", explanation: "Cosinus til en vinkel er forhold mellom hosliggende katet og hypotenusen." },
        { name: "tan", formula: "tan(θ) = motstående / hosliggende", explanation: "Tangens til en vinkel er forhold mellom motstående og hosliggende katet." },
        { name: "cot", formula: "cot(θ) = 1 / tan(θ)", explanation: "Cotangens er det inverse av tangens." },
        { name: "Sinussetningen", formula: "a/sin(A) = b/sin(B) = c/sin(C)", explanation: "I en vilkårlig trekant er forholdet mellom lengden av en side og sinus til vinkelen overfor den samme for alle tre sider." },
        { name: "Cosinussetningen", formula: "c² = a² + b² - 2ab·cos(C)", explanation: "Kvadratet av lengden til en side er lik summen av kvadratene av de andre to sidene minus to ganger produktet av disse sidene og cosinus til vinkelen mellom dem." }
      ]
    },
    {
      category: "functions",
      title: "Derivasjonsregler",
      formulas: [
        { name: "Konstant", formula: "d/dx(c) = 0", explanation: "Derivasjonen av en konstant er alltid null." },
        { name: "Potens", formula: "d/dx(x^n) = n·x^(n-1)", explanation: "Derivasjonen av x^n er n ganger x^(n-1)." },
        { name: "Sum", formula: "d/dx(f(x) + g(x)) = f'(x) + g'(x)", explanation: "Derivasjonen av en sum er summen av derivasjonene." },
        { name: "Produkt", formula: "d/dx(f(x)·g(x)) = f'(x)·g(x) + f(x)·g'(x)", explanation: "Produktregelen: derivasjonen av et produkt." },
        { name: "Kvotient", formula: "d/dx(f(x)/g(x)) = (f'(x)·g(x) - f(x)·g'(x))/g(x)²", explanation: "Kvotientregelen: derivasjonen av en brøk." },
        { name: "Kjerneregel", formula: "d/dx(f(g(x))) = f'(g(x))·g'(x)", explanation: "Kjerneregelen: derivasjonen av en sammensatt funksjon." },
        { name: "Eksponentialfunksjon", formula: "d/dx(e^x) = e^x", explanation: "Derivasjonen av e^x er e^x." },
        { name: "Logaritme", formula: "d/dx(ln(x)) = 1/x", explanation: "Derivasjonen av den naturlige logaritmen er 1/x." }
      ]
    },
    {
      category: "statistics",
      title: "Statistikk og Sannsynlighet",
      formulas: [
        { name: "Gjennomsnitt", formula: "μ = Σx / n", explanation: "Gjennomsnittet er summen av alle observasjoner delt på antall observasjoner." },
        { name: "Varians", formula: "σ² = Σ(x - μ)² / n", explanation: "Variansen er gjennomsnittlig kvadratavvik fra gjennomsnittet." },
        { name: "Standardavvik", formula: "σ = √σ²", explanation: "Standardavviket er kvadratroten av variansen." },
        { name: "Kombinatorikk (permutasjon)", formula: "P(n,r) = n! / (n-r)!", explanation: "Antall måter å ordne r elementer fra n objekter når rekkefølgen betyr noe." },
        { name: "Kombinatorikk (kombinasjon)", formula: "C(n,r) = n! / (r! · (n-r)!)", explanation: "Antall måter å velge r elementer fra n objekter når rekkefølgen ikke betyr noe." },
        { name: "Betinget sannsynlighet", formula: "P(A|B) = P(A∩B) / P(B)", explanation: "Sannsynligheten for A gitt at B har skjedd." },
        { name: "Bayes' teorem", formula: "P(A|B) = (P(B|A) · P(A)) / P(B)", explanation: "Relaterer betingede sannsynligheter." }
      ]
    },
    {
      category: "functions",
      title: "Funksjonsanalyse",
      formulas: [
        { name: "Stasjonære punkter", formula: "f'(x) = 0", explanation: "Stasjonære punkter finnes der den deriverte er lik null." },
        { name: "Vendepunkter", formula: "f''(x) = 0", explanation: "Vendepunkter finnes der den andrederiverte er lik null." },
        { name: "Stigende funksjon", formula: "f'(x) > 0", explanation: "En funksjon er stigende der den deriverte er positiv." },
        { name: "Avtakende funksjon", formula: "f'(x) < 0", explanation: "En funksjon er avtakende der den deriverte er negativ." },
        { name: "Lokalt maksimum", formula: "f'(x) = 0 og f''(x) < 0", explanation: "Et lokalt maksimum finnes der den deriverte er null og den andrederiverte er negativ." },
        { name: "Lokalt minimum", formula: "f'(x) = 0 og f''(x) > 0", explanation: "Et lokalt minimum finnes der den deriverte er null og den andrederiverte er positiv." }
      ]
    }
  ];

  // Filter formulas based on search term and category
  useEffect(() => {
    let filtered = [...allFormulas];
    
    if (category) {
      filtered = filtered.filter(group => group.category === category);
    }
    
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.map(group => {
        return {
          ...group,
          formulas: group.formulas.filter(formula => 
            formula.formula.toLowerCase().includes(lowerSearchTerm) || 
            formula.name.toLowerCase().includes(lowerSearchTerm) ||
            formula.explanation.toLowerCase().includes(lowerSearchTerm)
          )
        };
      }).filter(group => group.formulas.length > 0);
    }
    
    setFilteredFormulas(filtered);
  }, [searchTerm, category]);

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800 dark:text-blue-300 flex items-center justify-center gap-2">
        <BookOpen className="h-5 w-5" /> Matematiske Formler for 1-T
      </h2>
      
      <FormulaSearch 
        onSearch={setSearchTerm} 
        onCategoryFilter={setCategory} 
      />
      
      <div className="mt-6 space-y-4">
        {filteredFormulas.length > 0 ? (
          filteredFormulas.map((group, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">{group.title}</h3>
              <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg p-4 shadow-md">
                <div className="space-y-2">
                  {group.formulas.map((formula, fIndex) => (
                    <FormulaItem 
                      key={fIndex} 
                      formula={formula} 
                      highlight={searchTerm}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-8 bg-white/70 dark:bg-gray-800/70 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Ingen formler funnet. Prøv et annet søkeord eller kategori.</p>
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center">
          <Star className="h-4 w-4 mr-2 text-yellow-500" /> Visste du at:
        </h3>
        <p className="text-blue-700 dark:text-blue-200">
          Math 1-T er et teoretisk matematikkfag som legger grunnlaget for videre studier i realfag. 
          Gode basiskunnskaper i disse formlene er essensielt for suksess i matematikk på høyere nivå.
        </p>
      </div>
    </Card>
  );
};

interface FormulaItemProps {
  formula: {
    name: string;
    formula: string;
    explanation: string;
  };
  highlight?: string;
}

const FormulaItem = ({ formula, highlight }: FormulaItemProps) => {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild>
        <div className="grid grid-cols-5 gap-2 cursor-help">
          {formula.name && (
            <span className="col-span-2 text-sm font-medium text-gray-700 dark:text-gray-300">{formula.name}:</span>
          )}
          <div className={`${formula.name ? 'col-span-3' : 'col-span-5'} bg-blue-50/70 dark:bg-blue-900/30 p-2 rounded font-mono text-sm flex items-center justify-center`}>
            {formula.formula}
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="bg-white dark:bg-gray-800 p-4 shadow-lg border border-blue-100 dark:border-blue-800">
        <p className="text-sm text-gray-600 dark:text-gray-300">{formula.explanation}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

export default EnhancedFormulasReference;
