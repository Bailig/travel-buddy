import { useQuery } from "@tanstack/react-query";
import { Fragment, useMemo } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { calculateDistance } from "../fake-api";

const getDistances = (cities: string[]) => calculateDistance(cities);

const Result = () => {
  const [searchParams] = useSearchParams();
  const initialDate = searchParams.get("date");
  const values = {
    originCity: searchParams.get("originCity") || "",
    destinationCities: searchParams.getAll("destinationCities") || [],
    date: initialDate ? new Date(initialDate) : undefined,
    passengerCount: Number(searchParams.get("passengerCount")),
  };

  const cities = [values.originCity, ...values.destinationCities];
  const { data: cityDistances = [] } = useQuery(
    ["distances", cities],
    () => getDistances(cities),
    {
      suspense: true,
    },
  );

  const totalDistance = useMemo(
    () =>
      cityDistances.reduce(
        (accumulator, { distance }) => accumulator + distance,
        0,
      ),
    [cityDistances],
  );

  return (
    <main
      aria-label="Result"
      className="mx-auto mt-8 grid max-w-2xl grid-cols-[4fr_6fr] gap-4"
    >
      <section className="grid justify-items-center gap-5 rounded-lg bg-white p-10">
        <div className="min-w-max rounded-lg bg-gray-200 py-2 px-4">
          {values.originCity}
        </div>
        {cityDistances.map(({ distance, toCity }, index) => (
          <Fragment key={index}>
            <div className="relative">
              <FaLongArrowAltDown className="scale-x-125 text-4xl text-gray-600" />
              <div className="absolute top-1/2 left-full min-w-max -translate-y-1/2 font-semibold">
                {distance.toFixed(2)} km
              </div>
            </div>
            <div className="min-w-max rounded-lg bg-gray-200 py-2 px-4">
              {toCity}
            </div>
          </Fragment>
        ))}
      </section>

      <section className="rounded-lg bg-white p-10">
        <div className="grid gap-3 text-lg">
          <div>
            Total Distance:{" "}
            <span className="text-2xl font-bold">
              {totalDistance.toFixed(2)}
            </span>{" "}
            km
          </div>

          <div>
            Number of Passengers:&nbsp;
            <b>{values.passengerCount}</b>
          </div>
          <div>
            Date of the trip:&nbsp;
            <b>{values.date?.toLocaleDateString()}</b>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Result;
