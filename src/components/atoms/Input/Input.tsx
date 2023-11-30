import React from "react";
import { cn } from "@/lib/utils/style";
import { isObjectEmpty, toCamelCase } from "@/lib/utils/common";
import { useFormContext } from "react-hook-form";
import { EyeIcon } from "..";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  isFill?: string | boolean;
}

export default function Input(props: Props): JSX.Element {
  const { label, isFill, ...otherProps } = props;
  const [isEyeIconOpen, setIsEyeIconOpen] = React.useState(false);
  const name: string = toCamelCase(label);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <div
        className={cn(
          "relative border-2 border-gray-400 rounded-lg p-1 px-4",
          (errors[name]?.message as string) && "border-red-500"
        )}
      >
        <label
          htmlFor={name}
          className={cn(
            "absolute -top-3 left-5 text-sm sm:text-base bg-white px-2 lg:px-4 font-medium transition-all duration-100 ease-in-out text-dark",
            isFill && "text-primary italic"
          )}
        >
          {label}
        </label>
        <input
          {...register(name)}
          {...otherProps}
          id={name}
          placeholder={label}
          className="w-full outline-none py-2 font-sans text-black text-sm lg:text-base placeholder:text-sm"
          type={isEyeIconOpen ? "text" : otherProps.type}
          autoComplete="off"
        />
        {otherProps.type === "password" && (
          <span className="absolute right-[5%] top-1/2 -translate-y-1/2 text-gray-700">
            <EyeIcon
              open={isEyeIconOpen}
              onClick={() => setIsEyeIconOpen(!isEyeIconOpen)}
            />
          </span>
        )}
      </div>
      {!isObjectEmpty(errors) && (
        <p className="pl-1 mt-1 text-xs text-red-300 italic">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
