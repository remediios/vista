'use server';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';

export async function createRentalHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: 'desc',
    },
  });

  if (data === null) {
    //does a user have an home
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });
    return redirect(`/create/${data.id}/structure`);
  } else if (
    !data.addedCategory &&
    !data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/structure`);
  } else if (!data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string;
  const homeId = formData.get('homeId') as string;
  const data = await prisma.home.update({
    where: {
      id: homeId as string,
    },
    data: {
      categoryName: categoryName as string,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}
