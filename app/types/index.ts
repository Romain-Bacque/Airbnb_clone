import { Listing, Reservation, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "emailVerified" | "createdAt" | "updatedAt"
> & {
  emailVerified: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeReservation = Omit<Reservation, "createdAt"> & {
  createdAt: string;
};

export interface Country {
  latlng?: (number | undefined)[];
  label: string;
  value: string;
  flag: string;
  region: string;
}

export type FormValues = {
  category: string;
  location: Country | null | undefined;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  description: string;
  title: string;
  price: number;
};
export type Ids = keyof FormValues;
