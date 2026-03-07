import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { SocialFactorsCard } from "../../components/Cards/SocialDeterminantsCard";
import { StrongCountCard } from "../../components/Cards/StrongCountCard";
import ColumnGraphic from "../../components/Charts/ColumnGraphic";
import { ApexOptions } from "apexcharts";
import { ChartOptions } from "../../service/components/Determinantes-Sociais/ChartOptions";

const waterSupplyOptions: ApexOptions = ChartOptions(["Rede Encanada", "Poço", "Cisterna", "Carro Pipa", "Outro"]);
const waterTreatmentOptions: ApexOptions = ChartOptions(["Filtrada", "Fervida", "Clorada", "Mineral", "Sem Tratamento"]);
const sewageDrainageOptions: ApexOptions = ChartOptions(["Rede Coletora", "Fossa Séptica", "Fossa Rudimentar", "Direto para Rio/Mar", "Céu Aberto", "Outra Forma"]);
const trashCollectionOptions: ApexOptions = ChartOptions(["Coletado", "Queimado/Enterrado", "Céu Aberto", "Outro"]);
const familyIncomeOptions: ApexOptions = ChartOptions(["1/4 Salário", "1/2 Salário", "2 Salário Mínimos", "3 Salários Mínimos", "4 Salários Mínimos", "Sem renda", "> 4 Salários"]);
const educationOptions: ApexOptions = ChartOptions(["Creche", "Pré-escola", "Classe de alfabetização", "1° ao 4°", "5° ao 8°", "Ensino fundamental completo", "Ensino fundamental especial", "EJA 1° ao 4°", "EJA 5° ao 8°", "Ensino médio", "Ensino médio especial", "Ensino médio EJA", "Superior/especialização/mestrado/doutorado", "Nenhum"]);

const DeterminantesSociais: React.FC = () => {

    const neighborhoods = ['bairro1', 'bairro2']

    const [neighborhoodSelected, setNeighborhoodSelected] = useState<string>(() => {
        return localStorage.getItem('neighborhoodSelected') || ''
    });

    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const [waterSupplyCount, setWaterSupplyCount] = useState<any>(0);
    const [sewageDrainageCount, setSewageDrainageCount] = useState<any>(0);
    const [trashCollectingCount, setTrashCollectingCount] = useState<any>(0);
    const [familyIncomeCount, setFamilyIncomeCount] = useState<any>(0);
    const [totalHouses, setTotalHouses] = useState<any>(10);

    // A iplementar:
    ///////////////
    const series = [
        {
        name: "Residências",
        data: [168, 385, 201, 298, 187, 195],
        },
    ];
    ///////////////

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
                            neighborhoods.map((neighborhood) => (
                                <option key={neighborhood} value={neighborhood}>
                                    {neighborhood}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
            {/* Cards */}
            <div className='flex flex-col md:flex-row gap-4'>
                <SocialFactorsCard
                    title="Abastecimento de água"
                    count={waterSupplyCount}
                    totalHouses={totalHouses}
                    label="Rede Encanada"
                />
                <SocialFactorsCard 
                    title="Forma de escoamento"
                    count={sewageDrainageCount}
                    totalHouses={totalHouses}
                    label="Fossa Séptica"
                />
                <SocialFactorsCard 
                    title="Destino do lixo"
                    count={trashCollectingCount}
                    totalHouses={totalHouses}
                    label="Coletado"
                />
                <SocialFactorsCard 
                    title="Renda familiar"
                    count={familyIncomeCount}
                    totalHouses={totalHouses}
                    label="com 1 salário mínimo"
                />
                <StrongCountCard 
                    title="Total de residências"
                    count={totalHouses}
                />
            </div>
            {/* Graphs */}
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Abastecimento de água'
                    options={waterSupplyOptions}
                    series={series}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Tratamento de água'
                    options={waterTreatmentOptions}
                    series={series}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Forma de escoamento do banheiro ou sanitário'
                    options={sewageDrainageOptions}
                    series={series}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Destino do lixo'
                    options={trashCollectionOptions}
                    series={series}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Renda familiar'
                    options={familyIncomeOptions}
                    series={series}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Escolaridade'
                    options={educationOptions}
                    series={series}
                />
            </div>
        </DefaultLayout>
    );
};

export default DeterminantesSociais;