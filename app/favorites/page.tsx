import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import FavoritesClient from "./FavoritesClient";
import { SafeListing } from "../types";
import getUserFavorites from "../actions/getFavorites";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const favorites = await getUserFavorites({
    userId: currentUser.id,
    favoritesIds: currentUser.favoriteIds,
  });

  if (favorites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorite found"
          subtitle="Looks like you haven't any favorite."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        favorites={favorites as SafeListing[]}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
