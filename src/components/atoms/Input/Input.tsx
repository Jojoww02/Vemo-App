import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils/style";
import { isObjectEmpty } from "@/lib/utils/common";
import { Controller, useFormContext } from "react-hook-form";
import { IconEdit, IconEye, IconEyeOff } from "@tabler/icons-react";
import { ToogleIcon } from "@/components/atoms";
import { XCircle } from "lucide-react";
import useUpdateEmail from "@/hooks/store/useUpdateEmail";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  isFill?: string | boolean;
  type: HTMLInputTypeAttribute;
  children?: React.ReactNode;
  editable?: boolean;
  defaultValue?: string;
  className?: string;
}

export default function Input(props: Props): JSX.Element {
  const {
    name,
    label,
    isFill,
    type,
    editable,
    children,
    defaultValue = "",
    className = "",
    ...otherProps
  } = props;

  const constantValue = defaultValue;
  const [value, setValue] = React.useState(constantValue);
  const [isEdit, setIsEdit] = React.useState(!otherProps.disabled);
  const [isEyeIconOpen, setIsEyeIconOpen] = React.useState(false);

  const { toogleIsUpdateEmail } = useUpdateEmail();

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <div>
      {/* Input */}
      <div
        className={cn(
          "relative border-2 border-gray-400 rounded-lg px-4",
          (errors[name]?.message as string) && "border-red-500"
        )}
      >
        {/* Label */}
        <label
          htmlFor={name}
          className={cn(
            "absolute -top-3 left-5 text-[11px] xs:text-sm lg:text-base bg-white px-2 lg:px-4 font-medium transition-all duration-100 ease-in-out text-dark",
            isFill && "text-primary italic"
          )}
        >
          {label}
        </label>
        {/* Input type select */}
        {type === "select" ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <select {...field} className="my-1 py-2 bg-white w-full">
                <option selected disabled>
                  {otherProps.placeholder}
                </option>
                {children}
              </select>
            )}
          />
        ) : (
          // Input type other than select type
          <React.Fragment>
            {/* Editable input */}
            {editable ? (
              <input
                {...register(name)}
                {...otherProps}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                id={name}
                placeholder={otherProps.placeholder || label}
                className={cn(
                  "w-full h-full outline-none py-3 font-sans text-black text-[10px] lg:text-base placeholder:text-sm",
                  !isEdit && "text-slate-400",
                  className
                )}
                type={isEyeIconOpen ? "text" : type}
                autoComplete="off"
                disabled={!isEdit}
              />
            ) : // Non-editable input
            type === "textarea" ? (
              <textarea
                {...register(name)}
                id={name}
                placeholder={otherProps.placeholder || label}
                className={cn(
                  "w-full h-full outline-none py-3 font-sans text-black text-sm lg:text-base placeholder:text-sm",
                  className
                )}
                autoComplete="off"
                defaultValue={defaultValue}
              />
            ) : (
              <input
                {...register(name)}
                {...otherProps}
                id={name}
                placeholder={otherProps.placeholder || label}
                className={cn(
                  "w-full h-full outline-none py-3 font-sans text-black text-sm lg:text-base placeholder:text-sm",
                  className
                )}
                type={isEyeIconOpen ? "text" : type}
                autoComplete="off"
                defaultValue={defaultValue}
              />
            )}
            {/* Input type password */}
            {type === "password" && (
              <span className="absolute right-[5%] top-1/2 -translate-y-1/2 text-gray-700">
                <ToogleIcon
                  iconOpen={<IconEye />}
                  iconClose={<IconEyeOff />}
                  isOpen={isEyeIconOpen}
                  onClick={() => setIsEyeIconOpen(!isEyeIconOpen)}
                />
              </span>
            )}
            {/* Edit option if editable input */}
            {editable && (
              <span className="absolute right-[5%] top-1/2 -translate-y-1/2 text-blue-400">
                <ToogleIcon
                  iconOpen={<IconEdit />}
                  iconClose={<XCircle />}
                  isOpen={isEdit}
                  onClick={() => {
                    setIsEdit(!isEdit);
                    toogleIsUpdateEmail();
                    if (isEdit) {
                      setValue(defaultValue);
                    }
                  }}
                />
              </span>
            )}
          </React.Fragment>
        )}
      </div>
      {/* Error message */}
      {!isObjectEmpty(errors) && (
        <p className="pl-1 mt-1 text-xs text-red-300 italic">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
}
