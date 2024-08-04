import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Flag } from "../Flags/Flags";
import { CircuitsAvatar } from "../Circuits/CircuitsAvatar";

dayjs.extend(utc);
dayjs.extend(timezone);

type RaceTable = {
	season: number;
	Races: Races[];
};
type Races = {
	season: string;
	round: string;
	raceName: string;
	Circuit: {
		circuitId: string;
		circuitName: string;
		Location: {
			locality: string;
			country: string;
		};
	};
	date: string;
	time: string;
	FirstPractice: {
		date: string;
		time: string;
	};
	SecondPractice: {
		date: string;
		time: string;
	};
	ThirdPractice?: {
		date: string;
		time: string;
	};
	Qualifying: {
		date: string;
		time: string;
	};
	Sprint?: {
		date: string;
		time: string;
	};
};

export const CurrentSchedule = () => {
	const [currentSeason, setCurrentSeason] = useState<RaceTable>();
	const timeZone = "Europe/Warsaw";

	useEffect(() => {
		let mounted = true;
		fetch("https://ergast.com/api/f1/current.json")
			.then((response) => response.json())
			.then((events) => {
				if (!mounted) return;
				const allEvents = events.MRData.RaceTable.Races;
				const futureEvents = allEvents.filter((event: Races) => {
					const eventDate = dayjs.tz(`${event.date}T${event.time}`, "UTC");
					const now = dayjs();
					return eventDate.isAfter(now);
				});
				setCurrentSeason({ ...events.MRData.RaceTable, Races: futureEvents });
			});
		return () => {
			mounted = false;
		};
	}, []);

	const timeToTimeZone = (date: string, time: string) => {
		const eventDate = dayjs.tz(`${date}T${time}`, "UTC");
		return eventDate.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
	};

	const eventSchedule = currentSeason?.Races;

	return (
		<section className='app-wrapper'>
			{eventSchedule?.map((event) => (
				<div
					className='wrapper race-item'
					key={event.time + event.Circuit.circuitId}
				>
					<div className='race-title'>
						<h3>{event.raceName}</h3>
						<Flag country={event.Circuit.Location.country} />
					</div>
					<div className='race-time'>
						<div>
							<p>{event.Circuit.Location.locality}</p>
							<p>{event.Circuit.circuitName}</p>
							<h5>{timeToTimeZone(event.date, event.time)}</h5>
						</div>
						<div>
							<CircuitsAvatar country={event.Circuit.Location.country} />
						</div>
					</div>
				</div>
			))}
		</section>
	);
};
