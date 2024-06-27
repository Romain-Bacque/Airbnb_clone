"use client";

// because we only import this component in the reservations page, we don't need to store it in the components folder.
import { FC, useCallback, useState } from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { SafeReservation, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser: SafeUser;
}

const ReservationsClient: FC<ReservationsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const handleCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Failed to cancel reservation", error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
      />
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
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            currentUser={currentUser}
            actionId={reservation.id}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Guest Reservation"
            onAction={handleCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
