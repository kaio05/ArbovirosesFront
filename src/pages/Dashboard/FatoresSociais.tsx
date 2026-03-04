import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";

const FatoresSociais: React.FC = () => {

    const neighborhoods = ['bairro1', 'bairro2']

    const [neighborhoodSelected, setNeighborhoodSelected] = useState<string>(() => {
        return localStorage.getItem('neighborhoodSelected') || ''
    })

    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    return (
        <DefaultLayout>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    Fatores Sociais
                    </h2>
            
                    <div className="w-full sm:w-64">
                        <select
                        value={neighborhoodSelected}
                        onChange={(e) => {
                            setNeighborhoodSelected(e.target.value);
                            setIsOptionSelected(true);
                        }}
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary mr-4 ${
                                    isOptionSelected ? 'text-black dark:text-white' : ''
                                  }`}
                        >
                            {
                                neighborhoods.map((neighborhood) => (
                                    <option key={neighborhood} value={neighborhood}>
                                        {neighborhood}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>
        </DefaultLayout>
    );
};

export default FatoresSociais;