import { ApexOptions } from "apexcharts";

export async function mountDeterminantCollumData(apiData: any, setWaterSupplyData: Function, setWaterTreatmentData: Function , setSewageDrainageData: Function, setTrashCollectingData: Function, setFamilyIncomeData: Function, setEducationData: Function, setWaterSupplyCount: Function, setWaterTreatmentCount: Function, setSewageDrainageCount: Function, setTrashCollectingCount: Function, setFamilyIncomeCount: Function, setEducationCount: Function, setTotalHouses: Function, neighborhood: string) {

  const waterSupplyData = [0, 0, 0, 0, 0, 0, 0];
  const waterTreatmentData = [0, 0, 0, 0, 0, 0, 0];
  const sewageDrainageData = [0, 0, 0, 0, 0, 0, 0, 0];
  const trashCollectionData = [0, 0, 0, 0, 0, 0];
  const familyIncomeData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const educationData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let waterSupplyCount = 0;
  let waterTreatmentCount = 0;
  let sewageDrainageCount = 0;
  let trashCollectingCount = 0;
  let familyIncomeCount = 0;
  let educationCount = 0;

  for(const data of apiData) {
    if(data.bairro == neighborhood || neighborhood == 'Todos') {
      waterSupplyCount += data.aguaRede;
      waterTreatmentCount += data.tratamentoClorada;
      sewageDrainageCount += data.escoamentoRedeColetora;
      trashCollectingCount += data.lixoColetado;
      familyIncomeCount += data.rendaUmSalario;
      educationCount += data.eduFundamentalCompleto;

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

      educationData[0] += data.eduNenhum;
      educationData[1] += data.eduCreche;
      educationData[2] += data.eduPreEscola;
      educationData[3] += data.eduAlfabetizacao;
      educationData[4] += data.edu1a4;
      educationData[5] += data.edu1a8;
      educationData[6] += data.eduEja1a4;
      educationData[7] += data.eduEja1a8;
      educationData[8] += data.eduFundamentalCompleto;
      educationData[9] += data.eduFundamentalEspecial;
      educationData[10] += data.eduMedio;
      educationData[11] += data.eduMedioEspecial;
      educationData[12] += data.eduSuperior;
      educationData[13] += data.eduMobral;
      educationData[14] += data.eduNaoInformado;
      educationData[15] += data.eduTotal;
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

  setEducationData([{
      name: "Residências",  
      data: educationData
  }]);

  setWaterSupplyCount(waterSupplyCount);
  setWaterTreatmentCount(waterTreatmentCount);
  setSewageDrainageCount(sewageDrainageCount);
  setTrashCollectingCount(trashCollectingCount);
  setFamilyIncomeCount(familyIncomeCount);
  setEducationCount(educationCount);
  setTotalHouses(waterSupplyData[6]);
}

export function ChartOptions(categories: string[]): ApexOptions {
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
      };
}