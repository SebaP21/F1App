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
import { AnimatedHeader } from "../../Pages/Test/AnimatedHeader";

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

	if (!data) {
		return (
			<div>
				<AnimatedHeader />
			</div>
		);
	}

	return (
		<>
			{infoInView && (
				<section
					className='fixed inset-0 top-[1svh] z-50 driver-details-card bg-white text-white flex flex-col mx-auto rounded-3xl mb-[11svh] md:grid md:grid-cols-2  md:gap-6 md:p-2 lg:max-w-[1100px]'
					style={{ width: "95vw" }}
				>
					<div className='hidden md:flex flex-col  gap-8 pt-4 m-2'>
						<div className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
							<div>
								<h2>{driver?.givenName}</h2>
								<h2>{driver?.familyName}</h2>
							</div>
							<div>
								<Helmets familyName={driver?.familyName} />
							</div>
							<div>
								<h2>{driver?.permanentNumber}</h2>
							</div>
						</div>
						<div className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
							<div>
								<h5>Date of birth</h5>
								<p>{driver?.dateOfBirth}</p>
							</div>
							<div>
								<h5>Nationality</h5>
								<p>{driver?.nationality}</p>
							</div>
						</div>
						<fieldset className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
							<legend className='font-Formula1-Bold '>Team</legend>
							<div className='max-w-[30%]'>
								<CarAvatar Constructor={constructor?.name} />
							</div>
							<h3>{constructor?.name}</h3>
							<div className='max-w-[30%]'>
								<TeamLogo Constructor={constructor?.name} />
							</div>
						</fieldset>
					</div>
					<div className=''>
						<div className="rounded-3xl overflow-hidden">
							<DriverPicture familyName={driver?.familyName} />
						</div>
						<button
							className='absolute top-6 right-6 text-2xl font-Formula1-Bold'
							onClick={() => setInfoInView(false)}
						>
							X
						</button>
					</div>
					
						<fieldset className='hidden w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl md:flex flex-col justify-between items-center text-black p-4 gap-6 max-h-[40svh] overflow-y-auto '>
							<legend className='font-Formula1-Bold '>
								Season {RaceTable?.season} Results
							</legend>
							<div className='w-full flex justify-between'>
								<div className='text-center'>
									<h5 className='mb-2'>Points</h5>
									<p>{currentStanding?.points}</p>
								</div>
								<div className='text-center'>
									<h5 className='mb-2'>Position</h5>
									<p>{currentStanding?.position}</p>
								</div>
							</div>
							<div className='w-full flex flex-col gap-2  '>
								<DriverCurrentResults results={results} />
							</div>
						</fieldset>
						{driver ? (
							<fieldset className='md:flex w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl hidden flex-col justify-between items-center text-black p-4 gap-6 max-h-[30svh] overflow-y-auto'>
								<legend className='font-Formula1-Bold '>
									All Seasons Standings
								</legend>
								<DriverHistoricalResults driverId={driver.driverId} />
							</fieldset>
						) : (
							<p>Loading...</p>
						)}
				
					<div className=' w-full flex flex-col pt-4 items-center md:hidden'>
						<div className=' w-[95%] min-h-[50svh] flex flex-col gap-6'>
							<div className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
								<div>
									<h2>{driver?.givenName}</h2>
									<h2>{driver?.familyName}</h2>
								</div>
								<div>
									<Helmets familyName={driver?.familyName} />
								</div>
								<div>
									<h2>{driver?.permanentNumber}</h2>
								</div>
							</div>
							<div className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
								<div>
									<h5>Date of birth</h5>
									<p>{driver?.dateOfBirth}</p>
								</div>
								<div>
									<h5>Nationality</h5>
									<p>{driver?.nationality}</p>
								</div>
							</div>

							<fieldset className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex justify-between items-center text-black p-4'>
								<legend className='font-Formula1-Bold '>Team</legend>
								<div className='max-w-[30%]'>
									<CarAvatar Constructor={constructor?.name} />
								</div>
								<h3>{constructor?.name}</h3>
								<div className='max-w-[30%]'>
									<TeamLogo Constructor={constructor?.name} />
								</div>
							</fieldset>
							<fieldset className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex flex-col justify-between items-center text-black p-4 gap-6'>
								<legend className='font-Formula1-Bold '>
									Season {RaceTable?.season} Results
								</legend>
								<div className='w-full flex justify-between'>
									<div className='text-center'>
										<h5 className='mb-2'>Points</h5>
										<p>{currentStanding?.points}</p>
									</div>
									<div className='text-center'>
										<h5 className='mb-2'>Position</h5>
										<p>{currentStanding?.position}</p>
									</div>
								</div>
								<div className='w-full flex flex-col gap-2  '>
									<DriverCurrentResults results={results} />
								</div>
							</fieldset>
							{driver ? (
								<fieldset className='w-full border-t-[2px] border-r-[2px] border-gray-300 rounded-tr-3xl flex flex-col justify-between items-center text-black p-4 gap-6'>
									<legend className='font-Formula1-Bold '>
										All Seasons Standings
									</legend>
									<DriverHistoricalResults driverId={driver.driverId} />
								</fieldset>
							) : (
								<p>Loading...</p>
							)}
						</div>
					</div>
				</section>
			)}
		</>
	);
};
