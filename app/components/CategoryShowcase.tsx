import Image from 'next/image';
import { categoryItems } from '../lib/categoryItems';

interface CategoryProps {
  categoryName: string;
}

const CategoryShowcase = ({ categoryName }: CategoryProps) => {
  const categoryData = categoryItems.find(
    (category) => category.name === categoryName
  );

  return (
    <div className="flex items-center">
      <Image
        src={categoryData?.imageUrl as string}
        alt="category image"
        width="40"
        height="40"
      />
      <div className="flex flex-col ml-4">
        <h3 className="font-medium">{categoryData?.title}</h3>
        <p className="text-sm text-muted-foreground">
          {categoryData?.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryShowcase;
