import { FC, useState } from "react";
import { DriverStanding } from "../../Classification/Standings";
import { DriverAvatar } from "../../DriverPictures/DriverAvatar";
import { DriverDetails } from "../../DriverDetails/DriverDetails";
import { CurrentStandingsContextProvider } from "../../Context/CurrentStandingsContext";

import driversBgc from "../../../Assets/Pictures/driversBgc.jpg";

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
					className=' max-w-[96%]  flex flex-col gap-6  '
					onClick={() => setShowDetails((prev) => !prev)}
				>
					<div
						className='w-[97%] rounded-tr-3xl rounded-br-3xl'
						style={{
							backgroundImage: driversBgc ? `url(${driversBgc})` : "none",
						}}
					>
						<DriverAvatar
							givenName={driver.Driver.givenName}
							familyName={driver.Driver.familyName}
						/>
					</div>
					<div className='w-[97%]  pb-2  border-b-[3px]   border-grey-200  text-center '>
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

			{showDetails && (
				<CurrentStandingsContextProvider>
					<DriverDetails driverId={driver?.Driver.driverId} />
				</CurrentStandingsContextProvider>
			)}
		</>
	);
};
