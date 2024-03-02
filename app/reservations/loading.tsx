import LoadingSkeleton from '../components/LoadingSkeleton';

const ReservationsLoading = () => {
  return (
    <section className="container mx-atuo px-5 lg:px-10 mt-10 mb-20">
      <h2 className="text-3xl font-semibold tracking-tight">
        Your Reservations
      </h2>
      <LoadingSkeleton />
    </section>
  );
};

export default ReservationsLoading;
