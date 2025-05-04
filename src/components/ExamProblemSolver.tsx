
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calculator, BookOpen } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ExamProblemSolver = () => {
  const [problemType, setProblemType] = useState('linear-equation');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInputChange = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const solveLinearEquation = () => {
    try {
      // ax + b = c
      const a = parseFloat(inputs.a || '0');
      const b = parseFloat(inputs.b || '0');
      const c = parseFloat(inputs.c || '0');
      
      if (a === 0) {
        setResult('Ingen løsning (a kan ikke være 0)');
        setSteps([]);
        return;
      }

      const x = (c - b) / a;
      
      // Show steps
      setSteps([
        `1. Start med likningen: ${a}x + ${b} = ${c}`,
        `2. Trekk fra ${b} på begge sider: ${a}x = ${c - b}`,
        `3. Del med ${a} på begge sider: x = ${(c - b) / a}`
      ]);
      
      setResult(`x = ${x}`);
      toast({
        title: "Løsning funnet",
        description: `Svaret er x = ${x}`,
      });
    } catch (error) {
      setResult('Feil i beregningen. Sjekk inndataene.');
      setSteps([]);
    }
  };

  const solveQuadraticEquation = () => {
    try {
      // ax² + bx + c = 0
      const a = parseFloat(inputs.quad_a || '0');
      const b = parseFloat(inputs.quad_b || '0');
      const c = parseFloat(inputs.quad_c || '0');
      
      if (a === 0) {
        // This is actually a linear equation
        if (b === 0) {
          setResult(c === 0 ? 'Alle x er løsninger' : 'Ingen løsninger');
          setSteps([]);
          return;
        }
        
        const x = -c / b;
        setSteps([
          `1. Dette er en lineær likning (siden a = 0): ${b}x + ${c} = 0`,
          `2. Trekk fra ${c} på begge sider: ${b}x = ${-c}`,
          `3. Del med ${b} på begge sider: x = ${-c / b}`
        ]);
        setResult(`x = ${x}`);
        return;
      }
      
      const discriminant = b * b - 4 * a * c;
      
      if (discriminant < 0) {
        setSteps([
          `1. Beregn diskriminanten: b² - 4ac = ${b}² - 4 × ${a} × ${c} = ${discriminant}`,
          `2. Siden diskriminanten er negativ, har likningen ingen reelle løsninger.`
        ]);
        setResult('Ingen reelle løsninger (diskriminant < 0)');
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        setSteps([
          `1. Beregn diskriminanten: b² - 4ac = ${b}² - 4 × ${a} × ${c} = ${discriminant}`,
          `2. Siden diskriminanten er 0, har likningen én dobbel løsning.`,
          `3. x = -b / (2a) = -${b} / (2 × ${a}) = ${x}`
        ]);
        setResult(`x = ${x} (dobbel løsning)`);
      } else {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        setSteps([
          `1. Beregn diskriminanten: b² - 4ac = ${b}² - 4 × ${a} × ${c} = ${discriminant}`,
          `2. Siden diskriminanten er positiv, har likningen to løsninger.`,
          `3. x₁ = (-b + √(b² - 4ac)) / (2a) = (-${b} + √${discriminant}) / (2 × ${a}) = ${x1}`,
          `4. x₂ = (-b - √(b² - 4ac)) / (2a) = (-${b} - √${discriminant}) / (2 × ${a}) = ${x2}`
        ]);
        setResult(`x₁ = ${x1}, x₂ = ${x2}`);
      }
      
      toast({
        title: "Løsning funnet",
        description: discriminant < 0 ? "Ingen reelle løsninger" : 
                      discriminant === 0 ? `Én løsning: x = ${-b / (2 * a)}` : 
                      `To løsninger funnet`,
      });
    } catch (error) {
      setResult('Feil i beregningen. Sjekk inndataene.');
      setSteps([]);
    }
  };

  const solveTrigonometricEquation = () => {
    try {
      // a*sin(x) + b = c
      const a = parseFloat(inputs.trig_a || '1');
      const b = parseFloat(inputs.trig_b || '0');
      const c = parseFloat(inputs.trig_c || '0');
      
      if (a === 0) {
        setResult(b === c ? 'Alle x er løsninger' : 'Ingen løsninger');
        setSteps([]);
        return;
      }
      
      const sinValue = (c - b) / a;
      
      if (sinValue < -1 || sinValue > 1) {
        setSteps([
          `1. Reorganiser likningen: ${a}sin(x) = ${c} - ${b} = ${c-b}`,
          `2. Del med ${a}: sin(x) = ${sinValue}`,
          `3. Siden |sin(x)| ≤ 1 alltid, og ${sinValue} er utenfor dette intervallet, har likningen ingen løsning.`
        ]);
        setResult('Ingen løsninger (sin(x) må være mellom -1 og 1)');
        return;
      }
      
      const angle1 = Math.asin(sinValue) * (180 / Math.PI);
      const angle2 = 180 - angle1;
      
      setSteps([
        `1. Reorganiser likningen: ${a}sin(x) = ${c} - ${b} = ${c-b}`,
        `2. Del med ${a}: sin(x) = ${sinValue}`,
        `3. Første løsning: x = arcsin(${sinValue}) = ${angle1.toFixed(2)}° i første/fjerde kvadrant`,
        `4. Andre løsning: x = 180° - arcsin(${sinValue}) = ${angle2.toFixed(2)}° i andre/tredje kvadrant`
      ]);
      
      setResult(`x = ${angle1.toFixed(2)}° + k·360°, x = ${angle2.toFixed(2)}° + k·360°, der k er et heltall`);
      
      toast({
        title: "Løsninger funnet",
        description: `To vinkler funnet: ${angle1.toFixed(2)}° og ${angle2.toFixed(2)}°`,
      });
    } catch (error) {
      setResult('Feil i beregningen. Sjekk inndataene.');
      setSteps([]);
    }
  };

  const solveSystemOfEquations = () => {
    try {
      // System of equations: a1x + b1y = c1, a2x + b2y = c2
      const a1 = parseFloat(inputs.sys_a1 || '0');
      const b1 = parseFloat(inputs.sys_b1 || '0');
      const c1 = parseFloat(inputs.sys_c1 || '0');
      const a2 = parseFloat(inputs.sys_a2 || '0');
      const b2 = parseFloat(inputs.sys_b2 || '0');
      const c2 = parseFloat(inputs.sys_c2 || '0');
      
      // Check determinant
      const determinant = a1 * b2 - a2 * b1;
      
      if (determinant === 0) {
        // Check if the equations are equivalent or inconsistent
        if (a1/a2 === b1/b2 && b1/b2 === c1/c2) {
          setResult('Uendelig mange løsninger (avhengige likninger)');
        } else {
          setResult('Ingen løsning (inkonsistente likninger)');
        }
        
        setSteps([
          `1. Determinanten er 0: ${a1} × ${b2} - ${a2} × ${b1} = ${determinant}`,
          `2. Når determinanten er 0, er enten likningene avhengige eller inkonsistente.`,
          `3. Undersøk forholdene mellom koeffisientene: a1/a2 = ${a1}/${a2} = ${a1/a2}, b1/b2 = ${b1}/${b2} = ${b1/b2}, c1/c2 = ${c1}/${c2} = ${c1/c2}`,
          `4. ${a1/a2 === b1/b2 && b1/b2 === c1/c2 ? 'Disse er like, så likningene er avhengige med uendelig mange løsninger.' : 'Disse er ikke like, så likningene er inkonsistente uten løsninger.'}`
        ]);
        return;
      }
      
      // Solve using Cramer's rule
      const x = (c1 * b2 - c2 * b1) / determinant;
      const y = (a1 * c2 - a2 * c1) / determinant;
      
      setSteps([
        `1. Skriv likningssystemet: ${a1}x + ${b1}y = ${c1}, ${a2}x + ${b2}y = ${c2}`,
        `2. Beregn determinanten: ${a1} × ${b2} - ${a2} × ${b1} = ${determinant}`,
        `3. Bruk Cramers regel:`,
        `   x = (c1 × b2 - c2 × b1) / determinant = (${c1} × ${b2} - ${c2} × ${b1}) / ${determinant} = ${x}`,
        `   y = (a1 × c2 - a2 × c1) / determinant = (${a1} × ${c2} - ${a2} × ${c1}) / ${determinant} = ${y}`,
      ]);
      
      setResult(`x = ${x}, y = ${y}`);
      toast({
        title: "Løsning funnet",
        description: `Løsningen er punktet (${x}, ${y})`,
      });
    } catch (error) {
      setResult('Feil i beregningen. Sjekk inndataene.');
      setSteps([]);
    }
  };

  const handleSolve = () => {
    if (problemType === 'linear-equation') {
      solveLinearEquation();
    } else if (problemType === 'quadratic-equation') {
      solveQuadraticEquation();
    } else if (problemType === 'trigonometric') {
      solveTrigonometricEquation();
    } else if (problemType === 'system-of-equations') {
      solveSystemOfEquations();
    }
  };

  return (
    <Card className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> Eksamensoppgaveløser
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="linear-equation" onValueChange={setProblemType}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="linear-equation">Lineære Likninger</TabsTrigger>
            <TabsTrigger value="quadratic-equation">Andregradsfunksjoner</TabsTrigger>
            <TabsTrigger value="trigonometric">Trigonometri</TabsTrigger>
            <TabsTrigger value="system-of-equations">Likningssystemer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="linear-equation" className="space-y-4">
            <div className="grid gap-4">
              <div className="text-center mb-2">
                <p className="font-mono">ax + b = c</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="a">a:</Label>
                  <Input 
                    id="a"
                    type="number"
                    placeholder="a"
                    value={inputs.a || ''}
                    onChange={(e) => handleInputChange('a', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="b">b:</Label>
                  <Input 
                    id="b"
                    type="number"
                    placeholder="b"
                    value={inputs.b || ''}
                    onChange={(e) => handleInputChange('b', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="c">c:</Label>
                  <Input 
                    id="c"
                    type="number"
                    placeholder="c"
                    value={inputs.c || ''}
                    onChange={(e) => handleInputChange('c', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="quadratic-equation" className="space-y-4">
            <div className="grid gap-4">
              <div className="text-center mb-2">
                <p className="font-mono">ax² + bx + c = 0</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quad_a">a:</Label>
                  <Input 
                    id="quad_a"
                    type="number"
                    placeholder="a"
                    value={inputs.quad_a || ''}
                    onChange={(e) => handleInputChange('quad_a', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quad_b">b:</Label>
                  <Input 
                    id="quad_b"
                    type="number"
                    placeholder="b"
                    value={inputs.quad_b || ''}
                    onChange={(e) => handleInputChange('quad_b', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="quad_c">c:</Label>
                  <Input 
                    id="quad_c"
                    type="number"
                    placeholder="c"
                    value={inputs.quad_c || ''}
                    onChange={(e) => handleInputChange('quad_c', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="trigonometric" className="space-y-4">
            <div className="grid gap-4">
              <div className="text-center mb-2">
                <p className="font-mono">a·sin(x) + b = c</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="trig_a">a:</Label>
                  <Input 
                    id="trig_a"
                    type="number"
                    placeholder="a"
                    value={inputs.trig_a || ''}
                    onChange={(e) => handleInputChange('trig_a', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="trig_b">b:</Label>
                  <Input 
                    id="trig_b"
                    type="number"
                    placeholder="b"
                    value={inputs.trig_b || ''}
                    onChange={(e) => handleInputChange('trig_b', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="trig_c">c:</Label>
                  <Input 
                    id="trig_c"
                    type="number"
                    placeholder="c"
                    value={inputs.trig_c || ''}
                    onChange={(e) => handleInputChange('trig_c', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="system-of-equations" className="space-y-4">
            <div className="grid gap-6">
              <div className="text-center mb-2">
                <p className="font-mono">a₁x + b₁y = c₁</p>
                <p className="font-mono">a₂x + b₂y = c₂</p>
              </div>
              
              <div className="border-b pb-4 pt-2 dark:border-gray-700">
                <p className="font-semibold mb-2">Første likning: a₁x + b₁y = c₁</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sys_a1">a₁:</Label>
                    <Input 
                      id="sys_a1"
                      type="number"
                      placeholder="a₁"
                      value={inputs.sys_a1 || ''}
                      onChange={(e) => handleInputChange('sys_a1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sys_b1">b₁:</Label>
                    <Input 
                      id="sys_b1"
                      type="number"
                      placeholder="b₁"
                      value={inputs.sys_b1 || ''}
                      onChange={(e) => handleInputChange('sys_b1', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sys_c1">c₁:</Label>
                    <Input 
                      id="sys_c1"
                      type="number"
                      placeholder="c₁"
                      value={inputs.sys_c1 || ''}
                      onChange={(e) => handleInputChange('sys_c1', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <p className="font-semibold mb-2">Andre likning: a₂x + b₂y = c₂</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="sys_a2">a₂:</Label>
                    <Input 
                      id="sys_a2"
                      type="number"
                      placeholder="a₂"
                      value={inputs.sys_a2 || ''}
                      onChange={(e) => handleInputChange('sys_a2', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sys_b2">b₂:</Label>
                    <Input 
                      id="sys_b2"
                      type="number"
                      placeholder="b₂"
                      value={inputs.sys_b2 || ''}
                      onChange={(e) => handleInputChange('sys_b2', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="sys_c2">c₂:</Label>
                    <Input 
                      id="sys_c2"
                      type="number"
                      placeholder="c₂"
                      value={inputs.sys_c2 || ''}
                      onChange={(e) => handleInputChange('sys_c2', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-4 flex justify-center">
            <Button onClick={handleSolve} className="w-full md:w-auto">
              Løs likningssett
            </Button>
          </div>
          
          {result && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Løsning:
              </h4>
              <p className="font-mono text-lg text-center">{result}</p>
              
              {steps.length > 0 && (
                <div className="mt-4">
                  <h5 className="font-semibold mb-2">Fremgangsmåte:</h5>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    {steps.map((step, i) => (
                      <li key={i} className="font-mono">{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExamProblemSolver;
