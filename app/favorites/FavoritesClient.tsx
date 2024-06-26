"use client";

// because we only import this component in the favorites page, we don't need to store it in the components folder.
import { FC } from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";

interface FavoritesClientProps {
  favorites: SafeListing[];
  currentUser: SafeUser;
}

const FavoritesClient: FC<FavoritesClientProps> = ({
  favorites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading title="Favorites" subtitle="Bookings on your properties" />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8"
      >
        {favorites?.map((favorite) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
