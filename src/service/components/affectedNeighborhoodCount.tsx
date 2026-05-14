import getApiData from "../api/fetchApiData";
import { buildDashboardQueryParams, DashboardScope } from "./dashboardQueryParams";

export async function affectedNeighborhoodCount(
  setCount: Function,
  yearSelected: string,
  agravo: string,
  scope: DashboardScope = 'notificados'
) {
    const queryParams = buildDashboardQueryParams({
      yearSelected,
      agravoSelected: agravo,
      scope,
    });
    const apiData = await getApiData(`/notifications/count/neighborhood?${queryParams}`);

    setCount(apiData.length);

    return apiData.length
}
