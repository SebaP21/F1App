import { useQuery } from "@tanstack/react-query";

export const useConstructorStandingsQuery = () =>
	useQuery({
		queryKey: ["constructorStandings"],
		queryFn: () =>
			fetch(`https://ergast.com/api/f1/current/constructorstandings.json`).then(
				(response) => {
					if (!response.ok) {
						throw new Error("Błąd podczas pobierania danych");
					}
					return response.json();
				}
			),
	});
