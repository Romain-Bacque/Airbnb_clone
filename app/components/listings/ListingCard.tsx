"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled || !actionId) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  // The function provided to useMemo will be called initially and re-evaluated whenever any of the dependencies (reservation or data.price) change. It ensures that the value price is only recomputed when necessary, optimizing performance in React components.
  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate); // new Date("2021-09-01T00:00:00.000Z") (this format is called ISO 8601)
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`; // "PP" is short for "MM/dd/yyyy"
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square
          w-full
          relative
          overflow-hidden
          rounded-xl
        "
        >
          <Image
            fill // fill prop is a boolean that causes the image to fill the parent element, which is useful when the width and height are unknown or dynamic
            alt="Listing"
            src={data.imageSrc}
            objectFit="cover"
            className="
              group-hover:scale-110
              transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <h3 className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </h3>
        <p className="font-light text-neutral-500">
          {reservationDate || data.category}
        </p>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
