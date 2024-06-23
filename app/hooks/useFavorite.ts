import axios from "axios";
import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { SafeUser } from "../types";
import { MouseEvent, useCallback, useMemo } from "react";
import toast from "react-hot-toast";

interface IUserFavorite {
  currentUser?: SafeUser | null;
  listingId: string;
}

const useFavorite = ({ currentUser, listingId }: IUserFavorite) => {
  const router = useRouter();
  const { onOpen } = useLoginModal();

  const hasFavorite = useMemo(() => {
    return currentUser?.favoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (!currentUser) {
        onOpen();
      }

      let request = null;
      let message = "";

      if (!hasFavorite) {
        request = axios.post(`/api/favorites/${listingId}`);
        message = "Added to favorites";
      } else {
        request = axios.delete(`/api/favorites/${listingId}`);
        message = "Removed from favorites";
      }
      
      try {
        await request;
        toast.success(message);
        router.refresh(); // refresh the page to update the UI (e.g., change the heart icon)
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    },
    [currentUser, hasFavorite, listingId, onOpen, router]
  );

  return { toggleFavorite, hasFavorite };
};

export default useFavorite;
