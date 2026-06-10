import React, { useState } from 'react';

interface DengueTypeSelectorProps {
    value: string;
    setValue: Function;
}

const DengueTypeSelector: React.FC<DengueTypeSelectorProps> = ({ value, setValue }) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mr-4 ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value={'dengue_geral'} className="text-body dark:text-bodydark">
            Dengue Geral
          </option>
          <option value={'dengue_classica'} className="text-body dark:text-bodydark">
            Dengue Clássica
          </option>
          <option value={'dengue_alarmante'} className="text-body dark:text-bodydark">
            Dengue Alarmante
          </option>
          <option value={'dengue_grave'} className="text-body dark:text-bodydark">
            Dengue Grave
          </option>
        </select>
      </div>
    </div>
  );
};

export default DengueTypeSelector;
