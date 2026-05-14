import getApiData from "../api/fetchApiData"

export async function mountNeighborhoodData(setNeighborhoodData: Function, yearSelected: string, agravoSelected: string) {
    const data = await getApiData(`/notifications/count/neighborhood?year=${yearSelected}&agravo=${agravoSelected}`)

    setNeighborhoodData(data ?? []) //protege contra undefined 

    return data
}