import React, { createContext, useContext, ReactNode } from "react";
import { useConstructorStandingsQuery } from "../../queries/useConstructorStandings";
import { useDriverStandingsQuery } from "../../queries/useDriverStandings";
import { useCurrentScheduleQuery } from "../../queries/useCurrentScheduleQuery";

interface AppContextProps {
	constructorStandings: any;
	driverStandings: any;
	currentSchedule: any;
	isLoading: boolean;
	error: Error | null;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const constructorStandingsQuery = useConstructorStandingsQuery();
	const driverStandingsQuery = useDriverStandingsQuery();
	const currentScheduleQuery = useCurrentScheduleQuery();

	const isLoading =
		constructorStandingsQuery.isLoading ||
		driverStandingsQuery.isLoading ||
		currentScheduleQuery.isLoading;

	const error =
		constructorStandingsQuery.error ||
		driverStandingsQuery.error ||
		currentScheduleQuery.error;

	return (
		<AppContext.Provider
			value={{
				constructorStandings: constructorStandingsQuery.data,
				driverStandings: driverStandingsQuery.data,
				currentSchedule: currentScheduleQuery.data,
				isLoading,
				error,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};
