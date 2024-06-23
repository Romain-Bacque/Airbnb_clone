"use client";

import { FC } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: FC<CounterProps> = ({ title, subtitle, value, onChange }) => {
  const onIncrease = () => {
    onChange(value + 1); // increment the value by 1 when the user clicks the + button
  };
  const onDecrease = () => {
    if (value === 1) {
      return;
    }
    onChange(value - 1); // decrement the value by 1 when the user clicks the - button
  };

  return (
    <div className="flex flex-row justify-between gap-4">
      <div className="text-start">
        <div className="text-xl font-bold">{title}</div>
        <div className="font-light text-neutral-500">{subtitle}</div>
      </div>
      <div className="flex flex-row justify-end items-center gap-2">
        <div
          onClick={onDecrease}
          className="w-50 h-50 transition border-[1px] border-neutral-200 rounded-[50%] hover:border-neutral-500 p-2 cursor-pointer"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light">{value}</div>
        <div
          onClick={onIncrease}
          className="w-50 h-50 transition border-[1px] border-neutral-200 rounded-[50%] hover:border-neutral-500 p-2 cursor-pointer"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
