
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface FormulaCalculatorProps {
  formulaType: string;
}

const FormulaCalculator = ({ formulaType }: FormulaCalculatorProps) => {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const handleCalculate = () => {
    switch (formulaType) {
      case 'pytagoras':
        calculatePytagoras();
        break;
      case 'kvadratsetning1':
        calculateKvadratsetning1();
        break;
      case 'kvadratsetning2':
        calculateKvadratsetning2();
        break;
      case 'kvadratsetning3':
        calculateKvadratsetning3();
        break;
      case 'circle-area':
        calculateCircleArea();
        break;
      case 'triangle-area':
        calculateTriangleArea();
        break;
      case 'sin':
        calculateSin();
        break;
      case 'cos':
        calculateCos();
        break;
      case 'tan':
        calculateTan();
        break;
      default:
        toast({
          title: "Kalkulator ikke tilgjengelig",
          description: "Denne formelen har ikke en dedikert kalkulator enda.",
        });
    }
  };

  const calculatePytagoras = () => {
    try {
      if (inputs.c) {
        // Calculate sides a and b
        const c = parseFloat(inputs.c);
        if (inputs.a) {
          const a = parseFloat(inputs.a);
          if (a >= c) {
            setResult("Feil: a må være mindre enn c (hypotenusen)");
            return;
          }
          const b = Math.sqrt(c * c - a * a);
          setResult(`b = ${b.toFixed(4)}`);
        } else if (inputs.b) {
          const b = parseFloat(inputs.b);
          if (b >= c) {
            setResult("Feil: b må være mindre enn c (hypotenusen)");
            return;
          }
          const a = Math.sqrt(c * c - b * b);
          setResult(`a = ${a.toFixed(4)}`);
        } else {
          setResult("Fyll inn verdier for a eller b i tillegg til c");
        }
      } else if (inputs.a && inputs.b) {
        // Calculate hypotenuse c
        const a = parseFloat(inputs.a);
        const b = parseFloat(inputs.b);
        const c = Math.sqrt(a * a + b * b);
        setResult(`c = ${c.toFixed(4)}`);
      } else {
        setResult("Fyll inn verdier for to av sidene");
      }
      
      toast({
        title: "Beregnet med Pytagoras' setning",
        description: "a² + b² = c²",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateKvadratsetning1 = () => {
    try {
      const a = parseFloat(inputs.a || '0');
      const b = parseFloat(inputs.b || '0');
      const result = a * a + 2 * a * b + b * b;
      setResult(`(${a} + ${b})² = ${result}`);
      
      toast({
        title: "Beregnet med første kvadratsetning",
        description: "(a + b)² = a² + 2ab + b²",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateKvadratsetning2 = () => {
    try {
      const a = parseFloat(inputs.a || '0');
      const b = parseFloat(inputs.b || '0');
      const result = a * a - 2 * a * b + b * b;
      setResult(`(${a} - ${b})² = ${result}`);
      
      toast({
        title: "Beregnet med andre kvadratsetning",
        description: "(a - b)² = a² - 2ab + b²",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateKvadratsetning3 = () => {
    try {
      const a = parseFloat(inputs.a || '0');
      const b = parseFloat(inputs.b || '0');
      const result = a * a - b * b;
      setResult(`(${a} + ${b})(${a} - ${b}) = ${result}`);
      
      toast({
        title: "Beregnet med tredje kvadratsetning",
        description: "(a + b)(a - b) = a² - b²",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateCircleArea = () => {
    try {
      const r = parseFloat(inputs.r || '0');
      const area = Math.PI * r * r;
      setResult(`A = π × ${r}² = ${area.toFixed(4)}`);
      
      toast({
        title: "Beregnet sirkelens areal",
        description: "A = π × r²",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateTriangleArea = () => {
    try {
      const g = parseFloat(inputs.g || '0');
      const h = parseFloat(inputs.h || '0');
      const area = (g * h) / 2;
      setResult(`A = (${g} × ${h}) / 2 = ${area.toFixed(4)}`);
      
      toast({
        title: "Beregnet trekantens areal",
        description: "A = (g × h) / 2",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateSin = () => {
    try {
      if (inputs.angle) {
        // Calculate sin of angle
        const angle = parseFloat(inputs.angle);
        const radians = angle * Math.PI / 180;
        const sinValue = Math.sin(radians);
        setResult(`sin(${angle}°) = ${sinValue.toFixed(4)}`);
      } else if (inputs.sinValue) {
        // Calculate angle from sin
        const sinValue = parseFloat(inputs.sinValue);
        if (sinValue < -1 || sinValue > 1) {
          setResult("Feil: Sinus må være mellom -1 og 1");
          return;
        }
        const radians = Math.asin(sinValue);
        const angle = radians * 180 / Math.PI;
        setResult(`arcsin(${sinValue}) = ${angle.toFixed(4)}°`);
      } else {
        setResult("Fyll inn enten vinkel eller sinusverdi");
      }
      
      toast({
        title: "Beregnet med sinusfunksjonen",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateCos = () => {
    try {
      if (inputs.angle) {
        // Calculate cos of angle
        const angle = parseFloat(inputs.angle);
        const radians = angle * Math.PI / 180;
        const cosValue = Math.cos(radians);
        setResult(`cos(${angle}°) = ${cosValue.toFixed(4)}`);
      } else if (inputs.cosValue) {
        // Calculate angle from cos
        const cosValue = parseFloat(inputs.cosValue);
        if (cosValue < -1 || cosValue > 1) {
          setResult("Feil: Cosinus må være mellom -1 og 1");
          return;
        }
        const radians = Math.acos(cosValue);
        const angle = radians * 180 / Math.PI;
        setResult(`arccos(${cosValue}) = ${angle.toFixed(4)}°`);
      } else {
        setResult("Fyll inn enten vinkel eller cosinusverdi");
      }
      
      toast({
        title: "Beregnet med cosinusfunksjonen",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const calculateTan = () => {
    try {
      if (inputs.angle) {
        // Calculate tan of angle
        const angle = parseFloat(inputs.angle);
        
        // Check for 90, 270, etc. degrees
        if (angle % 180 === 90) {
          setResult(`tan(${angle}°) = Udefinert (divisjon med 0)`);
          return;
        }
        
        const radians = angle * Math.PI / 180;
        const tanValue = Math.tan(radians);
        setResult(`tan(${angle}°) = ${tanValue.toFixed(4)}`);
      } else if (inputs.tanValue) {
        // Calculate angle from tan
        const tanValue = parseFloat(inputs.tanValue);
        const radians = Math.atan(tanValue);
        const angle = radians * 180 / Math.PI;
        setResult(`arctan(${tanValue}) = ${angle.toFixed(4)}°`);
      } else {
        setResult("Fyll inn enten vinkel eller tangensverdi");
      }
      
      toast({
        title: "Beregnet med tangensfunksjonen",
      });
    } catch (e) {
      setResult("Feil i beregningen. Sjekk inndataene.");
    }
  };

  const renderCalculatorFields = () => {
    switch (formulaType) {
      case 'pytagoras':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">a² + b² = c²</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label htmlFor="a">a:</Label>
                <Input 
                  id="a" 
                  type="number" 
                  placeholder="Katet a"
                  value={inputs.a || ''}
                  onChange={(e) => handleInputChange('a', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="b">b:</Label>
                <Input 
                  id="b" 
                  type="number" 
                  placeholder="Katet b"
                  value={inputs.b || ''}
                  onChange={(e) => handleInputChange('b', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="c">c:</Label>
                <Input 
                  id="c" 
                  type="number" 
                  placeholder="Hypotenus c"
                  value={inputs.c || ''}
                  onChange={(e) => handleInputChange('c', e.target.value)}
                />
              </div>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Fyll inn verdier for to av sidene for å beregne den tredje.
            </div>
          </div>
        );
      case 'kvadratsetning1':
      case 'kvadratsetning2':
      case 'kvadratsetning3':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">
              {formulaType === 'kvadratsetning1' && '(a + b)² = a² + 2ab + b²'}
              {formulaType === 'kvadratsetning2' && '(a - b)² = a² - 2ab + b²'}
              {formulaType === 'kvadratsetning3' && '(a + b)(a - b) = a² - b²'}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="a">a:</Label>
                <Input 
                  id="a" 
                  type="number" 
                  placeholder="Verdi for a"
                  value={inputs.a || ''}
                  onChange={(e) => handleInputChange('a', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="b">b:</Label>
                <Input 
                  id="b" 
                  type="number" 
                  placeholder="Verdi for b"
                  value={inputs.b || ''}
                  onChange={(e) => handleInputChange('b', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'circle-area':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">A = π × r²</div>
            <div>
              <Label htmlFor="r">Radius (r):</Label>
              <Input 
                id="r" 
                type="number" 
                placeholder="Radius"
                value={inputs.r || ''}
                onChange={(e) => handleInputChange('r', e.target.value)}
              />
            </div>
          </div>
        );
      case 'triangle-area':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">A = (g × h) / 2</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="g">Grunnlinje (g):</Label>
                <Input 
                  id="g" 
                  type="number" 
                  placeholder="Grunnlinje"
                  value={inputs.g || ''}
                  onChange={(e) => handleInputChange('g', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="h">Høyde (h):</Label>
                <Input 
                  id="h" 
                  type="number" 
                  placeholder="Høyde"
                  value={inputs.h || ''}
                  onChange={(e) => handleInputChange('h', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'sin':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">sin(θ) = motstående / hypotenus</div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              Fyll inn enten vinkelen for å beregne sinusverdien, eller sinusverdien for å beregne vinkelen.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="angle">Vinkel θ (grader):</Label>
                <Input 
                  id="angle" 
                  type="number" 
                  placeholder="Vinkel"
                  value={inputs.angle || ''}
                  onChange={(e) => handleInputChange('angle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sinValue">sin(θ) verdi:</Label>
                <Input 
                  id="sinValue" 
                  type="number" 
                  placeholder="Sinusverdi"
                  value={inputs.sinValue || ''}
                  onChange={(e) => handleInputChange('sinValue', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'cos':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">cos(θ) = hosliggende / hypotenus</div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              Fyll inn enten vinkelen for å beregne cosinusverdien, eller cosinusverdien for å beregne vinkelen.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="angle">Vinkel θ (grader):</Label>
                <Input 
                  id="angle" 
                  type="number" 
                  placeholder="Vinkel"
                  value={inputs.angle || ''}
                  onChange={(e) => handleInputChange('angle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cosValue">cos(θ) verdi:</Label>
                <Input 
                  id="cosValue" 
                  type="number" 
                  placeholder="Cosinusverdi"
                  value={inputs.cosValue || ''}
                  onChange={(e) => handleInputChange('cosValue', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      case 'tan':
        return (
          <div className="space-y-4">
            <div className="text-center mb-4 font-math text-lg text-math-formula dark:text-blue-300">tan(θ) = motstående / hosliggende</div>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">
              Fyll inn enten vinkelen for å beregne tangensverdien, eller tangensverdien for å beregne vinkelen.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="angle">Vinkel θ (grader):</Label>
                <Input 
                  id="angle" 
                  type="number" 
                  placeholder="Vinkel"
                  value={inputs.angle || ''}
                  onChange={(e) => handleInputChange('angle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="tanValue">tan(θ) verdi:</Label>
                <Input 
                  id="tanValue" 
                  type="number" 
                  placeholder="Tangensverdi"
                  value={inputs.tanValue || ''}
                  onChange={(e) => handleInputChange('tanValue', e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-4 text-gray-500">
            Ingen kalkulator tilgjengelig for denne formelen enda.
          </div>
        );
    }
  };

  return (
    <Card className="bg-blue-50/70 dark:bg-blue-900/20 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> 
          Formelkalkulator: {getFormulaName(formulaType)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderCalculatorFields()}
        
        <Button 
          onClick={handleCalculate} 
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
        >
          Beregn
        </Button>
        
        {result && (
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h4 className="font-bold mb-2">Resultat:</h4>
            <p className="font-math text-lg text-center text-math-formula dark:text-blue-300">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get the formula name
const getFormulaName = (formulaType: string): string => {
  switch (formulaType) {
    case 'pytagoras': return 'Pytagoras\' setning';
    case 'kvadratsetning1': return 'Første kvadratsetning';
    case 'kvadratsetning2': return 'Andre kvadratsetning';
    case 'kvadratsetning3': return 'Tredje kvadratsetning';
    case 'circle-area': return 'Sirkelens areal';
    case 'triangle-area': return 'Trekantens areal';
    case 'sin': return 'Sinus';
    case 'cos': return 'Cosinus';
    case 'tan': return 'Tangens';
    default: return formulaType;
  }
};

export default FormulaCalculator;
