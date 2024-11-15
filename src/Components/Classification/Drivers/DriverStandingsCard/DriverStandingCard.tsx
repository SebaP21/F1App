import { FC, useContext } from "react";
import { DriverStanding, StandingsList } from "../../Standings";
import { DriverAvatarBackground } from "../../../DriverPictures/DriverAvatarBackground";
// import { DriverDetails } from "../../../DriverDetails/DriverDetails";
import { DriverCurrentResultsContext } from "../../../Context/DriverCurrentResultContext";
import { Flag } from "../../../Flags/Flags";

type DriverStandingCardProps = {
	result: DriverStanding;
	index: number;
	expanded: boolean;
	expand: () => void;
};

export const DriverStandingCard: FC<DriverStandingCardProps> = ({
	result,
	index,
	expanded,
	expand,
}) => {
	const { setSelectDriver, driverResultsContext } = useContext(
		DriverCurrentResultsContext
	);

	return (
		<div
			key={index}
			onClick={expand}
		>
			<div className='standing-card-wrapper'>
				<>
					<div
						className='standings-card'
						onClick={() => setSelectDriver(result.Driver.driverId)}
					>
						<div className='standings-position'>
							<h2>{result.position}</h2>
						</div>
						<div className='driver-standings-name'>
							<h5>{result.Driver.givenName}</h5>
							<h3>{result.Driver.familyName}</h3>
						</div>
						<DriverAvatarBackground
							givenName={result.Driver.givenName}
							familyName={result.Driver.familyName}
						>
							<div className='driver-standings-points'>
								<h4>{result.points}</h4>
								<p>PTS</p>
							</div>
						</DriverAvatarBackground>
					</div>

					{expanded && (
						<div className='standings-card-last-races'>
							{driverResultsContext?.Races.map((race, index) => (
								<div
									className='standings-card-last-races-item'
									key={index}
								>
									<Flag country={race.Circuit.Location.country} />
									<h5>{race.raceName}</h5>
									<div className='standings-card-last-races-item-points'>
										<p>{race.Results[0].points}</p>
										<h6>PTS</h6>
									</div>
									<div className='standings-card-last-races-item-points'>
										<p>{race.Results[0].position}</p>
										<h6>POS</h6>
									</div>
								</div>
							))}
						</div>
					)}
				</>
			</div>
		</div>
	);
};

// {expanded && (
// 	<div className='standings-card'>
// 		{driverResultsContext?.Races.map((race) => (
// 			<>
// 				<h5>{race.raceName}</h5>
// 				<p> POS{race.Results[0].position}</p>
// 				<p>PTS{race.Results[0].points}</p>
// 			</>
// 		))}
