import {useQuery} from "@tanstack/react-query";
import {RaceTable} from "../Components/DriverDetails/DriverDetails";

type DriverQueryData = {
    MRData: {
        RaceTable: RaceTable
    }
}
export const useDriverQuery = (driverId: string | undefined) => useQuery<DriverQueryData>({
    queryKey: [driverId, "driver-query"],
    queryFn: () => fetch(`https://ergast.com/api/f1/current/drivers/${driverId}/results.json`)
        .then((response) => response.json()),

})