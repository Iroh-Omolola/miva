import React from "react";

interface Props {
  type: string;
  label?: string;
  isRequired?: boolean;
  name?: string;
  className?: string;
  defaultValue?: string;
  placeholder: string;
  maxLength?: number;
  minLength?: number;
  value?: string | number;
  isPassword?: boolean;
  isRegister?: boolean;
  disabled?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  isPasswordVisible?: boolean;
  onTogglePasswordVisibility?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const TextInput = ({
  type,
  label,
  isRequired,
  placeholder,
  isPassword,
  isRegister,
  defaultValue,
  name,
  onTogglePasswordVisibility,
  onChange,
  isPasswordVisible,
  value,
  disabled,
  maxLength,
  minLength,
  onKeyDown,
  className
}: Props) => {
  return (
    <div className="w-full">
      <div className="w-full">
        <p className="text-[#4A564D] text-sm leading-[20px] font-onestMedium">
          {label} {isRequired && <span className="text-[#BA3838]">*</span>}
        </p>
        <div
          className={`flex ${className} mt-[8px] ${disabled && "bg-[#E6E8E6]"} 
         `}
        >
          <input
            type={type}
            value={value}
            name={name}
            defaultValue={defaultValue}
            className=" py-2 text-[#161718] !border rounded !ring-0 pl-3 outline-none !bg-transparent  w-full placeholder:text-[#9899A1] placeholder:text-sm "
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            maxLength={maxLength}
            onKeyDown={onKeyDown}
            minLength={minLength}
          />
          {isPassword && (
            <button
              className=" text-textColorGreen pr-3"
              onClick={onTogglePasswordVisibility}
            >
              {!isPasswordVisible ? (
                <img
                  src="/images/hide-password.png"
                  alt="hide-password-icon"
                  className="h-5 w-5"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="13"
                  viewBox="0 0 20 13"
                  fill="none"
                >
                  <path
                    d="M9.99967 10.333C11.0413 10.333 11.9268 9.96842 12.6559 9.23926C13.3851 8.51009 13.7497 7.62467 13.7497 6.58301C13.7497 5.54134 13.3851 4.65592 12.6559 3.92676C11.9268 3.19759 11.0413 2.83301 9.99967 2.83301C8.95801 2.83301 8.07259 3.19759 7.34342 3.92676C6.61426 4.65592 6.24967 5.54134 6.24967 6.58301C6.24967 7.62467 6.61426 8.51009 7.34342 9.23926C8.07259 9.96842 8.95801 10.333 9.99967 10.333ZM9.99967 8.83301C9.37467 8.83301 8.84342 8.61426 8.40592 8.17676C7.96842 7.73926 7.74967 7.20801 7.74967 6.58301C7.74967 5.95801 7.96842 5.42676 8.40592 4.98926C8.84342 4.55176 9.37467 4.33301 9.99967 4.33301C10.6247 4.33301 11.1559 4.55176 11.5934 4.98926C12.0309 5.42676 12.2497 5.95801 12.2497 6.58301C12.2497 7.20801 12.0309 7.73926 11.5934 8.17676C11.1559 8.61426 10.6247 8.83301 9.99967 8.83301ZM9.99967 12.833C7.9719 12.833 6.12467 12.267 4.45801 11.1351C2.79134 10.0031 1.58301 8.48579 0.833008 6.58301C1.58301 4.68023 2.79134 3.16287 4.45801 2.03092C6.12467 0.89898 7.9719 0.333008 9.99967 0.333008C12.0275 0.333008 13.8747 0.89898 15.5413 2.03092C17.208 3.16287 18.4163 4.68023 19.1663 6.58301C18.4163 8.48579 17.208 10.0031 15.5413 11.1351C13.8747 12.267 12.0275 12.833 9.99967 12.833ZM9.99967 11.1663C11.5691 11.1663 13.0101 10.7531 14.3226 9.92676C15.6351 9.10037 16.6386 7.98579 17.333 6.58301C16.6386 5.18023 15.6351 4.06565 14.3226 3.23926C13.0101 2.41287 11.5691 1.99967 9.99967 1.99967C8.43023 1.99967 6.98926 2.41287 5.67676 3.23926C4.36426 4.06565 3.36079 5.18023 2.66634 6.58301C3.36079 7.98579 4.36426 9.10037 5.67676 9.92676C6.98926 10.7531 8.43023 11.1663 9.99967 11.1663Z"
                    fill="#9899A1"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {isPassword && isRegister && (
          <p className="text-xs font-onestMedium text-[#4A564D] mt-1">
            Password must have 8 characters
          </p>
        )}
      </div>
    </div>
  );
};
