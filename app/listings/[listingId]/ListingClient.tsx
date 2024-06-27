"use client";

// because we only import this component in the listings page, we don't need to store it in the components folder.
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Container from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import {
  differenceInCalendarDays, // differenceInCalendarDays is a function that returns the difference in days between two dates, ignoring daylight saving time
  differenceInDays, // differenceInDays is a function that returns the difference in days between two dates
  eachDayOfInterval,
} from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(), // new Date returns the current date
  endDate: new Date(),
  key: "selection", // key is a property that is used to identify the date range (if we don't use a key, the calendar will not work properly)
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
  listing: SafeListing & { user: SafeUser };
}

const ListingClient: FC<ListingClientProps> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      // eachDayOfInterval create a range of dates between the start and end date
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((category) => category.label === listing.category);
  }, [listing.category]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved!");
        setDateRange(initialDateRange);
        router.push("/trips");
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing?.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    // here we calculate the total price based on the selected date range
    if (dateRange.startDate && dateRange.endDate) {
      // it's preferable to use differenceInCalendarDays instead of differenceInDays when working with dates, because it doesn't take into account daylight saving time, that could lead to unexpected results
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        // we verify if listing.price is not null, because null * dayCount will throw an error or return NaN
        setTotalPrice(listing.price * dayCount);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <Container>
      <ListingHead
        listing={listing}
        locationValue={listing.locationValue}
        currentUser={currentUser}
        imageSrc={listing.imageSrc}
      />
      <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
        <ListingInfo
          user={listing.user}
          category={category}
          description={listing.description}
          roomCount={listing.roomCount}
          guestCount={listing.guestCount}
          bathroomCount={listing.bathroomCount}
          locationValue={listing.locationValue}
        />
        {/* order-first and order-last are utility classes that allow us to change the order of the elements in the grid */}
        {/* calendar must be the first element in the grid on mobile and the last element on desktop */}
        <div className="order-first mb-10 md:order-last md:col-span-3">
          <ListingReservation
            price={listing.price}
            totalPrice={totalPrice}
            onChangeDate={(value) => setDateRange(value)}
            dateRange={dateRange}
            onSubmit={onCreateReservation}
            disabled={isLoading}
            disabledDates={disabledDates}
          />
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
