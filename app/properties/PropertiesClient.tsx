"use client";

// because we only import this component in the properties page, we don't need to store it in the components folder.
import { FC, useCallback, useState } from "react";
import Heading from "../components/Heading";
import Container from "../components/Container";
import { SafeListing, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

interface PropertiesClientProps {
  properties: SafeListing[];
  currentUser: SafeUser;
}

const PropertiesClient: FC<PropertiesClientProps> = ({ properties, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const handleCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property Deleted");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Failed to delete property", error);
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
        title="Properties"
        subtitle="Your properties and listings"
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
        {properties?.map((property) => (
          <ListingCard
            key={property.id}
            data={property}
            currentUser={currentUser}
            actionId={property.id}
            disabled={deletingId === property.id}
            actionLabel="Delete Property"
            onAction={handleCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
