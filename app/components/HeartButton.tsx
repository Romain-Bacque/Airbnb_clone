"use client";

import { FC } from "react";
import { SafeUser } from "../types";
import { BiHeart } from "react-icons/bi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: FC<HeartButtonProps> = ({ currentUser, listingId }) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    currentUser,
    listingId,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        className="fill-white absolute -top-[2px] -right-[2px]" // -top-[2px] -right-[2px] is used to center the icon inside the parent element to fit the AiFillHeart icon
        size={28}
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
