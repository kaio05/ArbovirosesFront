import getApiData from "../api/fetchApiData";
import { buildDashboardQueryParams, DashboardScope } from "./dashboardQueryParams";

export async function notificationsCountData(
    setCount: Function,
    yearSelected: string,
    agravo: string,
    bairro?: string,
    scope: DashboardScope = 'notificados'
) {
    const queryParams = buildDashboardQueryParams({
        yearSelected,
        agravoSelected: agravo,
        bairro,
        scope,
    });
    const apiData = await getApiData(`/notifications/count?${queryParams}`);

    setCount(apiData);
}
