import { ApexOptions } from "apexcharts";
import getApiData from "../api/fetchApiData";

export async function mountDonutCountByEvolucao(
  setEvolucaoSeries: Function,
  yearSelected: string,
  agravoSelected: string,
  bairro?: string
) {
  try {
    const bairroParam = bairro ? `&bairro=${bairro}` : '';
    const apiData = await getApiData(
      `/notifications/count/evolucao?year=${yearSelected}&agravo=${agravoSelected}${bairroParam}`
    );

    if (!apiData) return;

    setEvolucaoSeries([
      apiData.cura ?? 10,
      apiData.obito ?? 20,
      apiData.obitoPorOutrasCausas ?? 30,
      apiData.emAcompanhamento ?? 40,
    ]);
  } catch {
    // endpoint ausente
  }
}

export function countByEvolucaoOptions(): ApexOptions {
  return {
    chart: { fontFamily: 'Satoshi, sans-serif', type: 'donut' },
    colors: ['#10B981', '#E03C3C', '#F59E0B', '#3C50E0'],
    labels: ['Cura', 'Óbito', 'Óbito por outras causas', 'Em acompanhamento'],
    legend: { show: true, position: 'bottom' },
    plotOptions: { pie: { donut: { size: '65%', background: 'transparent' } } },
    dataLabels: { enabled: false },
    responsive: [
      { breakpoint: 2600, options: { chart: { width: 380 } } },
      { breakpoint: 640, options: { chart: { width: 200 } } },
    ],
  };
}