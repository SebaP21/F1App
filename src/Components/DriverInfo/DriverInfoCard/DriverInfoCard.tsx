import { FC, useState } from "react";
import { DriverStanding } from "../../Classification/Standings";
import { DriverAvatar } from "../../DriverPictures/DriverAvatar";
import { DriverDetails } from "../../DriverDetails/DriverDetails";
// import { DriverCurrentResultsContextProvider } from "../../Context/DriverCurrentResultContext";
import { CurrentStandingsContextProvider } from "../../Context/CurrentStandingsContext";

type DriverInfoCardProps = {
	driver: DriverStanding | undefined;
};

export const DriverInfoCard: FC<DriverInfoCardProps> = ({ driver }) => {
	const [showDetails, setShowDetails] = useState(false);

	return (
		<>
			{driver ? (
				<div
					key={driver.Driver.driverId + driver.Driver.dateOfBirth}
					className='driver-info-card-item'
					onClick={() => setShowDetails((prev) => !prev)}
				>
					<div className='driver-info-card-avatar'>
						<DriverAvatar
							givenName={driver.Driver.givenName}
							familyName={driver.Driver.familyName}
						/>
						<div className='driver-info-card-shadow-image'></div>
						<div className='driver-info-card-avatar-shadow'></div>
					</div>
					<div className='driver-info-card-name'>
						<h3>
							{driver.Driver.givenName} {driver.Driver.familyName}
						</h3>
					</div>
				</div>
			) : (
				<div>
					<p>Loading....</p>
				</div>
			)}
			,
			{showDetails && (
				<CurrentStandingsContextProvider>
					<DriverDetails driverId={driver?.Driver.driverId} />
				</CurrentStandingsContextProvider>
			)}
		</>
	);
};
