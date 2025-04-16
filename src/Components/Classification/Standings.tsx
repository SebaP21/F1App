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
			<div>
				<AnimatedHeader />
			</div>
		);
	}

	const driverResults = driverInfo?.StandingsLists[0]?.DriverStandings;

	return (
		<>
			{!driverResults ? (
				<div>
					<p>Loading...</p>
				</div>
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
		return <AnimatedHeader />;
	}

	const constructorResults =
		constructorData?.StandingsLists[0].ConstructorStandings;

	return (
		<>
			{!constructorResults ? (
				<div>
					<p>Loading...</p>
				</div>
			) : (
				constructorResults.map((result) => (
					<div
						className='w-full flex flex-col overflow-hidden'
						key={result.Constructor?.constructorId}
					>
						<div className='w-[95%] flex-col rounded-r-xl  bg-gray-200 items-center'>
							<div className='w-full flex items-center justify-between gap-6 px-2 pt-4 standing-cards-wrapper'>
								<div className='flex min-w-[15%] min-h-[6svh] items-center justify-center border-r-2 border-gray-500 lg:text-xl'>
									<h2>{result.position}</h2>
								</div>
								<div className="lg:text-xl">
									<h3>{result.Constructor?.name}</h3>
								</div>
								<div className='max-w-[25%] md:max-w-[15%] rounded-lg overflow-hidden lg:max-w-[10%] xl:max-w-[7%]'>
									<TeamLogo Constructor={result.Constructor?.name} />
								</div>
								<div className='bg-gray-300 px-4  rounded-xl text-center'>
									<h4>{result.points}</h4>
									<p>PTS</p>
								</div>
							</div>
							<div className='max-w-[40%]  standings-car-animation mx-auto pt-4 pb-2 md:max-w-[30%] lg:max-w-[20%] xl:max-w-[15%]'>
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
	const [selectResult, setSelectResult] = useState<string>("constructorstandings");

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
			<section className='flex flex-col items-center'>
				<div className='min-h-[7svh] w-full bg-dynamic flex items-center justify-evenly text-white font-Formula1-Bold border-t-2'>
					
					<button
						className={constructorstandings}
						onClick={() => setSelectResult("constructorstandings")}
					>
						Constructors
					</button>
					<button
						className={driverstandings}
						onClick={() => setSelectResult("driverstandings")}
					>
						Drivers
					</button>
				</div>

				<div className='md:max-w-[1100px]  w-full flex flex-col gap-4 pt-8 pb-[13svh]'>
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
