import { ApexOptions } from "apexcharts";
import getApiData from "../api/fetchApiData";
import { buildDashboardQueryParams, DashboardScope } from "./dashboardQueryParams";

export async function mountDonutCountBySexo(
  setCountBySexoSeries: Function,
  yearSelected: string,
  agravoSelected: string,
  bairro?: string,
  scope: DashboardScope = 'notificados'
) {
    const queryParams = buildDashboardQueryParams({
      yearSelected,
      agravoSelected,
      bairro,
      scope,
    });
    const apiData = await getApiData(`/notifications/count/sexo?${queryParams}`)
    
    setCountBySexoSeries([apiData.masculine, apiData.feminine]);
  }

export function countBySexoOptions() : ApexOptions 
{
    return {
        chart: {
          fontFamily: 'Satoshi, sans-serif',
          type: 'donut',
        },
        colors: ['#3C50E0', '#E03C3C', '#8FD0EF'],
        labels: ['Masculino', 'Feminino'],
        legend: {
          show: true,
          position: 'bottom',
        },
        plotOptions: {
          pie: {
            donut: {
              size: '65%',
              background: 'transparent',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        responsive: [
          {
            breakpoint: 2600,
            options: {
              chart: {
                width: 380,
              },
            },
          },
          {
            breakpoint: 640,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ]
      };
}
