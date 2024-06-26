"use client";

import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: FC<InputProps> = ({
  id,
  label,
  type = "text",
  disabled,
  formatPrice,
  required: isRequired,
  register,
  errors,
}) => {
  let emailOptions = {};

  if (type === "email") {
    emailOptions = {
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Invalid email",
      },
    };
  }

  return (
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute text-neutral-700 top-5 left-2"
        />
      )}
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: { value: !!isRequired, message: `${label} is required` },
          ...emailOptions,
        })}
        placeholder=" "
        type={type}
        className={`
        peer
        w-full
        p-4
        pt-6
        font-light
        bg-white
        border-2
        rounded-md
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${formatPrice ? "pl-9" : "pl-4"}
        ${errors[id] ? "border-rose-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        // peer-placeholder-shown:scale-100 is used to scale the label when the input is empty (placeholder is shown)
        // peer-placeholder-shown:translate-y-0 is used to move the label back to its original position when the input is empty (placeholder is shown)
        // peer-focus:scale-75 is used to scale the label when the input is focused (placeholder is NOT shown)
        // peer-focus:translate-y-4 is used to move the label up when the input is focused (placeholder is NOT shown)
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        z-10
        origin-[0]
        ${formatPrice ? "left-9" : "left-4"}
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {label}
      </label>
      <p className="text-rose-500">{errors[id]?.message?.toString()}</p>
    </div>
  );
};

export default Input;
