import { Button } from '@/components/ui/button';
import React from 'react';
import { CreationSubmit } from './SubmitButtons';

interface SubmitButtonLocalProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const SearchBarSubmitButton = ({ step, setStep }: SubmitButtonLocalProps) => {
  if (step === 1) {
    return (
      <Button onClick={() => setStep(step + 1)} type="button">
        Next
      </Button>
    );
  } else if (step === 2) {
    return <CreationSubmit />;
  }
};

export default SearchBarSubmitButton;
