'use client';

import { createAddressLocation } from '@/app/actions';
import ButtonBar from '@/app/components/ButtonBar';
import SelectCountry from '@/app/components/SelectCountry';
import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const AddressPage = ({ params }: { params: { id: string } }) => {
  const [locationValue, setLocationValue] = useState<string>('');

  const LazyMap = dynamic(() => import('@/app/components/Map'), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your home located?
        </h2>
      </div>
      <form action={createAddressLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="countryValue" value={locationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <SelectCountry setLocationValue={setLocationValue} />
          <LazyMap locationValue={locationValue} />
        </div>
        <ButtonBar />
      </form>
    </>
  );
};

export default AddressPage;
