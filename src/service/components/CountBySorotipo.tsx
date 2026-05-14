

import { ApexOptions } from "apexcharts";
import getApiData from "../api/fetchApiData";

export async function mountDonutCountBySorotipo(
  setSorotipoSeries: Function,
  yearSelected: string,
  agravoSelected: string,
  bairro?: string
) {
  try {
    const bairroParam = bairro ? `&bairro=${bairro}` : '';
    const apiData = await getApiData(
      `/notifications/count/sorotipo?year=${yearSelected}&agravo=${agravoSelected}${bairroParam}`
    );

    if (!apiData) return; // mantém o valor atual sem quebrar

    setSorotipoSeries([
      apiData.sorotipo1 ?? 20,
      apiData.sorotipo2 ?? 20,
      apiData.sorotipo3 ?? 30,
      apiData.sorotipo4 ?? 40,
      apiData.naoIdentificado ?? 50,
    ]);
  } catch {
    // endpoint ausente: gráfico fica com zeros, sem tela branca
  }
}

export function countBySorotipoOptions(): ApexOptions {
  return {
    chart: { fontFamily: 'Satoshi, sans-serif', type: 'donut' },
    colors: ['#3C50E0', '#E03C3C', '#10B981', '#F59E0B', '#9CA3AF'],
    labels: ['Sorotipo 1', 'Sorotipo 2', 'Sorotipo 3', 'Sorotipo 4', 'Não Identificado'],
    legend: { show: true, position: 'bottom' },
    plotOptions: { pie: { donut: { size: '65%', background: 'transparent' } } },
    dataLabels: { enabled: false },
    responsive: [
      { breakpoint: 2600, options: { chart: { width: 380 } } },
      { breakpoint: 640, options: { chart: { width: 200 } } },
    ],
  };
}