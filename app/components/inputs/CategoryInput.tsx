"use client";

import { FC } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: FC<CategoryInputProps> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        flex-col
        gap-3
        p-4
        rounded-xl
        border-2
        hover:border-black
        transition
        cursor-pointer
        ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <Icon size={32} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
