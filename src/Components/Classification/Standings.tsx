import { FC, useContext, useEffect, useState } from "react";
import { DriverAvatar } from "../DriverPictures/DriverAvatar";

import { Helmets } from "../Helmets/HelmetsPicture";
import { CarAvatar } from "../Cars/CarAvatar";
import { TeamLogo } from "../TeamLogos/TeamLogo";

import "./standings.css";
import { DriverStandingCard } from "./Drivers/DriverStandingsCard/DriverStandingCard";

export type Driver = {
	driverId: string;
	permanentNumber: number;
	code: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
};

export type Constructor = {
	constructorId: string;
	name: string;
	nationality: string;
};

export type DriverStanding = {
	position: number;
	positionText: string;
	points: number;
	wins: number;
	Driver: Driver;
	Constructor?: Constructor;
};

export type StandingsList = {
	DriverStandings?: DriverStanding[];
	ConstructorStandings?: DriverStanding[];
};

export type StandingsTable = {
	StandingsLists: StandingsList[];
};

type DriverStandingsProps = {
	driverResults: DriverStanding[];
};

type ConstructorStandingsProps = {
	constructorResults: DriverStanding[];
};

const StandingPageHeader = () => {
	return (
		<section className='racing-header'>
			<h2>Standings</h2>
		</section>
	);
};

export const DriverStandings: FC<DriverStandingsProps> = ({
	driverResults,
}) => {
	const [expandedItemId, setExpandedItemId] = useState<number | undefined>();

	const handleExpand = (index: number) => {
		setExpandedItemId((prev) => {
			if (prev === index) {
				return undefined;
			}

			return index;
		});
	};

	return (
		<>
			{driverResults.map((result, index) => (
				<DriverStandingCard
					key={index}
					result={result}
					index={index}
					expanded={expandedItemId === index}
					expand={() => handleExpand(index)}
				/>
			))}
		</>
	);
};

export const ConstructorStandings: FC<ConstructorStandingsProps> = ({
	constructorResults,
}) => {
	return (
		<>
			{constructorResults.map((result) => (
				<div key={result.Constructor?.constructorId}>
					<div className='standings-card constructor-cards'>
						<div className='standing-cards-wrapper'>
							<div className='standings-position'>
								<h2>{result.position}</h2>
							</div>
							<div className='constructor-standings-name'>
								<h3>{result.Constructor?.name}</h3>
							</div>
							{/*  */}
							<div className='team-standings-image'>
								<TeamLogo Constructor={result.Constructor?.name} />
							</div>
							<div>
								<div className='team-standings-points'>
									<h4>{result.points}</h4>
									<p>PTS</p>
								</div>
							</div>
						</div>
						<div className='standings-car-animation'>
							<CarAvatar Constructor={result.Constructor?.name} />
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export const StandingsResults = () => {
	const [standings, setStandings] = useState<StandingsTable | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectResult, setSelectResult] = useState<string>("driverstandings");

	useEffect(() => {
		let mounted = true;
		fetch(`http://ergast.com/api/f1/current/${selectResult}.json`)
			.then((response) => response.json())
			.then((standings) => {
				if (!mounted) return;
				setStandings(standings.MRData.StandingsTable);
				setLoading(false);
			});

		return () => {
			mounted = false;
		};
	}, [selectResult]);

	const driverResults = standings?.StandingsLists[0].DriverStandings || [];
	const constructorResults =
		standings?.StandingsLists[0].ConstructorStandings || [];

	if (!standings) return <p>"Brak danych"</p>;
	return (
		<section className='app-wrapper standingsTable'>
			<StandingPageHeader />
			<div className='buttons-wrapper'>
				<button
					className='select-btn'
					onClick={() => setSelectResult("driverstandings")}
				>
					Drivers
				</button>
				<button
					className='select-btn'
					onClick={() => setSelectResult("constructorStandings")}
				>
					Constructors
				</button>
			</div>

			{loading ? (
				<p>Loading....</p>
			) : (
				<div className='standings'>
					{selectResult === "driverstandings" ? (
						<DriverStandings driverResults={driverResults} />
					) : (
						<ConstructorStandings constructorResults={constructorResults} />
					)}
				</div>
			)}
		</section>
	);
};
