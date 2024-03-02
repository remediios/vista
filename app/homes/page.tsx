import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';
import NoItem from '../components/home/NoItem';
import ListingCard from '../components/home/ListingCard';

async function getUserHomes(userId: string) {
  const data = await prisma.home.findMany({
    where: {
      userId,
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
    },
    select: {
      id: true,
      photo: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId,
        },
      },
    },
    orderBy: {
      createdAT: 'desc',
    },
  });

  return data;
}

const UserHomesPage = async () => {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const userHomesData = await getUserHomes(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 mb-[50px]">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      {userHomesData.length === 0 ? (
        <NoItem
          title="Ups, there seems to be no homes to list..."
          description="Please add a rental home property on VISTA to see more details"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-10">
          {userHomesData.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              location={item.country as string}
              pathName="/homes"
              homeId={item.id as string}
              imagePath={item.photo as string}
              price={item.price as number}
              userId={user.id}
              favouriteId={item.Favourite[0]?.id}
              isInFavouriteList={item.Favourite.length > 0 ? true : false}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserHomesPage;
