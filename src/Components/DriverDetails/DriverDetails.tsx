import { FC, useContext, useState } from "react";
import { DriverPicture } from "../DriverPictures/DriverPicture";
import { Helmets } from "../Helmets/HelmetsPicture";
import { CarAvatar } from "../Cars/CarAvatar";
import { TeamLogo } from "../TeamLogos/TeamLogo";

import "./driver-details.css";
import { DriverHistoricalResults } from "../Classification/Drivers/DriverHistoricalResults/DriverHistoricalSeasonReasults";
import { DriverCurrentResults } from "../Driver/DriverCurrentResults";

import { CurrentStandingsContext } from "../Context/CurrentStandingsContext";
import { useDriverQuery } from "../../queries/useDriverQuery";

export type Results = {
	number: string;
	position: string;
	positionText: string;
	points: string;
	Driver: {
		driverId: string;
		permanentNumber: string;
		code: string;
		url: string;
		givenName: string;
		familyName?: string;
		dateOfBirth: string;
		nationality: string;
	};
	Constructor: {
		constructorId: string;
		url: string;
		name: string;
		nationality: string;
	};
	grid: string;
	laps: string;
	status: string;
	Time: {
		millis: string;
		time: string;
	};
	FastestLap: {
		rank: string;
		lap: string;
		Time: {
			time: string;
		};
		AverageSpeed: {
			units: string;
			speed: string;
		};
	};
};

export type Races = {
	season: string;
	round: string;
	url: string;
	raceName: string;
	Circuit: {
		circuitId: string;
		url: string;
		circuitName: string;
		Location: {
			lat: string;
			long: string;
			locality: string;
			country: string;
		};
	};
	date: string;
	time: string;
	Results: Results[];
};

export type RaceTable = {
	season: string;
	driverId: string;
	Races: Races[];
};

type DriverDetailsProps = {
	driverId: string | undefined;
};

export const DriverDetails: FC<DriverDetailsProps> = ({ driverId }) => {
	const [infoInView, setInfoInView] = useState(true);

	const { currentStanding } = useContext(CurrentStandingsContext);

	const { data } = useDriverQuery(driverId);
	const RaceTable = data?.MRData?.RaceTable;

	const driver = RaceTable?.Races[0].Results[0].Driver;
	const constructor = RaceTable?.Races[0].Results[0].Constructor;
	const results = RaceTable?.Races;

	return (
		<>
			{infoInView && (
				<section>
					<div className='driver-details-wrapper'>
						<div className='driver-details-image'>
							<DriverPicture familyName={driver?.familyName} />
							<button onClick={() => setInfoInView(false)}>X</button>
						</div>
						<div className='driver-details-info'>
							<div className='driver-details-name'>
								<h2>{driver?.givenName}</h2>
								<h2>{driver?.familyName}</h2>
							</div>
							<div className='driver-details-helmet'>
								<Helmets familyName={driver?.familyName} />
							</div>
							<div className='driver-details-permanent-number'>
								<h2>{driver?.permanentNumber}</h2>
							</div>
						</div>
						<div className='driver-details-info'>
							<div className='driver-details-birth'>
								<h5>Date of birth</h5>
								<p>{driver?.dateOfBirth}</p>
							</div>
							<div className='driver-details-birth'>
								<h5>Nationality</h5>
								<p>{driver?.nationality}</p>
							</div>
						</div>
						<div className='details-current'>
							<fieldset>
								<legend>Team</legend>
								<CarAvatar Constructor={constructor?.name} />
								<h3>{constructor?.name}</h3>
								<TeamLogo Constructor={constructor?.name} />
							</fieldset>
						</div>
						<div className='details-current '>
							<fieldset className='current-season-box scrollY'>
								<legend>Season {RaceTable?.season} Results </legend>
								<div className='current-season-item-box'>
									<div>
										<h5>Points</h5>
										<p>{currentStanding?.points}</p>
									</div>
									<div>
										<h5>Position</h5>
										<p>{currentStanding?.position}</p>
									</div>
								</div>
								<DriverCurrentResults results={results} />
							</fieldset>
						</div>
						{driver ? (
							<div className='details-current '>
								<fieldset className=''>
									<legend>All Seasons Standings</legend>
									<DriverHistoricalResults driverId={driver.driverId} />
								</fieldset>
							</div>
						) : (
							<p>Loading....</p>
						)}
					</div>
				</section>
			)}
		</>
	);
};
