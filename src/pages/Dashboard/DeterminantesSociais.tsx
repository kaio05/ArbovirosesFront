import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import ColumnGraphic from "../../components/Charts/ColumnGraphic";
import { ApexOptions } from "apexcharts";
import { ChartOptions, mountDeterminantCollumData } from "../../service/components/Determinantes-Sociais/ChartOptions";
import getApiData from "../../service/api/fetchApiData";
import { SocialFactorsCard } from "../../components/Cards/SocialDeterminantsCard";

const waterSupplyOptions: ApexOptions = ChartOptions(["Rede Encanada", "Poço", "Cisterna", "Carro Pipa", "Outro", "Não Informado", "Total"]);
const waterTreatmentOptions: ApexOptions = ChartOptions(["Clorada", "Fervida", "Filtrada", "Mineral", "Sem Tratamento", "Não Informado", "Total"]);
const sewageDrainageOptions: ApexOptions = ChartOptions(["Rede Coletora", "Fossa Séptica", "Fossa Rudimentar", "Direto para Rio/Mar", "Céu Aberto", "Outra Forma", "Não Informado", "Total"]);
const trashCollectionOptions: ApexOptions = ChartOptions(["Coletado", "Queimado/Enterrado", "Céu Aberto", "Outro", "Não Informado", "Total"]);
const familyIncomeOptions: ApexOptions = ChartOptions(["Sem renda", "1/4 Salário", "1/2 Salário", "1 Salário Mínimo", "2 Salário Mínimos", "3 Salários Mínimos", "4 Salários Mínimos", "> 4 Salários", "Não Informado", "Total"]);
const educationOptions: ApexOptions = ChartOptions(["Nenhum", "Creche", "Pré-escola", "Classe de alfabetização", "1° ao 4°", "5° ao 8°", "EJA 1° ao 4°", "EJA 5° ao 8°", "Ensino fundamental completo", "Ensino fundamental especial", "Ensino médio", "Ensino médio especial", "Ensino médio EJA", "Superior/especialização/mestrado/doutorado", "Mobral", "Não Informado", "Total"]);

const DeterminantesSociais: React.FC = () => {

    const neighborhoods = ['Todos', 'BOM JESUS', 'SANTO ANTONIO', 'BOM JARDIM', 'BARROCAS', 'PASSAGEM DE PEDRA', 'ESTRADA DA RAIZ', 'RIACHO GRANDE', 'LAGOA DO MATO', 'PERREIROS', 'BELO HORIZONTE'];

    const [neighborhoodSelected, setNeighborhoodSelected] = useState<string>('Todos');

    const [waterSupplyData, setWaterSupplyData] = useState<any[]>([]);
    const [waterTreatmentData, setWaterTreatmentData] = useState<any[]>([]);
    const [sewageDrainageData, setSewageDrainageData] = useState<any[]>([]);
    const [trashCollectionData, setTrashCollectionData] = useState<any[]>([]);
    const [familyIncomeData, setFamilyIncomeData] = useState<any[]>([]);
    const [educationData, setEducationData] = useState<any[]>([]);

    const [waterSupplyCount, setWaterSupplyCount] = useState<any>(0);
    const [waterTreatmentCount, setWaterTreatmentCount] = useState<any>(0);
    const [sewageDrainageCount, setSewageDrainageCount] = useState<any>(0);
    const [trashCollectingCount, setTrashCollectingCount] = useState<any>(0);
    const [familyIncomeCount, setFamilyIncomeCount] = useState<any>(0);
    const [educationCount, setEducationCount] = useState<any>(0);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const apiData = await getApiData('');
                // console.log(apiData);
                await Promise.allSettled([
                    mountDeterminantCollumData(apiData, setWaterSupplyData,
                    setWaterTreatmentData,
                    setSewageDrainageData,
                    setTrashCollectionData,
                    setFamilyIncomeData,
                    setEducationData,
                    setWaterSupplyCount,
                    setWaterTreatmentCount,
                    setSewageDrainageCount,
                    setTrashCollectingCount,
                    setFamilyIncomeCount,
                    setEducationCount,
                    neighborhoodSelected)
                ]);
            } catch (err) {
                console.error('Erro ao buscar dados: ', err);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [neighborhoodSelected]);

    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

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
            <div className='flex flex-wrap gap-4'>
                <SocialFactorsCard
                    title="Abastecimento de água"
                    count={waterSupplyCount}
                    totalHouses={waterSupplyData[0].data[6]}
                    label="Rede encanada"
                />
                <SocialFactorsCard 
                    title="Tratamento de água"
                    count={waterTreatmentCount}
                    totalHouses={waterTreatmentData[0].data[6]}
                    label="Água clorada"
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
                    totalHouses={trashCollectionData[0].data[5]}
                    label="Coleta de lixo"
                />
                <SocialFactorsCard 
                    title="Renda familiar"
                    count={familyIncomeCount}
                    totalHouses={familyIncomeData[0].data[9]}
                    label="1 salário mínimo"
                />
                <SocialFactorsCard 
                    title="Escolaridade"
                    count={educationCount}
                    totalHouses={educationData[0].data[15]}
                    label="ensino fundamental completo"
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
                    series={trashCollectionData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Renda familiar'
                    options={familyIncomeOptions}
                    series={familyIncomeData}
                />
            </div>
            <div className='xl:col-start-1 xl:col-end-8 col-span-12 mt-4'>
                <ColumnGraphic 
                    title='Escolaridade'
                    options={educationOptions}
                    series={educationData}
                />
            </div>
        </DefaultLayout>
    );
};

export default DeterminantesSociais;