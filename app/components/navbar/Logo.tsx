"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function Logo() {
  const router = useRouter();

  return (
    <Image
      alt="Airbnb"
      width={100}
      height={100}
      src="/images/airbnb_logo.png"
      onClick={() => router.push("/")}
    />
  );
}

export default Logo;
