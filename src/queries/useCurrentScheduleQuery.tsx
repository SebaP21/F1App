import { useQuery } from "@tanstack/react-query";

export const useCurrentScheduleQuery = () =>
	useQuery({
		queryKey: ["currentSchedule"],
		queryFn: () =>
			fetch(`https://ergast.com/api/f1/current.json`).then((response) => {
				if (!response.ok) {
					throw new Error("Błąd podczas pobierania danych");
				}
				return response.json();
			}),
	});
