import getApiData from "../api/fetchApiData"
import { buildDashboardQueryParams, DashboardScope } from "./dashboardQueryParams";

export async function mountNeighborhoodData(
  setNeighborhoodData: Function,
  yearSelected: string,
  agravoSelected: string,
  scope: DashboardScope = 'notificados'
) {
    const queryParams = buildDashboardQueryParams({
      yearSelected,
      agravoSelected,
      scope,
    });
    const data = await getApiData(`/notifications/count/neighborhood?${queryParams}`)

    setNeighborhoodData(data)

    return data
}
