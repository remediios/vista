import { useCountries } from '../lib/getCountries';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectCountryProps {
  setLocationValue: React.Dispatch<React.SetStateAction<string>>;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ setLocationValue }) => {
  const { getAllCountries } = useCountries();
  const countries = getAllCountries();
  return (
    <div className="mb-5">
      <Select required onValueChange={(value) => setLocationValue(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Countries</SelectLabel>
            {countries.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                {country.flag} {country.label} [{country.value}]
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectCountry;
