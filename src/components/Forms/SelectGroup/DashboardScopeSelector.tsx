import React, { useState } from 'react';
import { DashboardScope } from '../../../service/components/dashboardQueryParams';

interface DashboardScopeSelectorProps {
  scopeSelected: DashboardScope;
  setScopeSelected: (scope: DashboardScope) => void;
}

const DashboardScopeSelector: React.FC<DashboardScopeSelectorProps> = ({
  scopeSelected,
  setScopeSelected,
}) => {
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div className="mb-4.5">
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <select
          value={scopeSelected}
          onChange={(event) => {
            setScopeSelected(event.target.value as DashboardScope);
            changeTextColor();
          }}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mr-4 ${
            isOptionSelected ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="notificados" className="text-body dark:text-bodydark">
            Dados notificados
          </option>
          <option value="confirmados" className="text-body dark:text-bodydark">
            Casos confirmados
          </option>
          <option value="obitos" className="text-body dark:text-bodydark">
            Óbitos
          </option>
        </select>
      </div>
    </div>
  );
};

export default DashboardScopeSelector;
