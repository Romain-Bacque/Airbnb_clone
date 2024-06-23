import useCountries from "@/app/hooks/useCountries";
import { Country } from "@/app/types";
import { FC } from "react";
import ReactCountryFlag from "react-country-flag";
import Select from "react-select"; // react-select is a popular library for creating custom select inputs


interface CountrySelectProps {
  value?: Country;
  onChange: (value: Country) => void;
}

const CountrySelect: FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as Country)}
        formatOptionLabel={(option: any) => (
          <div className="flex flex-row gap-2 items-center">
            <ReactCountryFlag countryCode={option.value} svg />
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black", // that is the color of the selected option text and the border
            primary25: "#ffe4e6", // that is the hover color of the options list
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
