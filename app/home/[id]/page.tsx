/* eslint-disable @next/next/no-img-element */
import { createReservation } from '@/app/actions';
import CategoryShowcase from '@/app/components/CategoryShowcase';
import HomeMap from '@/app/components/HomeMap';
import SelectCalendar from '@/app/components/SelectCalendar';
import { ReservationButtons } from '@/app/components/SubmitButtons';
import prisma from '@/app/lib/db';
import { useCountries } from '@/app/lib/getCountries';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

async function getHomeData(homeId: string) {
  noStore();
  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      price: true,
      title: true,
      categoryName: true,
      country: true,
      createdAT: true,
      Reservation: {
        where: {
          homeId,
        },
      },
      User: {
        select: {
          id: true,
          firstName: true,
          profileImage: true,
        },
      },
    },
  });

  return data;
}

const getYear = (createdAt: Date) => {
  return createdAt.getFullYear();
};

const IndividualHomePage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const homeData = await getHomeData(params.id);
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(homeData?.country as string);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const createdAtYear = getYear(homeData?.createdAT ?? new Date());

  return (
    <div className="w-[75%] mx-auto mt-10 mb-24">
      <h1 className="text-3xl font-medium mb-5 tracking-tighter">
        {homeData?.title}
      </h1>
      <div className="relative h-[550px]">
        <Image
          src={`https://glwjdwtkbgtpdembqjlt.supabase.co/storage/v1/object/public/images/${homeData?.photo}`}
          alt="home image"
          fill
          className="rounded-lg h-full object-cover w-full"
        />
      </div>
      <div className="flex justify-between gap-y-24 mt-8">
        <div className="w-2/3 ">
          <h3 className="text-xl font-medium">
            {country?.flag} {country?.label}, {country?.region}
          </h3>
          <div className="flex gap-x-2 text-muted-foreground">
            <p>{homeData?.guests} Guests</p> -
            <p>{homeData?.bedrooms} Bedrooms</p>-
            <p>{homeData?.bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src={
                homeData?.User?.profileImage ??
                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt="user profile image"
              className="rounded-full h-11 w-11"
            />
            <div className="flex flex-col ml-4">
              <h3 className="font-medium">
                Hosted by {homeData?.User?.firstName}
              </h3>
              <p className="text-sm text-muted-foreground">
                Hosting since {createdAtYear}
              </p>
            </div>
          </div>
          <Separator className="my-7 w-2/3" />
          <CategoryShowcase categoryName={homeData?.categoryName as string} />
          <Separator className="my-7 w-2/3" />
          <p className="text-muted-foreground">{homeData?.description}</p>
          <Separator className="my-7 w-2/3" />
          <HomeMap locationValue={country?.value as string} />
        </div>
        <form
          action={createReservation}
          className="flex flex-col items-center justify-start"
        >
          <input type="hidden" name="userId" value={user?.id} />
          <input type="hidden" name="homeId" value={params.id} />
          <SelectCalendar reservations={homeData?.Reservation} />
          {user?.id ? (
            <ReservationButtons />
          ) : (
            <Button className="w-4/5" asChild>
              <Link href="/api/auth/login">Make a reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default IndividualHomePage;
