import { useContext } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import ColumnGraphic from "../../components/Charts/ColumnGraphic";
import { SocialFactorsCard } from "../../components/Cards/SocialDeterminantsCard";
import { DeterminantesContext } from "../../contexts/DeterminantesContext";



const DeterminantesSociais: React.FC = () => {

    const { loading, waterSupplyCount, waterSupplyData, neighborhoodSelected, setNeighborhoodSelected, setIsOptionSelected, neighborhoods, waterTreatmentCount, waterTreatmentData, mostCommonTreatmentLabel, sewageDrainageCount, sewageDrainageData, trashCollectingCount, trashCollectingData, familyIncomeCount, familyIncomeData, waterSupplyOptions, waterTreatmentOptions, sewageDrainageOptions, trashCollectionOptions, familyIncomeOptions, isOptionSelected } = useContext(DeterminantesContext)

    if (loading || waterSupplyData.length == 0) {
        return (
        <DefaultLayout>
            <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
                <p className="text-lg text-gray-600 dark:text-gray-400">Carregando dados...</p>
            </div>
            </div>
        </DefaultLayout>
        );
    }
    return (
        <DefaultLayout>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {/* Header */}
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                Determinantes Sociais
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
                            neighborhoods.map((neighborhood: any) => (
                                <option key={neighborhood} value={neighborhood}>
                                    {neighborhood}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/* Cards */}
            <div className='flex flex-wrap gap-4'>
                <SocialFactorsCard
                    title="Abastecimento de água"
                    count={waterSupplyCount}
                    totalHouses={waterSupplyData[0].data[6]}
                    label="Rede encanada"
                />
                <SocialFactorsCard 
                    title="Tratamento de água/armazenamento"
                    count={waterTreatmentCount}
                    totalHouses={waterTreatmentData[0].data[6]}
                    label={mostCommonTreatmentLabel} 
                />
                <SocialFactorsCard 
                    title="Forma de escoamento"
                    count={sewageDrainageCount}
                    totalHouses={sewageDrainageData[0].data[7]}
                    label="Rede coletora"
                />
                <SocialFactorsCard 
                    title="Destino do lixo"
                    count={trashCollectingCount}
                    totalHouses={trashCollectingData[0].data[5]}
                    label="Coleta de lixo"
                />
                <SocialFactorsCard 
                    title="Renda familiar"
                    count={familyIncomeCount}
                    totalHouses={familyIncomeData[0].data[9]}
                    label="1 salário mínimo"
                />
               
            </div>
            {/* Graphs */}
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Abastecimento de água'
                    options={waterSupplyOptions}
                    series={waterSupplyData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Tratamento de água'
                    options={waterTreatmentOptions}
                    series={waterTreatmentData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Forma de escoamento do banheiro ou sanitário'
                    options={sewageDrainageOptions}
                    series={sewageDrainageData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Destino do lixo'
                    options={trashCollectionOptions}
                    series={trashCollectingData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Renda familiar'
                    options={familyIncomeOptions}
                    series={familyIncomeData}
                />
            </div>
            
        </DefaultLayout>
    );
};

export default DeterminantesSociais;