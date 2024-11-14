import { useEffect, useState } from "react";
import { StandingsTable } from "../Classification/Standings";
import "./driver-info.css";
import { DriverInfoCard } from "./DriverInfoCard/DriverInfoCard";

export const DriverInfo = () => {
	const [driverInfo, setDriverInfo] = useState<StandingsTable>();

	useEffect(() => {
		let mounted = true;
		fetch(`/api/f1/current/driverstandings.json`, {
			mode: "no-cors",
		})
			.then((response) => response.json())
			.then((info) => {
				if (!mounted) return;
				setDriverInfo(info.MRData.StandingsTable);
			});
		return () => {
			mounted = false;
		};
	}, []);
	const currentDrivers = driverInfo?.StandingsLists[0]?.DriverStandings;

	return (
		<section className='driver-info-wrapper'>
			{driverInfo ? (
				<div className='driver-info-container'>
					<div className='driver-info-title'>
						<h2>Current Season Drivers</h2>
					</div>
					<div className='driver-info-cards-box'>
						{currentDrivers?.map((driver) => (
							<DriverInfoCard
								driver={driver}
								key={driver.Driver.driverId}
							/>
						))}
					</div>
				</div>
			) : (
				<div>
					<p>Loading...</p>
				</div>
			)}
			<div className='driver-info-section-shadow'></div>
		</section>
	);
};
