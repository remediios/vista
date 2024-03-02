import prisma from './lib/db';
import MapFilterItems from './components/MapFilterItems';
import ListingCard from './components/home/ListingCard';
import { Suspense } from 'react';
import LoadingSkeleton from './components/LoadingSkeleton';
import NoItem from './components/home/NoItem';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { unstable_noStore as noStore } from 'next/cache';

interface SearchParams {
  searchParams?: {
    filter?: string;
    country?: string;
    guestCounter?: string;
    roomCounter?: string;
    bathroomCounter?: string;
  };
  userId?: string | undefined;
}

async function getData({ searchParams, userId }: SearchParams) {
  noStore();
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guestCounter ?? undefined,
      bedrooms: searchParams?.roomCounter ?? undefined,
      bathrooms: searchParams?.bathroomCounter ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
}

export default function Home({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guestCounter?: string;
    roomCounter?: string;
    bathroomCounter?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<LoadingSkeleton />}>
        <ShowRentalHomes searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowRentalHomes({ searchParams }: SearchParams) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItem
          title="Sorry, no rental homes were found for this category..."
          description="Please check other categories or create your own rental home!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8 pb-10">
          {data.map((home) => (
            <ListingCard
              key={home.id}
              imagePath={home.photo as string}
              description={home.description as string}
              location={home.country as string}
              price={home.price as number}
              userId={user?.id}
              favouriteId={home.Favourite[0]?.id}
              isInFavouriteList={home.Favourite.length > 0 ? true : false}
              homeId={home.id}
              pathName="/" //revalidate only the homepage (actions)
            />
          ))}
        </div>
      )}
    </>
  );
}
