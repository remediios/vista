import prisma from './lib/db';
import MapFilterItems from './components/MapFilterItems';
import ListingCard from './components/home/ListingCard';

async function getData() {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  });
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
        {data.map((home) => (
          <ListingCard
            key={home.id}
            imagePath={home.photo as string}
            description={home.description as string}
            location={home.country as string}
            price={home.price as number}
          />
        ))}
      </div>
    </div>
  );
}
