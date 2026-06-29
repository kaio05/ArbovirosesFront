import api from "../api/Api";
import { DashboardScope } from "./dashboardQueryParams";

interface DownloadNeighborhoodWeeklyPdfParams {
  yearSelected: string;
  agravoSelected: string;
  initialWeek: string;
  finalWeek: string;
  scopeSelected: DashboardScope;
}

function buildQueryParams({ yearSelected, agravoSelected, initialWeek, finalWeek, scopeSelected }: DownloadNeighborhoodWeeklyPdfParams) {
  const params = new URLSearchParams();
  params.set("year", yearSelected);
  params.set("agravo", agravoSelected);
  params.set("semanaInicial", initialWeek);
  params.set("semanaFinal", finalWeek);
  params.set("scope", scopeSelected);
  return params.toString();
}

export async function downloadNeighborhoodWeeklyPdfReport({
  yearSelected,
  agravoSelected,
  initialWeek,
  finalWeek,
  scopeSelected,
}: DownloadNeighborhoodWeeklyPdfParams) {
  const queryParams = buildQueryParams({ yearSelected, agravoSelected, initialWeek, finalWeek, scopeSelected });
  const response = await api.get(`/notifications/report/neighborhood/pdf?${queryParams}`, {
    responseType: "blob",
  });

  const blob = response.data;
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = `relatorio-bairros-semanas-${initialWeek}-a-${finalWeek}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);
}
