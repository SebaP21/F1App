import { StandingsResults } from "../../Components/Classification/Standings";
import { DriverCurrentResultsContextProvider } from "../../Components/Context/DriverCurrentResultContext";

export const StandingsPage = () => {
	return (
		<DriverCurrentResultsContextProvider>
			<StandingsResults />
		</DriverCurrentResultsContextProvider>
	);
};
