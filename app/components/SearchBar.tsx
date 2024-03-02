'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { useCountries } from '../lib/getCountries';
import HomeMap from './HomeMap';
import SearchBarSubmitButton from './SearchBarSubmitButton';
import { Card, CardHeader } from '@/components/ui/card';
import Counter from './Counter';

const SearchBar = () => {
  const [step, setStep] = useState(1);
  const [locationValue, setLocationValue] = useState('');
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
          <div className="flex h-full divide-x font-medium">
            <p className="px-4">Anywhere</p>
            <p className="px-4">Any week</p>
            <p className="px-4">Add guests</p>
          </div>
          <SearchIcon className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form className="gap-4 flex flex-col">
          <input type="hidden" name="country" value={locationValue} />
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>Select a country</DialogTitle>
                <DialogDescription>Please choose a country</DialogDescription>
              </DialogHeader>
              <Select
                required
                onValueChange={(value) => setLocationValue(value)}
                value={locationValue}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.flag} {country.label} [{country.value}]
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <HomeMap locationValue={locationValue} />
            </>
          ) : (
            <>
              <DialogHeader className="mb-1">
                <DialogTitle>
                  Provide your rental process information
                </DialogTitle>
                <DialogDescription>
                  Please fill in your details!
                </DialogDescription>
              </DialogHeader>

              <Card>
                <CardHeader className="flex flex-col gap-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Guests</h3>
                      <p className="text-muted-foreground text-sm">
                        How many guests?
                      </p>
                    </div>

                    <Counter counterType="guestCounter" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Rooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many rooms are necessary?
                      </p>
                    </div>

                    <Counter counterType="roomCounter" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h3 className="underline font-medium">Bathrooms</h3>
                      <p className="text-muted-foreground text-sm">
                        How many bathrooms needed?
                      </p>
                    </div>

                    <Counter counterType="bathroomCounter" />
                  </div>
                </CardHeader>
              </Card>
            </>
          )}

          <DialogFooter>
            <SearchBarSubmitButton step={step} setStep={setStep} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
