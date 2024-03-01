import LoadingSkeleton from '../components/LoadingSkeleton';

const FavouritesLoading = () => {
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Favourites</h2>
      <LoadingSkeleton />
    </section>
  );
};

export default FavouritesLoading;
