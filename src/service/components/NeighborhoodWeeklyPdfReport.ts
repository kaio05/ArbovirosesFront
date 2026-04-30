const baseApi = process.env.REACT_APP_API_URL ?? "";

interface DownloadNeighborhoodWeeklyPdfParams {
  yearSelected: string;
  agravoSelected: string;
  initialWeek: string;
  finalWeek: string;
}

function buildQueryParams({ yearSelected, agravoSelected, initialWeek, finalWeek }: DownloadNeighborhoodWeeklyPdfParams) {
  const params = new URLSearchParams();
  params.set("year", yearSelected);
  params.set("agravo", agravoSelected);
  params.set("semanaInicial", initialWeek);
  params.set("semanaFinal", finalWeek);
  return params.toString();
}

export async function downloadNeighborhoodWeeklyPdfReport({
  yearSelected,
  agravoSelected,
  initialWeek,
  finalWeek,
}: DownloadNeighborhoodWeeklyPdfParams) {
  const queryParams = buildQueryParams({ yearSelected, agravoSelected, initialWeek, finalWeek });
  const response = await fetch(`${baseApi}/notifications/report/neighborhood/pdf?${queryParams}`);

  if (!response.ok) {
    let message = "Não foi possível gerar o relatório PDF.";

    try {
      const errorData = await response.json();
      if (Array.isArray(errorData?.errors) && errorData.errors.length > 0) {
        message = errorData.errors[0];
      }
    } catch (_error) {
      // Mantém a mensagem padrão quando a API não retorna JSON.
    }

    throw new Error(message);
  }

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `relatorio-bairros-semanas-${initialWeek}-a-${finalWeek}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
