import { Combobox as ComboboxBase, Transition } from "@headlessui/react";
import { FC, Fragment, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export interface ComboboxProps {
  value: string;
  options: string[];
  loading?: boolean;
  onChange: (value: string) => void;
}

export const Combobox: FC<ComboboxProps> = (props) => {
  const { value, options, loading, onChange } = props;
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (loading) {
      return [];
    }
    if (query === "") {
      return options;
    }
    return options.filter((option) =>
      option
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, "")),
    );
  }, [loading, options, query]);

  return (
    <div className="relative w-72">
      <ComboboxBase value={value} onChange={onChange}>
        <ComboboxBase.Input
          className=" w-full rounded bg-gray-200 py-2 px-4"
          onChange={(event) => setQuery(event.target.value)}
        />
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxBase.Options className="absolute mt-2 max-h-72 w-full overflow-auto rounded bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {loading && (
              <div className="grid cursor-default select-none place-items-center py-4">
                <FaSpinner className="animate-spin" />
              </div>
            )}
            {!loading && filteredOptions.length === 0 && query !== "" ? (
              <div className="cursor-default select-none py-2 px-4">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option) => (
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
              ))
            )}
          </ComboboxBase.Options>
        </Transition>
      </ComboboxBase>
    </div>
  );
};
