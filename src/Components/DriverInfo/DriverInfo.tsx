import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { DriverInfoCard } from "./DriverInfoCard/DriverInfoCard";
import "./driver-info.css";
import { StandingsTable } from "../Classification/Standings";

export const DriverInfo = () => {
	const [driverInfo, setDriverInfo] = useState<StandingsTable | undefined>();
	const { driverStandings, isLoading, error } = useAppContext();

	useEffect(() => {
		if (driverStandings.MRData?.StandingsTable) {
			setDriverInfo(driverStandings.MRData.StandingsTable);
		}
	}, [driverStandings]);

	if (error) {
		return (
			<div>
				<p>{error.message}</p>
			</div>
		);
	}

	if (isLoading) {
		return (
			<div>
				<p>Ładowanie...</p>
			</div>
		);
	}

	const currentDrivers = driverInfo?.StandingsLists[0]?.DriverStandings;

	return (
		<section className='driver-info-wrapper'>
			<div className='driver-info-container'>
				<div className='driver-info-title'>
					<h2>Current Season Drivers</h2>
				</div>

				{currentDrivers && (
					<div className='driver-info-cards-box'>
						{currentDrivers.map((driver) => (
							<DriverInfoCard
								driver={driver}
								key={driver.Driver.driverId}
							/>
						))}
					</div>
				)}
			</div>
			<div className='driver-info-section-shadow'></div>
		</section>
	);
};
