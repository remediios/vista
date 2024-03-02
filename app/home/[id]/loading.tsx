import LoadingSkeleton from '@/app/components/LoadingSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

const IndividualHomeLoading = () => {
  return (
    <div className="w-[75%] mx-auto mt-10 mb-20">
      <Skeleton className="w-1/3 h-8" />
      <Skeleton className="w-full h-[550px] mt-5" />
      <div className="mt-8 flex justify-between gap-x-24">
        <div className="w-2/3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-12 w-1/3 mt-3" />
        </div>
        <div className="w-1/3">
          <Skeleton className="w-full h-72" />
        </div>
      </div>
    </div>
  );
};

export default IndividualHomeLoading;
