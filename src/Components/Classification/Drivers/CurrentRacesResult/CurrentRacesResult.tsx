import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "./currentRacesResult.css";
import { CurrentRacesResultCard } from "./CurrentRaceResultCard";
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

	console.log(numberOfRaces);

	return (
		<section className='app-wrapper-current'>
			{numberOfRaces.map((round) => (
				<div key={round}>
					<CurrentRacesResultCard round={round.toString()} />
				</div>
			))}
			<h1>Last results</h1>
		</section>
	);
};
