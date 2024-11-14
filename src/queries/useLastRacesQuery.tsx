import { useQuery } from "@tanstack/react-query";
import { RaceTable } from "../Components/DriverDetails/DriverDetails";

export type PastRaceQueryData = {
	MRData: {
		RaceTable: RaceTable;
	};
};
export const useRaceQuery = (numberOfRace: number | undefined) =>
	useQuery<PastRaceQueryData>({
		queryKey: [numberOfRace, "past-race-query"],
		queryFn: () =>
			fetch(`/api/f1/current/${numberOfRace}/results.json`).then((response) =>
				response.json()
			),
	});
