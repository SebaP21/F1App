import { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import { DriverInfoCard } from "./DriverInfoCard/DriverInfoCard";
import "./driver-info.css";
import { StandingsTable } from "../Classification/Standings";

import backgroundImage from "../../Assets/Pictures/4-Best-F1-tracks.jpg";

export const DriverInfo = () => {
	const [driverInfo, setDriverInfo] = useState<StandingsTable | undefined>();
	const { driverStandings, isLoading, error } = useAppContext();

	useEffect(() => {
		if (driverStandings?.MRData?.StandingsTable) {
			setDriverInfo(driverStandings?.MRData?.StandingsTable);
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
		<section className='relative w-full flex flex-col '>
			<div className='relative z-10 w-full min-h-[8svh] flex justify-center items-center bg-dynamic text-white'>
				<h2 className='max-w-[90%] text-center'>Current Season Drivers</h2>
			</div>
			<div className='relative z-10 w-full'>
				<div
					style={{
						backgroundImage: backgroundImage
							? `url(${backgroundImage})`
							: "none",
					}}
					className='relative w-full flex items-center min-h-[80svh] bg-center bg-cover '
				>
					<div className='w-[95%] flex z-10 rounded-tr-xl rounded-br-xl bg-white pt-4 pb-2 -mt-[8svh]'>
						{currentDrivers && (
							<div className='driver-info-cards-box w-[97%] relative max-h-[60svh] overflow-y-scroll overflow-x-hidden z-10 bg-white pt-8 border-t-[3px] border-t-dynamic border-r-[3px] border-r-dynamic rounded-tr-xl gap-4'>
								{currentDrivers.map((driver) => (
									<DriverInfoCard
										driver={driver}
										key={driver.Driver.driverId}
									/>
								))}
							</div>
						)}
					</div>
				</div>
				<div className='absolute bg-black top-0 w-full h-[100%] bg-opacity-80'></div>
			</div>
		</section>
	);
};
