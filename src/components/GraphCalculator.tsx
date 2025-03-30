
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const GraphCalculator = () => {
  const [expression, setExpression] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set the canvas dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Draw axes
    context.beginPath();
    context.strokeStyle = '#ccc';
    context.lineWidth = 1;

    // Draw grid lines
    const xStep = width / (xMax - xMin);
    const yStep = height / (yMax - yMin);
    
    // Draw vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const canvasX = (x - xMin) * xStep;
      context.moveTo(canvasX, 0);
      context.lineTo(canvasX, height);
    }
    
    // Draw horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      const canvasY = height - (y - yMin) * yStep;
      context.moveTo(0, canvasY);
      context.lineTo(width, canvasY);
    }
    context.stroke();
    
    // Draw axes with thicker lines
    context.beginPath();
    context.strokeStyle = '#333';
    context.lineWidth = 2;
    
    // x-axis
    const yAxisPos = height - (-yMin) * yStep;
    context.moveTo(0, yAxisPos);
    context.lineTo(width, yAxisPos);
    
    // y-axis
    const xAxisPos = (-xMin) * xStep;
    context.moveTo(xAxisPos, 0);
    context.lineTo(xAxisPos, height);
    context.stroke();

    try {
      // Create a safe evaluation function
      const evalFunction = new Function('x', `try { return ${expression.replace(/\^/g, '**')}; } catch(e) { return NaN; }`);

      // Plot the function
      context.beginPath();
      context.strokeStyle = '#2563eb';
      context.lineWidth = 3;

      let isFirstPoint = true;
      const step = (xMax - xMin) / width;

      for (let i = 0; i <= width; i++) {
        const x = xMin + i * step;
        try {
          const y = evalFunction(x);
          if (!isNaN(y)) {
            const canvasX = i;
            const canvasY = height - ((y - yMin) / (yMax - yMin)) * height;
            
            if (isFirstPoint) {
              context.moveTo(canvasX, canvasY);
              isFirstPoint = false;
            } else {
              context.lineTo(canvasX, canvasY);
            }
          }
        } catch (e) {
          // Skip errors
        }
      }
      context.stroke();
    } catch (error) {
      console.error('Error plotting function:', error);
    }
  };

  useEffect(() => {
    drawGraph();
  }, [expression, xMin, xMax, yMin, yMax]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          canvasRef.current.width = container.clientWidth;
          // Adjust height to maintain aspect ratio
          canvasRef.current.height = Math.min(container.clientWidth * 0.75, 500);
          drawGraph();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card className="p-4 shadow-lg bg-gray-50 max-w-3xl w-full mx-auto animate-fade-in">
      <div className="mb-6">
        <Label htmlFor="function" className="text-sm font-medium mb-1 block">
          Funksjon f(x) =
        </Label>
        <div className="flex gap-2">
          <Input
            id="function"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="f.eks: x^2, sin(x), 2*x+3"
            className="flex-1"
          />
          <Button
            onClick={drawGraph}
            className="bg-math-blue hover:bg-math-blue-dark"
          >
            Plot
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Tips: Bruk ^ for potenser, sin(), cos(), tan(), sqrt() for funksjoner
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <Label htmlFor="xmin" className="text-xs">X min</Label>
          <Input
            id="xmin"
            type="number"
            value={xMin}
            onChange={(e) => setXMin(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="xmax" className="text-xs">X max</Label>
          <Input
            id="xmax"
            type="number"
            value={xMax}
            onChange={(e) => setXMax(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="ymin" className="text-xs">Y min</Label>
          <Input
            id="ymin"
            type="number"
            value={yMin}
            onChange={(e) => setYMin(Number(e.target.value))}
          />
        </div>
        <div>
          <Label htmlFor="ymax" className="text-xs">Y max</Label>
          <Input
            id="ymax"
            type="number"
            value={yMax}
            onChange={(e) => setYMax(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="bg-white p-2 rounded-lg shadow-inner">
        <canvas 
          ref={canvasRef} 
          className="w-full border border-gray-200 rounded"
          style={{ minHeight: "350px" }}
        ></canvas>
      </div>
    </Card>
  );
};

export default GraphCalculator;
