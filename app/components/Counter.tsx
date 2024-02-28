'use client';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const Counter = ({ counterType }: { counterType: string }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={counterType} value={count} readOnly />
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => {
          if (count === 0) return;
          setCount(count - 1);
        }}
      >
        <Minus className="w-4 h-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{count}</p>
      <Button
        variant="outline"
        size="icon"
        type="button"
        onClick={() => setCount(count + 1)}
      >
        <Plus className="w-4 h-4 text-primary" />
      </Button>
    </div>
  );
};

export default Counter;
