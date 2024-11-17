import { useEffect, useState } from "react";

import { CarAvatar } from "../Cars/CarAvatar";
import { TeamLogo } from "../TeamLogos/TeamLogo";

import "./standings.css";
import { DriverStandingCard } from "./Drivers/DriverStandingsCard/DriverStandingCard";

import { useAppContext } from "../Context/AppContext";
import { AnimatedHeader } from "../../Pages/Test/AnimatedHeader";

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

const StandingPageHeader = () => {
	return (
		<section className='relative z-10 w-full min-h-[8svh] flex justify-center items-center bg-dynamic text-white'>
			<h2 className='max-w-[90%] text-center'>Standings</h2>
		</section>
	);
};

export const DriverStandings = () => {
	const [expandedItemId, setExpandedItemId] = useState<number | undefined>();
	const [driverInfo, setDriverInfo] = useState<StandingsTable | undefined>();
	const { driverStandings, isLoading, error } = useAppContext();

	const handleExpand = (index: number) => {
		setExpandedItemId((prev) => {
			if (prev === index) {
				return undefined;
			}

			return index;
		});
	};

	useEffect(() => {
		if (driverStandings?.MRData?.StandingsTable) {
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
			<AnimatedHeader/>
		);
	}

	const driverResults = driverInfo?.StandingsLists[0]?.DriverStandings;

	return (
		<>
			{!driverResults ? (
				<AnimatedHeader />
			) : (
				driverResults.map((result, index) => (
					<DriverStandingCard
						key={index}
						result={result}
						index={index}
						expanded={expandedItemId === index}
						expand={() => handleExpand(index)}
					/>
				))
			)}
		</>
	);
};

export const ConstructorStandings = () => {
	const { constructorStandings, isLoading, error } = useAppContext();
	const [constructorData, setConstructorData] = useState<
		StandingsTable | undefined
	>();

	useEffect(() => {
		if (constructorStandings?.MRData?.StandingsTable) {
			setConstructorData(constructorStandings?.MRData?.StandingsTable);
		}
	}, [constructorStandings.MRData.StandingsTable]);

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

	const constructorResults =
		constructorData?.StandingsLists[0].ConstructorStandings;

	return (
		<>
			{!constructorResults ? (
				<AnimatedHeader />
			) : (
				constructorResults.map((result) => (
					<div key={result.Constructor?.constructorId}>
						<div 
						className='standings-card constructor-cards'
						>
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
				))
			)}
		</>
	);
};

export const StandingsResults = () => {
	const [selectResult, setSelectResult] = useState<string>("driverstandings");

	const driverstandings =
		selectResult === "driverstandings"
			? "transition-all text-black hover:text-white"
			: "text-white hover:text-black";

	const constructorstandings =
		selectResult === "constructorstandings"
			? "transition-all text-black hover:text-white"
			: "text-white hover:text-black";

	return (
		<>
			<StandingPageHeader />
			<section className=''>
				<div className='min-h-[7svh] w-full bg-dynamic flex items-center justify-evenly text-white font-Formula1-Bold border-t-2'>
					<button
						className={driverstandings}
						onClick={() => setSelectResult("driverstandings")}
					>
						Drivers
					</button>
					<button
						className={constructorstandings}
						onClick={() => setSelectResult("constructorstandings")}
					>
						Constructors
					</button>
				</div>

				<div className='w-full flex flex-col gap-4 pt-8 pb-[10svh]'>
					{selectResult === "driverstandings" ? (
						<DriverStandings />
					) : (
						<ConstructorStandings />
					)}
				</div>
			</section>
		</>
	);
};
