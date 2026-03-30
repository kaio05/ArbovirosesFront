import { ApexOptions } from "apexcharts";

export async function mountDeterminantCollumData(apiData: any, setWaterSupplyData: Function, setWaterTreatmentData: Function , setSewageDrainageData: Function, setTrashCollectingData: Function, setFamilyIncomeData: Function,  setWaterSupplyCount: Function, setWaterTreatmentCount: Function, setSewageDrainageCount: Function, setTrashCollectingCount: Function, setFamilyIncomeCount: Function, /*setTotalHouses: Function,*/ neighborhood: string) {

  const waterSupplyData = [0, 0, 0, 0, 0, 0, 0];
  const waterTreatmentData = [0, 0, 0, 0, 0, 0, 0];
  const sewageDrainageData = [0, 0, 0, 0, 0, 0, 0, 0];
  const trashCollectionData = [0, 0, 0, 0, 0, 0];
  const familyIncomeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  
  for(const data of apiData) {
    if(data.bairro == neighborhood || neighborhood == 'Todos') {
      waterSupplyData[0] += data.aguaRede;
      waterSupplyData[1] += data.aguaPoco;
      waterSupplyData[2] += data.aguaCisterna;
      waterSupplyData[3] += data.aguaCarroPipe;
      waterSupplyData[4] += data.aguaOutro;
      waterSupplyData[5] += data.aguaNaoInformado;
      waterSupplyData[6] += data.aguaTotal;

      waterTreatmentData[0] += data.tratamentoClorada;
      waterTreatmentData[1] += data.tratamentoFervida;
      waterTreatmentData[2] += data.tratamentoFiltrada;
      waterTreatmentData[3] += data.tratamentoMineral;
      waterTreatmentData[4] += data.tratamentoSemTratamento;
      waterTreatmentData[5] += data.tratamentoNaoInformado;
      waterTreatmentData[6] += data.tratamentoTotal;

      sewageDrainageData[0] += data.escoamentoRedeColetora;
      sewageDrainageData[1] += data.escoamentoFossaSeptica;
      sewageDrainageData[2] += data.escoamentoFossaRudimentar;
      sewageDrainageData[3] += data.escoamentoRioMar;
      sewageDrainageData[4] += data.escoamentoCeuAberto;
      sewageDrainageData[5] += data.escoamentoOutra;
      sewageDrainageData[6] += data.escoamentoNaoInformado;
      sewageDrainageData[7] += data.escoamentoTotal;
      
      trashCollectionData[0] += data.lixoColetado;
      trashCollectionData[1] += data.lixoQueimadoEnterrado;
      trashCollectionData[2] += data.lixoCeuAberto;
      trashCollectionData[3] += data.lixoOutro;
      trashCollectionData[4] += data.lixoNaoInformado;
      trashCollectionData[5] += data.lixoTotal;

      familyIncomeData[0] += data.rendaAusencia;
      familyIncomeData[1] += data.rendaUmQuartoSalario;
      familyIncomeData[2] += data.rendaMeioSalario;
      familyIncomeData[3] += data.rendaUmSalario;
      familyIncomeData[4] += data.rendaDoisSalarios;
      familyIncomeData[5] += data.rendaTresSalarios;
      familyIncomeData[6] += data.rendaQuatroSalarios;
      familyIncomeData[7] += data.rendaAcimaQuatro;
      familyIncomeData[8] += data.rendaNaoInformado;
      familyIncomeData[9] += data.rendaTotal;

   
    }
  }

  setWaterSupplyData([{
      name: "Residências",  
      data: waterSupplyData
  }]);
  
  setWaterTreatmentData([{
      name: "Residências",  
      data: waterTreatmentData
  }]);

  setSewageDrainageData([{
      name: "Residências",  
      data: sewageDrainageData
  }]);

  setTrashCollectingData([{
      name: "Residências",  
      data: trashCollectionData
  }]);

  setFamilyIncomeData([{
      name: "Residências",  
      data: familyIncomeData
  }]);

  let waterSupplyCount = Math.max(...waterSupplyData.slice(0,5));
  let waterTreatmentCount = Math.max(...waterTreatmentData.slice(0,5));
  let sewageDrainageCount = Math.max(...sewageDrainageData.slice(0,6));
  let trashCollectingCount = Math.max(...trashCollectionData.slice(0,4));
  let familyIncomeCount = Math.max(...familyIncomeData.slice(0,8));

  

  setWaterSupplyCount(waterSupplyCount);
  setWaterTreatmentCount(waterTreatmentCount);
  setSewageDrainageCount(sewageDrainageCount);
  setTrashCollectingCount(trashCollectingCount);
  setFamilyIncomeCount(familyIncomeCount);
}

export function ChartOptions(categories: string[], total: number): ApexOptions {
    return {
        colors: ['#3C50E0', '#80CAEE'],
        chart: {
          fontFamily: 'Satoshi, sans-serif',
          type: 'bar',
          height: 335,
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
      
        responsive: [
          {
            breakpoint: 1536,
            options: {
              plotOptions: {
                bar: {
                  borderRadius: 0,
                  columnWidth: '25%',
                },
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 0,
            columnWidth: '25%',
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'last',
          },
        },
        dataLabels: {
          enabled: false,
        },
      
        xaxis: {
          categories
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          fontFamily: 'Satoshi',
          fontWeight: 500,
          fontSize: '14px',
      
          markers: {
            radius: 99,
          },
        },
        fill: {
          opacity: 1,
        },

        tooltip: {
            y: {
                formatter: (value: number) => {
                    const percentage = total > 0 ? (value / total * 100).toFixed(2) : '0.00';
                    return `${value.toLocaleString()} residências (${percentage}%)`;
                }
            }
        },
      };
}