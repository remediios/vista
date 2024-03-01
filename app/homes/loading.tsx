import LoadingSkeleton from '../components/LoadingSkeleton';

const UserHomesLoading = () => {
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      <LoadingSkeleton />
    </section>
  );
};

export default UserHomesLoading;
