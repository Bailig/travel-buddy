import { useFormik } from "formik";
import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import { array, date, number, object, string } from "yup";
import { Button, ErrorMessage } from "../components";
import { CityCombobox } from "./city-combobox";

const validationSchema = object({
  originCity: string().required("You must choose the city of origin!"),
  destinationCities: array()
    .of(string().required("You must choose the city of destination!"))
    .min(1, "You must choose the city of destination!")
    .required(),
  date: date()
    .nullable()
    .default(undefined)
    .required("You must choose the date!"),
  passengerCount: number()
    .min(1, "You must have at least one passenger!")
    .required("You must input the number of passengers!"),
});

const update = <T,>(index: number, value: T, list: T[]) => [
  ...list.slice(0, index),
  value,
  ...list.slice(index + 1),
];

export interface SearchFormValues {
  originCity: string;
  destinationCities: string[];
  date?: Date;
  passengerCount: number;
}

export interface SearchFormProps {
  initialValues: SearchFormValues;
  onSubmit: (values: SearchFormValues) => void;
  onChange: (values: SearchFormValues) => void;
}

export const SearchForm: FC<SearchFormProps> = (props) => {
  const { initialValues, onSubmit, onChange } = props;
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const [destinationCityCount, setDestinationCityCount] = useState(
    Math.max(initialValues.destinationCities.length, 1),
  );

  const errorVisible = () => {
    return (
      formik.isSubmitting ||
      // eslint-disable-next-line unicorn/no-array-reduce
      Object.entries(formik.errors).reduce(
        (accumulator, [key, value]) =>
          accumulator ||
          (Boolean(value) &&
            Boolean(formik.touched[key as keyof SearchFormValues])),
        false,
      )
    );
  };

  const handleAddDestination = () => {
    formik.setValues(
      (value) => ({
        ...value,
        destinationCities: [...value.destinationCities, ""],
      }),
      false,
    );
    setDestinationCityCount((d) => d + 1);
  };

  const handleRemoveDestination = () => {
    formik.setValues(
      (value) => ({
        ...value,
        destinationCities: value.destinationCities.slice(0, -1),
      }),
      false,
    );
    setDestinationCityCount((d) => d - 1);
  };

  const handleOriginCityChange = (value: string) => {
    onChange({
      ...formik.values,
      originCity: value,
    });
    formik.setFieldValue("originCity", value);
  };

  const handleDestinationCitiesChange = (value: string, index: number) => {
    onChange({
      ...formik.values,
      destinationCities: update(index, value, formik.values.destinationCities),
    });
    formik.setFieldValue(`destinationCities[${index}]`, value);
  };

  const handlePassengerCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    onChange({
      ...formik.values,
      passengerCount: Number.parseInt(event.target.value, 10),
    });
    formik.setFieldValue("passengerCount", event.target.value);
  };

  const handleDateChange = (date: Date) => {
    onChange({
      ...formik.values,
      date,
    });
    formik.setFieldValue("date", date);
  };

  return (
    <form
      aria-label="Search form"
      onSubmit={formik.handleSubmit}
      className="grid gap-1 px-8"
    >
      <div>
        <CityCombobox
          value={formik.values.originCity}
          onChange={handleOriginCityChange}
          inputProps={{
            onBlur: formik.handleBlur,
            name: "originCity",
            placeholder: "Choose starting city...",
          }}
        />
        <ErrorMessage
          touched={formik.touched.originCity}
          error={formik.errors.originCity}
        />
      </div>

      {Array.from({ length: destinationCityCount }).map((_, index) => (
        <div key={index} className="relative">
          <CityCombobox
            value={formik.values.destinationCities[index]}
            onChange={(value) => handleDestinationCitiesChange(value, index)}
            inputProps={{
              onBlur: formik.handleBlur,
              name: `destinationCities[${index}]`,
              placeholder: "Choose destination...",
            }}
          />
          {index > 0 && index === destinationCityCount - 1 && (
            <button
              className="absolute -right-2 top-[20px] -translate-y-1/2 translate-x-full"
              type="button"
              onClick={handleRemoveDestination}
            >
              <FaTimesCircle className="h-5 w-5" />
            </button>
          )}
          <ErrorMessage
            className="col-span-2"
            touched={formik.touched.destinationCities}
            error={
              Array.isArray(formik.errors.destinationCities)
                ? formik.errors.destinationCities[index]
                : formik.errors.destinationCities
            }
          />
        </div>
      ))}

      {formik.values.originCity !== "" &&
        formik.values.destinationCities.length === destinationCityCount &&
        formik.values.destinationCities.every(Boolean) && (
          <Button className="mb-6" onClick={handleAddDestination}>
            <FaPlusCircle className="h-5 w-5" />
            Add destination
          </Button>
        )}

      <div>
        <input
          className="input"
          type="number"
          name="passengerCount"
          placeholder="Input number of passengers..."
          value={formik.values.passengerCount}
          onBlur={formik.handleBlur}
          onChange={handlePassengerCountChange}
        />
        <ErrorMessage
          touched={formik.touched.passengerCount}
          error={formik.errors.passengerCount}
        />
      </div>

      <div>
        <DatePicker
          className="input"
          minDate={new Date()}
          name="date"
          placeholderText="Pick date..."
          selected={formik.values.date}
          onChange={handleDateChange}
          onBlur={formik.handleBlur}
        />
        <ErrorMessage
          touched={formik.touched.date}
          error={formik.errors.date as string}
        />
      </div>

      <Button
        className="bg-primary text-white"
        type="submit"
        disabled={errorVisible()}
      >
        Submit
      </Button>
    </form>
  );
};
