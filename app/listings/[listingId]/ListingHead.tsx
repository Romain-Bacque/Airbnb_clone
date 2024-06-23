import { SafeListing, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import { FC, useMemo } from "react";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import useCountries from "@/app/hooks/useCountries";
import Image from "next/image";
import HeartButton from "@/app/components/HeartButton";

interface ListingHeadProps {
  currentUser?: SafeUser | null;
  listing: SafeListing & { user: SafeUser };
  locationValue: string;
  imageSrc: string;
}

const ListingHead: FC<ListingHeadProps> = ({
  currentUser,
  listing,
  locationValue,
  imageSrc,
}) => {
  const { getByValue } = useCountries();

  // useMemo is here used to memoize the location value (if one of the dependencies changes, the value will be recalculated, otherwise it will be reused from the previous render)
  // because getByValue is defined in a custom hook, it will not change between renders, so we can safely use it as a dependency
  const location = useMemo(() => {
    return getByValue(locationValue);
  }, [getByValue, locationValue]);

  return (
    <>
      <Heading
        title={listing.title}
        subtitle={location?.label + ", " + location?.region}
      />
      <div className="flex flex-col gap-2 w-full mt-4">
        <div
          className="
          h-[60vh]
          w-full
          relative
          overflow-hidden
          rounded-xl
        "
        >
          <Image
            fill // fill prop is a boolean that causes the image to fill the parent element, which is useful when the width and height are unknown or dynamic
            alt="Listing"
            src={imageSrc}
            objectFit="cover"
            className="
              group-hover:scale-110
              transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingHead;
