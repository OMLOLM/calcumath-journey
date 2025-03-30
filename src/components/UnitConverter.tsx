
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, RotateCw, Sparkles } from 'lucide-react';

type UnitType = 'length' | 'area' | 'volume' | 'mass' | 'time';

const UnitConverter = () => {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [result, setResult] = useState<number>(0);

  const unitTypes = [
    { value: 'length', label: 'Lengde' },
    { value: 'area', label: 'Areal' },
    { value: 'volume', label: 'Volum' },
    { value: 'mass', label: 'Masse' },
    { value: 'time', label: 'Tid' },
  ];

  const unitOptions: Record<UnitType, Array<{ value: string, label: string, ratio: number }>> = {
    length: [
      { value: 'km', label: 'Kilometer (km)', ratio: 1000 },
      { value: 'm', label: 'Meter (m)', ratio: 1 },
      { value: 'dm', label: 'Desimeter (dm)', ratio: 0.1 },
      { value: 'cm', label: 'Centimeter (cm)', ratio: 0.01 },
      { value: 'mm', label: 'Millimeter (mm)', ratio: 0.001 },
    ],
    area: [
      { value: 'km2', label: 'Kvadratkilometer (km²)', ratio: 1000000 },
      { value: 'm2', label: 'Kvadratmeter (m²)', ratio: 1 },
      { value: 'dm2', label: 'Kvadratdesimeter (dm²)', ratio: 0.01 },
      { value: 'cm2', label: 'Kvadratcentimeter (cm²)', ratio: 0.0001 },
      { value: 'mm2', label: 'Kvadratmillimeter (mm²)', ratio: 0.000001 },
      { value: 'ha', label: 'Hektar (ha)', ratio: 10000 },
    ],
    volume: [
      { value: 'm3', label: 'Kubikkmeter (m³)', ratio: 1 },
      { value: 'dm3', label: 'Kubikkdesimeter (dm³)', ratio: 0.001 },
      { value: 'cm3', label: 'Kubikkcentimeter (cm³)', ratio: 0.000001 },
      { value: 'mm3', label: 'Kubikkmillimeter (mm³)', ratio: 1e-9 },
      { value: 'l', label: 'Liter (l)', ratio: 0.001 },
      { value: 'dl', label: 'Desiliter (dl)', ratio: 0.0001 },
      { value: 'cl', label: 'Centiliter (cl)', ratio: 0.00001 },
      { value: 'ml', label: 'Milliliter (ml)', ratio: 0.000001 },
    ],
    mass: [
      { value: 't', label: 'Tonn (t)', ratio: 1000 },
      { value: 'kg', label: 'Kilogram (kg)', ratio: 1 },
      { value: 'g', label: 'Gram (g)', ratio: 0.001 },
      { value: 'mg', label: 'Milligram (mg)', ratio: 0.000001 },
    ],
    time: [
      { value: 'year', label: 'År', ratio: 31536000 },
      { value: 'month', label: 'Måned (gjennomsnitt)', ratio: 2628000 },
      { value: 'week', label: 'Uke', ratio: 604800 },
      { value: 'day', label: 'Dag', ratio: 86400 },
      { value: 'hour', label: 'Time', ratio: 3600 },
      { value: 'minute', label: 'Minutt', ratio: 60 },
      { value: 'second', label: 'Sekund', ratio: 1 },
    ],
  };

  useEffect(() => {
    convert();
  }, [unitType, fromUnit, toUnit, inputValue]);

  const convert = () => {
    const inputNum = parseFloat(inputValue);
    if (isNaN(inputNum)) {
      setResult(0);
      return;
    }

    const fromUnitOption = unitOptions[unitType].find(u => u.value === fromUnit);
    const toUnitOption = unitOptions[unitType].find(u => u.value === toUnit);

    if (!fromUnitOption || !toUnitOption) {
      return;
    }

    // Convert to base unit, then to target unit
    const inBaseUnit = inputNum * fromUnitOption.ratio;
    const converted = inBaseUnit / toUnitOption.ratio;
    setResult(converted);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleUnitTypeChange = (value: string) => {
    const newType = value as UnitType;
    setUnitType(newType);
    setFromUnit(unitOptions[newType][0].value);
    setToUnit(unitOptions[newType][1].value);
  };

  const formatResult = () => {
    if (result === 0 || isNaN(result)) return '0';
    
    if (Math.abs(result) < 0.000001 || Math.abs(result) > 999999) {
      return result.toExponential(6);
    }
    
    return result.toString().includes('.') 
      ? result.toFixed(6).replace(/0+$/, '').replace(/\.$/, '') 
      : result.toString();
  };

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl shadow-lg animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-800">Enhetskonvertering</h2>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-yellow-500" />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="unit-type">Velg type enheter</Label>
          <Select value={unitType} onValueChange={handleUnitTypeChange}>
            <SelectTrigger className="w-full mt-1 bg-white/80">
              <SelectValue placeholder="Velg enhetstype" />
            </SelectTrigger>
            <SelectContent>
              {unitTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_2fr] gap-4 items-end">
          <div className="space-y-4">
            <div>
              <Label htmlFor="from-value">Fra verdi</Label>
              <Input
                id="from-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-1 bg-white/80"
              />
            </div>
            <div>
              <Label htmlFor="from-unit">Fra enhet</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger className="w-full mt-1 bg-white/80">
                  <SelectValue placeholder="Velg enhet" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions[unitType].map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={swapUnits}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Bytt enheter"
            >
              <RotateCw className="h-5 w-5 text-blue-700" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="to-value">Til verdi</Label>
              <div className="relative mt-1">
                <Input
                  id="to-value"
                  value={formatResult()}
                  readOnly
                  className="bg-blue-100/50 font-mono"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="to-unit">Til enhet</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger className="w-full mt-1 bg-white/80">
                  <SelectValue placeholder="Velg enhet" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions[unitType].map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white/70 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-blue-800 mb-2">Konverteringsformel:</h3>
          <p className="font-mono text-sm">
            1 {unitOptions[unitType].find(u => u.value === fromUnit)?.label.split(' ')[0]} = 
            {' '}{(unitOptions[unitType].find(u => u.value === fromUnit)?.ratio || 0) / 
               (unitOptions[unitType].find(u => u.value === toUnit)?.ratio || 1)
              } {unitOptions[unitType].find(u => u.value === toUnit)?.label.split(' ')[0]}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UnitConverter;
