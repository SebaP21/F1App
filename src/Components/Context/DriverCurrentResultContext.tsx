import {
	Dispatch,
	FC,
	ReactNode,
	SetStateAction,
	createContext,
	useEffect,
	useState,
} from "react";
import { RaceTable } from "../DriverDetails/DriverDetails";

type DriverCurrentResultsState = {
	selectDriver: string;
	setSelectDriver: Dispatch<SetStateAction<string>>;
	driverResultsContext: RaceTable | undefined;
};

export const DriverCurrentResultsContext =
	createContext<DriverCurrentResultsState>({} as DriverCurrentResultsState);

export const DriverCurrentResultsContextProvider: FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [selectDriver, setSelectDriver] = useState("alonso");
	const [driverResultsContext, setDriverResultsContext] = useState<RaceTable>();

	useEffect(() => {
		let mounted = true;
		fetch(
			`https://api.jolpi.ca/ergast/f1/current/drivers/${selectDriver}/results.json`
		)
			.then((response) => response.json())
			.then((info) => {
				if (!mounted) return;
				setDriverResultsContext(info.MRData.RaceTable);
			});
		return () => {
			mounted = false;
		};
	}, [selectDriver]);

	return (
		<DriverCurrentResultsContext.Provider
			value={{ selectDriver, setSelectDriver, driverResultsContext }}
		>
			{children}
		</DriverCurrentResultsContext.Provider>
	);
};
