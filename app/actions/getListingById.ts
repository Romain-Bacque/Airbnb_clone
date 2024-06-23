// actions folder is used to store functions that interact with the database or external services, we can use these functions in our components to fetch data or perform actions. In this case, we have a getCurrentUser function that fetches the current user from the database using the session information. We can use this function in our layout component to get the current user and pass it as a prop to the NavBar component. This way, we can conditionally render different components based on the user's authentication status. For example, we can show the UserMenu component if the user is authenticated, or show the LoginModal and RegisterModal components if the user is not authenticated. This separation of concerns makes our code more modular and easier to maintain.

import prisma from "@/app/libs/prismadb";

export default async function getListingById(listingId?: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
        reservations: true,
      },
    });

    if (!listing) {
      return null;
    }

    const formattedReservations = listing.reservations.map((reservation) => ({
      ...reservation,
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      createdAt: reservation.createdAt.toISOString(),
    }));

    const formattedListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toString() || null,
      },
      reservations: formattedReservations,
    };

    return formattedListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
