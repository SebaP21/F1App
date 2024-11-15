import { useQuery } from "@tanstack/react-query";
import { RaceTable } from "../Components/DriverDetails/DriverDetails";

export type PastRaceQueryData = {
	MRData: {
		RaceTable: RaceTable;
	};
};
export const useRaceQuery = (round: number | undefined) =>
	useQuery<PastRaceQueryData>({
		queryKey: [round, "round-race-query"],
		queryFn: () =>
			fetch(`/api/f1/current/${round}/results.json`).then((response) =>
				response.json()
			),
	});
