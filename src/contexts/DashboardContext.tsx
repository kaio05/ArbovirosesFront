import { createContext, useCallback, useEffect, useState } from "react";
import { NeighborhoodInfo } from "../components/Entity/NeighborhoodInfo";
import { DashboardScope } from "../service/components/dashboardQueryParams";
import { mountAgravoLineData } from "../service/components/EpidemiologicalWeek";
import { mountAgravoLineAccumulatedData } from "../service/components/EpidemiologicalWeekAccumulated";
import { mountDonutCountBySexo } from "../service/components/CountBySexo";
import { mountColumnCountByAgeRange } from "../service/components/CountByAgeRange";
import { mountNeighborhoodData } from "../service/components/NeighborhoodInfoTable";
import { affectedNeighborhoodCount } from "../service/components/affectedNeighborhoodCount";
import { notificationsCountData } from "../service/components/notificationsCount";
import { downloadNeighborhoodWeeklyPdfReport } from "../service/components/NeighborhoodWeeklyPdfReport";

export const DashboardContextProvider = ({children}: {children: any}) => {
    const [agravoLineSeries, setAgravoLineSeries] = useState<any>([])
    const [agravoLineAccumulatedSeries, setAgravoLineAccumulatedSeries] = useState<any>([])
    const [countBySexoSeries, setCountBySexoSeries] = useState<any>([])
    const [ageRangeCategories, setAgeRangeCategories] = useState<any>([])
    const [affectedNeighborhoods, setAffectedNeighborhoods] = useState<any>(0)
    const [notificationsCount, setNotificationsCount] = useState<any>(0)
    const [neighborhoodApiData, setNeighborhoodApiData] = useState<NeighborhoodInfo[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [initialWeek, setInitialWeek] = useState<string>('')
    const [finalWeek, setFinalWeek] = useState<string>('')
    const [downloadError, setDownloadError] = useState<string | null>(null)
    const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null)
    const [downloadingPdf, setDownloadingPdf] = useState<boolean>(false)
    const [agravoSelected, setAgravoSelected] = useState<string>(() => {
    return localStorage.getItem('agravoSelected') || 'dengue';
    });
    const [yearSelected, setYearSelected] = useState<string>(() => {
    return localStorage.getItem('yearSelected') || new Date().getFullYear().toString();
    });
    const [scopeSelected, setScopeSelected] = useState<DashboardScope>(() => {
    const savedScope = localStorage.getItem('dashboardScopeSelected');
    return savedScope === 'confirmados' || savedScope === 'obitos' ? savedScope : 'notificados';
    });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            
            try {
            await Promise.allSettled([
                mountAgravoLineData(setAgravoLineSeries, yearSelected, agravoSelected, undefined, scopeSelected),
                mountAgravoLineAccumulatedData(setAgravoLineAccumulatedSeries, yearSelected, agravoSelected, undefined, scopeSelected),
                mountDonutCountBySexo(setCountBySexoSeries, yearSelected, agravoSelected, undefined, scopeSelected),
                mountColumnCountByAgeRange(setAgeRangeCategories, yearSelected, agravoSelected, undefined, scopeSelected),
                mountNeighborhoodData(setNeighborhoodApiData, yearSelected, agravoSelected, scopeSelected),
                affectedNeighborhoodCount(setAffectedNeighborhoods, yearSelected, agravoSelected, scopeSelected),
                notificationsCountData(setNotificationsCount, yearSelected, agravoSelected, undefined, scopeSelected),
            ]);
            
            localStorage.setItem('yearSelected', yearSelected);
            localStorage.setItem('agravoSelected', agravoSelected);
            localStorage.setItem('dashboardScopeSelected', scopeSelected);
            } catch (err) {
            console.error('Erro ao carregar dados:', err);
            setError('Não foi possível carregar os dados. Por favor, tente novamente.');
            } finally {
            setLoading(false);
            }
        };

        loadData();
    }, [yearSelected, agravoSelected, scopeSelected])

    const handleRetry = useCallback(() => {
    setError(null);
    setLoading(true);
    window.location.reload();
  }, []);

  const handleDownloadNeighborhoodReport = useCallback(async () => {
      setDownloadError(null);
      setDownloadSuccess(null);
  
      const normalizedInitialWeek = initialWeek.trim();
      const normalizedFinalWeek = finalWeek.trim();
  
      if (!normalizedInitialWeek || !normalizedFinalWeek) {
        setDownloadError('Informe a semana inicial e a semana final para gerar o relatório.');
        return;
      }
  
      const parsedInitial = Number(normalizedInitialWeek);
      const parsedFinal = Number(normalizedFinalWeek);
  
      if (!Number.isInteger(parsedInitial) || parsedInitial < 1) {
        setDownloadError('A semana inicial precisa ser um número inteiro maior ou igual a 1.');
        return;
      }
  
      if (!Number.isInteger(parsedFinal) || parsedFinal < 1) {
        setDownloadError('A semana final precisa ser um número inteiro maior ou igual a 1.');
        return;
      }
  
      if (parsedInitial > parsedFinal) {
        setDownloadError('A semana inicial não pode ser maior que a semana final.');
        return;
      }
  
      setDownloadingPdf(true);
  
      try {
        await downloadNeighborhoodWeeklyPdfReport({
          yearSelected,
          agravoSelected,
          initialWeek: normalizedInitialWeek,
          finalWeek: normalizedFinalWeek,
        });
  
        setDownloadSuccess(`Relatório em PDF das semanas ${normalizedInitialWeek} a ${normalizedFinalWeek} gerado com sucesso.`);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Não foi possível gerar o relatório PDF.';
        setDownloadError(message);
      } finally {
        setDownloadingPdf(false);
      }
    }, [])

    return <DashboardContext.Provider value={{
        agravoLineSeries,
        agravoLineAccumulatedSeries,
        countBySexoSeries,
        ageRangeCategories,
        affectedNeighborhoods,
        notificationsCount,
        neighborhoodApiData,
        loading,
        error,
        initialWeek,
        finalWeek,
        downloadError,
        downloadSuccess,
        downloadingPdf,
        agravoSelected,
        yearSelected,
        scopeSelected,
        setAgravoLineSeries,
        setAgravoLineAccumulatedSeries,
        setCountBySexoSeries,
        setAgeRangeCategories,
        setAffectedNeighborhoods,
        setNotificationsCount,
        setNeighborhoodApiData,
        setLoading,
        setError,
        setInitialWeek,
        setFinalWeek,
        setDownloadError,
        setDownloadSuccess,
        setDownloadingPdf,
        setAgravoSelected,
        setYearSelected,
        setScopeSelected,
        handleRetry,
        handleDownloadNeighborhoodReport,
    }}>
      {children}
    </DashboardContext.Provider>
}

interface IDashboardContext {
    agravoLineSeries: any
    agravoLineAccumulatedSeries: any
    countBySexoSeries: any
    ageRangeCategories: any
    affectedNeighborhoods: any
    notificationsCount: any
    neighborhoodApiData: any
    loading: any
    error: any
    initialWeek: any
    finalWeek: any
    downloadError: any
    downloadSuccess: any
    downloadingPdf: any
    agravoSelected: any
    yearSelected: any
    scopeSelected: any
    setAgravoLineSeries: any
    setAgravoLineAccumulatedSeries: any
    setCountBySexoSeries: any
    setAgeRangeCategories: any
    setAffectedNeighborhoods: any
    setNotificationsCount: any
    setNeighborhoodApiData: any
    setLoading: any
    setError: any
    setInitialWeek: any
    setFinalWeek: any
    setDownloadError: any
    setDownloadSuccess: any
    setDownloadingPdf: any
    setAgravoSelected: any
    setYearSelected: any
    setScopeSelected: any
    handleRetry: any
    handleDownloadNeighborhoodReport: any
}

export const DashboardContext = createContext<IDashboardContext>({
  agravoLineSeries: null,
  agravoLineAccumulatedSeries: null,
  countBySexoSeries: null,
  ageRangeCategories: null,
  affectedNeighborhoods: null,
  notificationsCount: null,
  neighborhoodApiData: null,
  loading: null,
  error: null,
  initialWeek: null,
  finalWeek: null,
  downloadError: null,
  downloadSuccess: null,
  downloadingPdf: null,
  agravoSelected: null,
  yearSelected: null,
  scopeSelected: null,
  setAgravoLineSeries: null,
  setAgravoLineAccumulatedSeries: null,
  setCountBySexoSeries: null,
  setAgeRangeCategories: null,
  setAffectedNeighborhoods: null,
  setNotificationsCount: null,
  setNeighborhoodApiData: null,
  setLoading: null,
  setError: null,
  setInitialWeek: null,
  setFinalWeek: null,
  setDownloadError: null,
  setDownloadSuccess: null,
  setDownloadingPdf: null,
  setAgravoSelected: null,
  setYearSelected: null,
  setScopeSelected: null,
  handleRetry: null,
  handleDownloadNeighborhoodReport: null,
});