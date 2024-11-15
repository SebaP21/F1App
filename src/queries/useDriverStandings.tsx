import { useQuery } from "@tanstack/react-query";



export const useDriverStandingsQuery = () =>
	useQuery({
		queryKey: ["driverStandings"],
		queryFn: () =>
			fetch(`/api/f1/current/driverstandings.json`).then((response) => {
				
				if (!response.ok) {
					throw new Error("Błąd podczas pobierania danych");
				}
				return response.json();
			}),
		
	});
