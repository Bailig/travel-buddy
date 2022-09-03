import { useDebouncedCallback } from "@react-hookz/web";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { Combobox, ComboboxProps } from "../components";
import { fetchCities } from "../fake-api";

export type OriginCityFieldProps = Pick<
  ComboboxProps,
  "inputProps" | "value" | "onChange"
>;

const getCities = async (keyword: string) =>
  keyword ? fetchCities(keyword) : [];

export const CityCombobox: FC<OriginCityFieldProps> = (props) => {
  const [keyword, setKeyword] = useState("");
  const {
    data: cities = [],
    isFetching,
    isError,
  } = useQuery(["cities", keyword], () => getCities(keyword), {
    enabled: Boolean(keyword),
  });

  const handleInputChange = useDebouncedCallback(
    (value: string) => setKeyword(value),
    [],
    250,
  );

  return (
    <Combobox
      {...props}
      errorMessage={isError ? "Oops! Something went wrong!" : undefined}
      options={cities}
      loading={isFetching}
      onInputChange={handleInputChange}
    />
  );
};
