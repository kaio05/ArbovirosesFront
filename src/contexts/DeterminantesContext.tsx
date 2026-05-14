import { createContext, useEffect, useMemo, useState } from "react";
import getApiData from "../service/api/fetchApiData";
import { ChartOptions, mountDeterminantCollumData } from "../service/components/Determinantes-Sociais/ChartOptions";

export const DeterminantesContextProvider = ({children}: {children: any}) => {

    const neighborhoods = ['Todos', 'BOM JESUS', 'SANTO ANTONIO', 'BOM JARDIM', 'BARROCAS', 'PASSAGEM DE PEDRA', 'ESTRADA DA RAIZ', 'RIACHO GRANDE', 'LAGOA DO MATO', 'PERREIROS', 'BELO HORIZONTE'];

    const [neighborhoodSelected, setNeighborhoodSelected] = useState<string>('Todos');

    const [waterSupplyData, setWaterSupplyData] = useState<any[]>([]);
    const [waterTreatmentData, setWaterTreatmentData] = useState<any[]>([]);
    const [sewageDrainageData, setSewageDrainageData] = useState<any[]>([]);
    const [trashCollectingData, setTrashCollectingData] = useState<any[]>([]);
    const [familyIncomeData, setFamilyIncomeData] = useState<any[]>([]);
    

    const [waterSupplyCount, setWaterSupplyCount] = useState<any>(0);
    const [waterTreatmentCount, setWaterTreatmentCount] = useState<any>(0);
    const [sewageDrainageCount, setSewageDrainageCount] = useState<any>(0);
    const [trashCollectingCount, setTrashCollectingCount] = useState<any>(0);
    const [familyIncomeCount, setFamilyIncomeCount] = useState<any>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const waterSupplyOptions = useMemo(() => ChartOptions(["Rede Encanada", "Poço", "Cisterna", "Carro Pipa", "Outro", "Não Informado", "Total"], waterSupplyData[0]?.data[6] ?? 0), [waterSupplyData]);
    const waterTreatmentOptions = useMemo(() => ChartOptions(["Clorada", "Fervida", "Filtrada", "Mineral", "Sem Tratamento", "Não Informado", "Total"], waterTreatmentData[0]?.data[6] ?? 0), [waterTreatmentData]);
    const sewageDrainageOptions = useMemo(() => ChartOptions(["Rede Coletora", "Fossa Séptica", "Fossa Rudimentar", "Direto para Rio/Mar", "Céu Aberto", "Outra Forma", "Não Informado", "Total"], sewageDrainageData[0]?.data[7] ?? 0), [sewageDrainageData]);
    const trashCollectionOptions = useMemo(() => ChartOptions(["Coletado", "Queimado/Enterrado", "Céu Aberto", "Outro", "Não Informado", "Total"], trashCollectingData[0]?.data[5] ?? 0), [trashCollectingData]);
    const familyIncomeOptions = useMemo(() => ChartOptions(["Sem renda", "1/4 Salário", "1/2 Salário", "1 Salário Mínimo", "2 Salário Mínimos", "3 Salários Mínimos", "4 Salários Mínimos", "> 4 Salários", "Não Informado", "Total"], familyIncomeData[0]?.data[9] ?? 0), [familyIncomeData]);
    
    const waterTreatmentLabels = ["Clorada", "Fervida", "Filtrada", "Mineral", "Sem Tratamento", "Não Informado"];

    const mostCommonTreatmentLabel = useMemo(() => {
        if (!waterTreatmentData[0]) return '';
        const values = waterTreatmentData[0].data.slice(0, 6); // exclude Total
        const maxIndex = values.indexOf(Math.max(...values));
        return waterTreatmentLabels[maxIndex];
        }, [waterTreatmentData]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const apiData = await getApiData('/determinantes');
                await Promise.allSettled([
                    mountDeterminantCollumData(apiData, setWaterSupplyData,
                    setWaterTreatmentData,
                    setSewageDrainageData,
                    setTrashCollectingData,
                    setFamilyIncomeData,
                    setWaterSupplyCount,
                    setWaterTreatmentCount,
                    setSewageDrainageCount,
                    setTrashCollectingCount,
                    setFamilyIncomeCount,
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

    return <DeterminantesContext.Provider value={{
        loading,
        waterSupplyData,
        neighborhoodSelected,
        setNeighborhoodSelected,
        isOptionSelected,
        setIsOptionSelected,
        neighborhoods,
        waterSupplyCount,
        waterTreatmentCount,
        waterTreatmentData,
        mostCommonTreatmentLabel,
        sewageDrainageCount,
        sewageDrainageData,
        trashCollectingCount,
        trashCollectingData,
        familyIncomeCount,
        familyIncomeData,
        waterSupplyOptions,
        waterTreatmentOptions,
        sewageDrainageOptions,
        trashCollectionOptions,
        familyIncomeOptions,
    
    }}>
        {children}
    </DeterminantesContext.Provider>
}

interface IDeterminantesContext {
    loading: any
    waterSupplyData: any
    neighborhoodSelected: any
    setNeighborhoodSelected: any
    setIsOptionSelected: any
    neighborhoods: any
    waterSupplyCount: any
    waterTreatmentCount: any
    waterTreatmentData: any
    mostCommonTreatmentLabel: any
    sewageDrainageCount: any
    sewageDrainageData: any
    trashCollectingCount: any
    trashCollectingData: any
    familyIncomeCount: any
    familyIncomeData: any
    waterSupplyOptions: any
    waterTreatmentOptions: any
    sewageDrainageOptions: any
    trashCollectionOptions: any
    familyIncomeOptions: any
    isOptionSelected: any
}

export const DeterminantesContext = createContext<IDeterminantesContext>({
    loading: null,
    waterSupplyData: null,
    neighborhoodSelected: null,
    setNeighborhoodSelected: null,
    setIsOptionSelected: null,
    neighborhoods: null,
    waterSupplyCount: null,
    waterTreatmentCount: null,
    waterTreatmentData: null,
    mostCommonTreatmentLabel: null,
    sewageDrainageCount: null,
    sewageDrainageData: null,
    trashCollectingCount: null,
    trashCollectingData: null,
    familyIncomeCount: null,
    familyIncomeData: null,
    waterSupplyOptions: null,
    waterTreatmentOptions: null,
    sewageDrainageOptions: null,
    trashCollectionOptions: null,
    familyIncomeOptions: null,
    isOptionSelected: null,
});