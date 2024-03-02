import { useCountries } from '@/app/lib/getCountries';
import Image from 'next/image';
import Link from 'next/link';
import {
  AddToFavouriteButton,
  DeleteFromFavouriteButton,
} from '../SubmitButtons';
import { addToFavourite, deleteFromFavourite } from '@/app/actions';
import { daysRemaining, formatDate } from '@/app/lib/formatDate';

interface IReservation {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface IListingCardProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  isInFavouriteList: boolean;
  favouriteId: string;
  homeId: string;
  pathName: string;
  reservation?: IReservation;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  userId,
  isInFavouriteList,
  favouriteId,
  homeId,
  pathName,
  reservation,
}: IListingCardProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="relative h-72">
        <Image
          src={`https://glwjdwtkbgtpdembqjlt.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="home image"
          fill
          className="rounded-lg h-full object-cover mb-2"
        />
        {userId && (
          <div className="z-0 absolute top-2 right-2">
            {isInFavouriteList ? (
              <form action={deleteFromFavourite}>
                <input type="hidden" name="favouriteId" value={favouriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavouriteButton />
              </form>
            ) : (
              <form action={addToFavourite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavouriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`}>
        <h3 className="font-medium text-base mt-2">
          {country?.flag} {country?.label}, {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        {reservation ? (
          <div className="flex items-center justify-between mt-1">
            <p className="pt-2 text-muted-foreground">
              <span className="font-medium text-black">
                {formatDate(reservation.startDate)} -{' '}
                {formatDate(reservation.endDate)}
              </span>
            </p>
            <p className="pt-2 text-muted-foreground">
              <span className="text-primary">
                {daysRemaining(reservation.startDate) !== 0 ? (
                  <>
                    in {''}
                    <p className="inline-block font-semibold">
                      {daysRemaining(reservation.startDate)}
                    </p>{' '}
                    days
                  </>
                ) : (
                  <p className="inline-block font-semibold">Ready? </p>
                )}
              </span>
            </p>
          </div>
        ) : (
          <p className="pt-2 text-muted-foreground">
            <span className="font-medium text-black">€ {price}</span> night
          </p>
        )}
      </Link>
    </div>
  );
};

export default ListingCard;
