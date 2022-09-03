import { useFormik } from "formik";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusCircle, FaTimesCircle } from "react-icons/fa";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { array, date, number, object, string } from "yup";
import { ErrorMessage } from "../components";
import { CityCombobox } from "./city-combobox";

interface FormValues {
  originCity: string;
  destinationCities: string[];
  date?: Date;
  passengerCount: number;
}

const validationSchema = object({
  originCity: string().required("You must choose the city of origin!"),
  destinationCities: array()
    .of(string().required("You must choose the city of destination!"))
    .min(1)
    .required(),
  date: date()
    .nullable()
    .default(undefined)
    .min(new Date(), "You must pick a future date!")
    .required("You must choose the date!"),
  passengerCount: number()
    .min(1, "You must have at least one passenger!")
    .required("You must input the number of passengers!"),
});

const Home = () => {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get("date");
  const initialValues: FormValues = {
    originCity: searchParams.get("originCity") || "",
    destinationCities: searchParams.get("destinationCities")?.split(",") || [],
    date: initialDate ? new Date(initialDate) : undefined,
    passengerCount: Number(searchParams.get("passengerCount")),
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({
          ...values,
          date: values.date!.toISOString(),
          passengerCount: String(values.passengerCount),
        })}`,
      });
    },
  });
  const [destinationCityCount, setDestinationCityCount] = useState(1);

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

  return (
    <main
      aria-label="Home"
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-10"
    >
      <form
        aria-label="Search form"
        onSubmit={formik.handleSubmit}
        className="grid gap-1 px-8"
      >
        <div>
          <CityCombobox
            value={formik.values.originCity}
            onChange={(value) => formik.setFieldValue("originCity", value)}
            inputProps={{
              onBlur: formik.handleBlur,
              name: "originCity",
              placeholder: "Choose starting city...",
            }}
          />
          <ErrorMessage error={formik.errors.originCity} />
        </div>

        {Array.from({ length: destinationCityCount }).map((_, index) => (
          <div key={index} className="relative">
            <CityCombobox
              value={formik.values.destinationCities[index]}
              onChange={(value) =>
                formik.setFieldValue(`destinationCities[${index}]`, value)
              }
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
            <button
              className="mb-6 flex items-center justify-center gap-2 px-4 py-2 duration-200 active:scale-95"
              type="button"
              onClick={handleAddDestination}
            >
              <FaPlusCircle className="h-5 w-5" />
              Add destination
            </button>
          )}

        <div>
          <input
            type="number"
            name="passengerCount"
            className="w-full rounded-lg bg-gray-200 py-2 px-4"
            placeholder="Input number of passengers..."
            value={formik.values.passengerCount}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <ErrorMessage error={formik.errors.passengerCount} />
        </div>

        <div>
          <DatePicker
            className=" w-full rounded-lg bg-gray-200 px-4 py-2"
            placeholderText="Pick date..."
            selected={formik.values.date}
            onChange={(date: Date) => formik.setFieldValue("date", date)}
            onBlur={formik.handleBlur}
          />
          <ErrorMessage error={formik.errors.date as string} />
        </div>

        <button
          className="rounded-lg bg-primary px-4 py-2 text-white duration-200 active:scale-95 disabled:scale-100 disabled:opacity-40"
          type="submit"
          disabled={
            formik.isSubmitting || Object.keys(formik.errors).length > 0
          }
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default Home;
