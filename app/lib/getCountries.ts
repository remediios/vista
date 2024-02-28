import countries from 'world-countries';

const countriesFormatted = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latLang: country.latlng,
  region: country.region,
  subRegion: country.subregion,
}));

export const useCountries = () => {
  const getAllCountries = () => countriesFormatted;

  const getCountryByValue = (countryValue: string) => {
    return countriesFormatted.find(
      (countryFind) => countryFind.value === countryValue
    );
  };
  return { getAllCountries, getCountryByValue };
};
