"use client";

import { FC, useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string"; // qs is a library that provides a way to parse and stringify query strings.
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  description: string;
  selected?: boolean;
}

const CategoryBox: FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString()); // params.toString() return the query string (ex: "category=Windmills"), qs.parse() will convert it to an object (ex: { category: "Windmills" })
    }

    // Update the query string with the new category
    const updatedQuery: any = {
      ...currentQuery,
      category: label, // the new category replaces the old one
    };

    // If the category is already selected, remove it from the query string
    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    // finally, update the URL with the new query string
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true } // skipNull will remove any query parameter with a null value
    );

    router.push(url); // push the new URL to the router
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
