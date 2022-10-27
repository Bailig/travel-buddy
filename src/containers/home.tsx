import "react-datepicker/dist/react-datepicker.css";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { SearchForm, SearchFormValues } from "./search-form";

const formValueToSearchParams = (values: SearchFormValues) => ({
  ...values,
  date: values.date?.toISOString() || "",
  passengerCount: String(values.passengerCount),
});

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialDate = searchParams.get("date");
  const initialValues: SearchFormValues = {
    originCity: searchParams.get("originCity") || "",
    destinationCities: searchParams.getAll("destinationCities") || [],
    date: initialDate ? new Date(initialDate) : undefined,
    passengerCount: Number(searchParams.get("passengerCount")) || 1,
  };

  const navigate = useNavigate();

  const handleChange = (values: SearchFormValues) => {
    setSearchParams(formValueToSearchParams(values));
  };

  const handleSubmit = (values: SearchFormValues) => {
    navigate({
      pathname: "/result",
      search: `?${createSearchParams(formValueToSearchParams(values))}`,
    });
  };

  return (
    <main
      aria-label="Home"
      className="mx-auto mt-8 max-w-md rounded-lg bg-white p-10"
    >
      <SearchForm
        initialValues={initialValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default Home;
