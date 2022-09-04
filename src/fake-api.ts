/* eslint-disable unicorn/numeric-separators-style */
export const CITIES: [string, number, number][] = [
  ["Paris", 48.856614, 2.352222],
  ["Marseille", 43.296482, 5.36978],
  ["Lyon", 45.764043, 4.835659],
  ["Toulouse", 43.604652, 1.444209],
  ["Nice", 43.710173, 7.261953],
  ["Nantes", 47.218371, -1.553621],
  ["Strasbourg", 48.573405, 7.752111],
  ["Montpellier", 43.610769, 3.876716],
  ["Bordeaux", 44.837789, -0.57918],
  ["Lille", 50.62925, 3.057256],
  ["Rennes", 48.117266, -1.677793],
  ["Reims", 49.258329, 4.031696],
  ["Le Havre", 49.49437, 0.107929],
  ["Saint-Étienne", 45.439695, 4.387178],
  ["Toulon", 43.124228, 5.928],
  ["Angers", 47.478419, -0.563166],
  ["Grenoble", 45.188529, 5.724524],
  ["Dijon", 47.322047, 5.04148],
  ["Nîmes", 43.836699, 4.360054],
  ["Aix-en-Provence", 43.529742, 5.447427],
];

const wait = () =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

export const fetchCities = async (keyword: string) => {
  console.log("fake api: fetchCities keyword:", keyword);
  await wait();
  if (keyword.toLowerCase() === "fail") {
    throw new Error("500 Server Error!");
  }
  return CITIES.filter((city) =>
    city[0]
      .toLowerCase()
      .replace(/\s+/g, "")
      .includes(keyword.toLowerCase().replace(/\s+/g, "")),
  ).map((city) => city[0]);
};

type Coordinates = [number, number];
const haversineDistance = (
  [latitude1, longitude1]: Coordinates,
  [latitude2, longitude2]: Coordinates,
) => {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const distanceLatitude = distance(latitude2, latitude1);
  const distanceLongitude = distance(longitude2, longitude1);

  const latitudeRadian1 = toRadian(latitude1);
  const latitudeRadian2 = toRadian(latitude2);

  const a =
    Math.sin(distanceLatitude / 2) ** 2 +
    Math.sin(distanceLongitude / 2) ** 2 *
      Math.cos(latitudeRadian1) *
      Math.cos(latitudeRadian2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return RADIUS_OF_EARTH_IN_KM * c;
};

export const calculateDistance = async (cities: string[]) => {
  console.log("fake api: calculateDistance cities:", cities);
  await wait();
  if (cities.includes("Dijon")) {
    throw new Error("500 Server Error!");
  }

  // eslint-disable-next-line unicorn/no-array-reduce
  const cityMap = CITIES.reduce((accumulator, city) => {
    accumulator.set(city[0], city);
    return accumulator;
  }, new Map<string, [string, number, number]>());

  const [origin, ...destinations] = cities;
  const distances = destinations.map((toCityName, index) => {
    const toCity = cityMap.get(toCityName)!;
    if (index === 0) {
      const fromCity = cityMap.get(origin)!;
      return {
        fromCity: origin,
        toCity: toCityName,
        distance: haversineDistance(
          [fromCity[1], fromCity[2]],
          [toCity[1], toCity[2]],
        ),
      };
    }
    const fromCity = cityMap.get(destinations[index - 1])!;
    return {
      fromCity: destinations[index - 1],
      toCity: toCityName,
      distance: haversineDistance(
        [fromCity[1], fromCity[2]],
        [toCity[1], toCity[2]],
      ),
    };
  });

  return distances;
};
