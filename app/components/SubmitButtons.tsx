'use client';

import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const CreationSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant="default" size="lg">
          Next
        </Button>
      )}
    </>
  );
};

export const AddToFavouriteButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export const DeleteFromFavouriteButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          size="icon"
          disabled
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="w-4 h-4 text-primary" fill="#16a34a" />
        </Button>
      )}
    </>
  );
};

export const ReservationButtons = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className="w-4/5" disabled>
          <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait...
        </Button>
      ) : (
        <Button className="w-4/5" type="submit">
          Make your reservation!
        </Button>
      )}
    </>
  );
};
