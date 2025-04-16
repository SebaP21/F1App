import {
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
	createContext,
} from "react";
import { DriverStanding } from "../Classification/Standings";

type CurrentStandingsContextState = {
	driverId: string;
	setDriverId: Dispatch<SetStateAction<string>>;
	currentStanding: DriverStanding | undefined;
};

export const CurrentStandingsContext =
	createContext<CurrentStandingsContextState>(
		{} as CurrentStandingsContextState
	);

export const CurrentStandingsContextProvider: FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [driverId, setDriverId] = useState("max_verstappen");
	const [currentStanding, setCurrentStanding] = useState<DriverStanding>();

	useEffect(() => {
		let mounted = true;
		fetch(`https://api.jolpi.ca/ergast/f1/current/drivers/${driverId}/driverstandings.json`)
			.then((response) => response.json())
			.then((standing) => {
				if (!mounted) return;
				setCurrentStanding(
					standing?.MRData?.StandingsTable.StandingsLists[0].DriverStandings[0]
				);
			});
		return () => {
			mounted = false;
		};
	}, [driverId]);

	return (
		<CurrentStandingsContext.Provider
			value={{ driverId, setDriverId, currentStanding }}
		>
			{children}
		</CurrentStandingsContext.Provider>
	);
};
