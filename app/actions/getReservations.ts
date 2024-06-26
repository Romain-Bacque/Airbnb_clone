// actions folder is used to store functions that interact with the database or external services, we can use these functions in our components to fetch data or perform actions. In this case, we have a getCurrentUser function that fetches the current user from the database using the session information. We can use this function in our layout component to get the current user and pass it as a prop to the NavBar component. This way, we can conditionally render different components based on the user's authentication status. For example, we can show the UserMenu component if the user is authenticated, or show the LoginModal and RegisterModal components if the user is not authenticated. This separation of concerns makes our code more modular and easier to maintain.

import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { userId, authorId, listingId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId }; // userId represents the owner of the listing
    }

    const reservations = await prisma.reservation.findMany({
      where: query, // depending on the query, we can filter the reservations by listingId, userId, or authorId
      include: {
        listing: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedReservations = reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing?.createdAt.toISOString(),
      },
    }));

    return formattedReservations;
  } catch (error: any) {
    throw new Error(error); // next.js will handle the error and show an error page to the user
  }
}
