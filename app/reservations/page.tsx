import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ListingCard from '../components/home/ListingCard';
import NoItem from '../components/home/NoItem';
import prisma from '../lib/db';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';

async function getReservationsData(userId: string) {
  noStore();
  const data = await prisma.reservation.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      startDate: true,
      endDate: true,
      Home: {
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
      },
    },
  });
  return data;
}

const ReservationsPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect('/');

  const reservationsData = await getReservationsData(user.id);

  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10 mb-[50px]">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>

      {reservationsData.length === 0 ? (
        <NoItem
          title="Sorry, you do not have any reservation booked..."
          description="Please make your reservation accordingly"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-10">
          {reservationsData.map((item) => (
            <ListingCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              location={item.Home?.country as string}
              pathName="/favourites"
              homeId={item.Home?.id as string}
              imagePath={item.Home?.photo as string}
              price={item.Home?.price as number}
              userId={user?.id}
              favouriteId={item.Home?.Favourite[0]?.id as string}
              isInFavouriteList={
                (item.Home?.Favourite.length as number) > 0 ? true : false
              }
              reservation={{
                id: item.id,
                startDate: item.startDate,
                endDate: item.endDate,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservationsPage;
