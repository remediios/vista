import { useCountries } from '@/app/lib/getCountries';
import Image from 'next/image';
import Link from 'next/link';

interface IListingCardProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
}

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
}: IListingCardProps) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(location);

  return (
    <div className="flex flex-col gap-y-2">
      <Link href="/">
        <div className="relative h-72">
          <Image
            src={`https://glwjdwtkbgtpdembqjlt.supabase.co/storage/v1/object/public/images/${imagePath}`}
            alt="home image"
            fill
            className="rounded-lg h-full object-cover mb-2"
          />
        </div>

        <h3 className="font-medium text-base">
          {country?.flag} {country?.label}, {country?.region}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">€ {price}</span> night
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;
