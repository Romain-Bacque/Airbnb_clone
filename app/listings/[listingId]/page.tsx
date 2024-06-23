import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import { FC } from "react";
import ListingClient from "./ListingClient";

// We use 'I' to indicate that this is an interface
interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params.listingId);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      // ClientOnly is a component that only renders on the client side,
      // this is useful when we want to fetch data on the server side and render it on the client side.
      // This way, we can avoid rendering the component on the server side and only render it on the client side after the data has been fetched.
      // This can improve performance and reduce the time it takes to load the page.
      <ClientOnly>
        <EmptyState title="Listing not found" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
