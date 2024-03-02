'use server';
import prisma from '@/app/lib/db';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
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
  } else if (data.addedCategory && !data.addedDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    !data.addedLocation
  ) {
    return redirect(`/create/${data.id}/address`);
  } else if (
    data.addedCategory &&
    data.addedDescription &&
    data.addedLocation
  ) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get('categoryName') as string;
  const homeId = formData.get('homeId') as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addedCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescription(formData: FormData) {
  const homeId = formData.get('homeId') as string;

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = formData.get('price');
  const imageFile = formData.get('image') as File;

  const guestsNr = formData.get('guestCounter') as string;
  const roomsNr = formData.get('roomCounter') as string;
  const bathroomsNr = formData.get('bathroomCounter') as string;

  const { data: imageSupabaseData } = await supabase.storage
    .from('images')
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      contentType: 'image/png',
      cacheControl: '2592000', //1-year-of-caching
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title,
      description,
      price: Number(price),
      guests: guestsNr,
      bedrooms: roomsNr,
      bathrooms: bathroomsNr,
      photo: imageSupabaseData?.path,
      addedDescription: true,
    },
  });

  return redirect(`/create/${homeId}/address`);
}

export async function createAddressLocation(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const countryValue = formData.get('countryValue') as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      country: countryValue,
      addedLocation: true,
    },
  });

  return redirect(`/`);
}

export async function addToFavourite(formData: FormData) {
  const homeId = formData.get('homeId') as string;
  const userId = formData.get('userId') as string;
  const pathName = formData.get('pathName') as string;

  const data = await prisma.favourite.create({
    data: {
      homeId: homeId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function deleteFromFavourite(formData: FormData) {
  const favouriteId = formData.get('favouriteId') as string;
  const userId = formData.get('userId') as string;
  const pathName = formData.get('pathName') as string;

  const data = await prisma.favourite.delete({
    where: {
      id: favouriteId,
      userId,
    },
  });

  revalidatePath(pathName);
}

export async function createReservation(formData: FormData) {
  const userId = formData.get('userId') as string;
  const homeId = formData.get('homeId') as string;
  const startDate = formData.get('startDate') as string;
  const endDate = formData.get('endDate') as string;

  const data = await prisma.reservation.create({
    data: {
      userId,
      endDate,
      startDate,
      homeId,
    },
  });

  return redirect(`/`);
}
