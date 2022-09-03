import { Combobox as ComboboxBase, Transition } from "@headlessui/react";
import React, { FC, Fragment, useRef } from "react";
import { FaSpinner } from "react-icons/fa";

export interface ComboboxProps {
  value: string;
  options: string[];
  loading?: boolean;
  errorMessage?: string;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  onChange: (value: string) => void;
  onInputChange: (value: string) => void;
}

export const Combobox: FC<ComboboxProps> = (props) => {
  const {
    value,
    options,
    loading,
    inputProps,
    errorMessage,
    onChange,
    onInputChange,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleLeave = () => {
    if (options.length === 0) {
      onChange("");
    }
    onInputChange("");
  };

  return (
    <div className="relative">
      <ComboboxBase value={value} onChange={onChange}>
        <ComboboxBase.Input
          {...inputProps}
          ref={inputRef}
          className="w-full rounded-lg bg-gray-200 py-2 px-4"
          onChange={(event) => onInputChange(event.target.value)}
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          beforeLeave={handleLeave}
        >
          <ComboboxBase.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {errorMessage && (
              <div className="cursor-default select-none py-2 px-4 text-red-600">
                {errorMessage}
              </div>
            )}
            {loading && (
              <div className="grid cursor-default select-none place-items-center py-4">
                <FaSpinner className="animate-spin" />
              </div>
            )}
            {!errorMessage && !loading && options.length === 0 && (
              <div className="cursor-default select-none py-2 px-4">
                Nothing found.
              </div>
            )}
            {!errorMessage &&
              !loading &&
              options.map((option) => (
                <ComboboxBase.Option
                  key={option}
                  className={({ active }) =>
                    `relative select-none py-2 px-4 ${
                      active ? "bg-primary text-white" : ""
                    }`
                  }
                  value={option}
                >
                  <span className="block truncate">{option}</span>
                </ComboboxBase.Option>
              ))}
          </ComboboxBase.Options>
        </Transition>
      </ComboboxBase>
    </div>
  );
};
