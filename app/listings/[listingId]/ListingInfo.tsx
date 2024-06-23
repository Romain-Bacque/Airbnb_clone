import Avatar from "@/app/components/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { FC } from "react";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import Map from "@/app/components/Map";

interface ListingInfoProps {
  user: SafeUser;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="font-semibold flex flex-row items-center gap-2">
        <h2>Hosted by {user.name}</h2>
        <Avatar src={user?.image} />
      </div>
      <div className="flex flex-row items-center gap-4 py-2 font-light text-neutral-500">
        <div>{guestCount} guests</div>
        <div>{roomCount} rooms</div>
        <div>{bathroomCount} bathrooms</div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
      <hr />
      <p className="text-lg font-light text-neutral-500">{description}</p>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
