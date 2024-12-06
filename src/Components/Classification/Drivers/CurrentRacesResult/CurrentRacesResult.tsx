import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import "./currentRacesResult.css";
import { CurrentRacesResultCard } from "./CurrentRaceResultCard";
import { useState } from "react";
dayjs.extend(utc);
dayjs.extend(timezone);

export type Results = {
	number: string;
	position: number;
	positionText: string;
	points: number;
	Driver: {
		driverId: string;
		permanentNumber: number;
		code: string;
		givenName: string | undefined;
		familyName: string;
		dateOfBirth?: string;
	};
	Constructor: {
		constructorId: string;
		name: string;
		nationality?: string;
	};
	laps: number;
	status: string;
	Time: {
		time: string;
	};
};

export type Races = {
	season: string;
	raceName: string;
	round: number;
	Circuit: {
		circuitId?: string;
		circuitName: string;
		Location: {
			locality: string;
			country: string;
		};
	};
	date: string;
	time: string;
	Results: Results[];
};

export type RaceTable = {
	season: number;
	Races: Races[];
};

export const CurrentRacesResult = () => {
	const numberOfRaces = Array.from({ length: 24 }, (_, index) => index + 1);
	const [showDetails, setShowDetails] = useState<number | null>(null);
  
	const handleShowDetails = (round: number) => {
	  setShowDetails((prev) => (prev === round ? null : round));
	};
  
	return (
	  <section className="w-full min-h-[80svh] flex flex-col items-center pt-8 pb-[15svh]">
		<div className="w-[90%] flex flex-col gap-2 md:gap-6 md:pt-6">
		  <h1 className="text-center">Last results</h1>
		  {numberOfRaces.slice().reverse().map((round) => (
			<div key={round} >
			  <CurrentRacesResultCard
				round={round.toString()}
				showDetails={showDetails}
				onShowDetails={handleShowDetails}
			  />
			</div>
		  ))}
		</div>
	  </section>
	);
  };
  
