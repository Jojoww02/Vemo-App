import React from "react";
import { cn, toCamelCase } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | boolean;
  isFill?: string | boolean;
}

export default function Input(props: Props): JSX.Element {
  const { label, error, isFill, ...otherProps } = props;
  const { register } = useFormContext();

  return (
    <div
      className={cn(
        "relative border-2 border-gray-400 rounded-lg p-1 px-4 sm:py-3",
        error && "border-red-500"
      )}
    >
      <label
        className={cn(
          "absolute -top-3 left-5 text-sm sm:text-lg bg-white px-2 lg:px-4 font-medium transition-all duration-100 ease-in-out text-dark",
          isFill && "text-primary italic"
        )}
      >
        {label}
      </label>
      <input
        placeholder={label}
        className="w-full outline-none py-2 font-sans text-black text-sm lg:text-base"
        {...register(toCamelCase(label))}
        {...otherProps}
      />
    </div>
  );
}
