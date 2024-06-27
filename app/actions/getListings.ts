// actions folder is used to store functions that interact with the database or external services, we can use these functions in our components to fetch data or perform actions. In this case, we have a getCurrentUser function that fetches the current user from the database using the session information. We can use this function in our layout component to get the current user and pass it as a prop to the NavBar component. This way, we can conditionally render different components based on the user's authentication status. For example, we can show the UserMenu component if the user is authenticated, or show the LoginModal and RegisterModal components if the user is not authenticated. This separation of concerns makes our code more modular and easier to maintain.

import prisma from "@/app/libs/prismadb";

interface IListingParams {
  userId?: string;
  locationValue?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
}

export default async function getListings(params: IListingParams = {}) {
  try {
    const {
      userId,
      locationValue,
      category,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
    } = params;

    const query: any = {};

    if (userId) {
      query.userId = userId;
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (category) {
      query.category = category;
    }
    if (guestCount) {
      query.guestCount = {
        gte: +guestCount, // + is used to convert the string to a number
      };
    }
    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }
    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }
    if (startDate && endDate) {
      // Check if the listing is available for the selected date range
      query.NOT = { // NOT is used to negate the condition inside it (i.e., the listing should not have any reservations that overlap with the selected date range)
        reservations: {
          some: { // some is used to check if there is at least one reservation that satisfies the condition inside it, if we don't use some, it will check if all reservations satisfy the condition
            OR: [ // OR is used to check if any of the conditions inside it are true
              // Check if the reservation overlaps with the selected date range
              // First, we check if the reservation overlaps with the selected start date
              {
                endDate: { gte: startDate }, // Check if the reservation end date is after the selected start date
                startDate: { lte: startDate }, // Check if the reservation start date is before the selected start date
              },
              // then, we check if the reservation overlaps with the selected end date
              {
                startDate: { lte: endDate }, // Check if the reservation start date is before the selected end date
                endDate: { gte: endDate }, // Check if the reservation end date is after the selected end date
              },
            ],
          },
        },
      };
      // to wrap up, the query checks if there are any reservations that overlap with the selected date range, and if there are, it excludes those listings from the search results
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    });

    const formattedListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return formattedListings;
  } catch (error: any) {
    throw new Error(error); // next.js will handle the error and show an error page to the user
  }
}
