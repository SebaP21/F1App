import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Flag } from "../Flags/Flags";
import { CircuitsAvatar } from "../Circuits/CircuitsAvatar";
import { useAppContext } from "../Context/AppContext";

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
	const { currentSchedule, isLoading, error } = useAppContext();
	const timeZone = "Europe/Warsaw";
	

	useEffect(() => {
		if (currentSchedule?.MRData?.RaceTable) {
			setCurrentSeason(currentSchedule?.MRData?.RaceTable);
			const allEvents = currentSchedule?.MRData?.RaceTable.Races;
			const futureEvents = allEvents.filter((currentSchedule: Races) => {
				const eventDate = dayjs.tz(
					`${currentSchedule.date}T${currentSchedule.time}`,
					"UTC"
				);
				const now = dayjs();
				return eventDate.isAfter(now);
			});
			setCurrentSeason({
				...currentSchedule.MRData.RaceTable,
				Races: futureEvents,
			});
		}
	}, [currentSchedule]);

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

	const timeToTimeZone = (date: string, time: string) => {
		const eventDate = dayjs.tz(`${date}T${time}`, "UTC");
		return eventDate.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
	};

	const eventSchedule = currentSeason?.Races;

	return (
		<section className='app-wrapper'>
			{eventSchedule?.map((event, index) => (
				<div
					className='wrapper race-item flex flex-col gap-4'
					key={event.time + event.Circuit.circuitId}
				>
					<div
						className='flex flex-col gap-4 cursor-pointer'
						
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
					
						<div className='flex flex-col gap-4  text-center'>
							<div>
								<h4>Qualifying</h4>
								<p>
									{timeToTimeZone(event.Qualifying.date, event.Qualifying.time)}
								</p>
							</div>
							{event.Sprint?.date && (
								<div>
									<h4>Sprint</h4>
									<p>{timeToTimeZone(event.Sprint.date, event.Sprint.time)}</p>
								</div>
							)}
							{event.ThirdPractice?.date && (
								<div>
									<h4>3rd Practice</h4>
									<p>
										{timeToTimeZone(
											event.ThirdPractice.date,
											event.ThirdPractice.time
										)}
									</p>
								</div>
							)}
							<div>
								<h4>2nd Practice</h4>
								<p>
									{timeToTimeZone(
										event.SecondPractice.date,
										event.SecondPractice.time
									)}
								</p>
							</div>
							<div>
								<h4>1st Practice</h4>
								<p>
									{timeToTimeZone(
										event.FirstPractice.date,
										event.FirstPractice.time
									)}
								</p>
							</div>
						</div>
					
				</div>
			))}
		</section>
	);
};
