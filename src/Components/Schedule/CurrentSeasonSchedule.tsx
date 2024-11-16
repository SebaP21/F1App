import { FC, useEffect, useState } from "react";
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
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const { currentSchedule, isLoading, error } = useAppContext();

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

	const eventSchedule = currentSeason?.Races;

	const handleCardClick = (index: number) => {
		setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	return (
		<section className='w-full min-h-[80svh] flex justify-center pt-8 pb-[12svh]'>
			<div className='w-[90%]  flex flex-col gap-6 '>
				{eventSchedule &&
					eventSchedule.map((data, index) => (
						<div key={index}>
							<CurrentScheduleCard
								data={data}
								index={index}
								isActive={activeIndex === index}
								onCardClick={() => handleCardClick(index)}
							/>
						</div>
					))}
			</div>
		</section>
	);
};

type CurrentScheduleCardProps = {
	data: Races | undefined;
	index: number;
};

export const CurrentScheduleCard: FC<
	CurrentScheduleCardProps & {
		isActive: boolean;
		onCardClick: () => void;
		index: number;
	}
> = ({ data, isActive, onCardClick, index }) => {
	const [showDetails, setShowDetails] = useState(false);

	useEffect(() => {
		setShowDetails(isActive);
	}, [isActive]);

	const eventSchedule = data;

	const timeZone = "Europe/Warsaw";

	const timeToTimeZone = (date: string, time: string) => {
		const eventDate = dayjs.tz(`${date}T${time}`, "UTC");
		return eventDate.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
	};

	const cardClasses =
		index === 0
			? "w-full rounded-xl bg-gray-600 text-white flex flex-col gap-4 p-4 transition-all hover:scale-105 cursor-pointer shadow-xl"
			: "w-full rounded-xl bg-gray-200 text-black flex flex-col gap-4 p-4 transition-all hover:scale-105 cursor-pointer shadow-xl";

	const textColorCustom = index === 0 ? `text-white` : `text-black`;

	return (
		<>
			{eventSchedule && (
				<div
					className={cardClasses}
					onClick={onCardClick}
				>
					<div className='w-full flex items-center justify-between gap-2'>
						<h3 className='text-lg'>{eventSchedule.raceName}</h3>
						<div className='w-[40px] rounded-md overflow-hidden'>
							<Flag country={eventSchedule.Circuit.Location.country} />
						</div>
					</div>
					<div className='w-full flex items-center justify-between'>
						<div className='max-w-[50%] flex flex-col gap-2'>
							<p className={textColorCustom}>
								{eventSchedule.Circuit.Location.locality}
							</p>
							<p className={textColorCustom}>
								{eventSchedule.Circuit.circuitName}
							</p>
							<h5 className='text-sm text-dynamic'>
								{eventSchedule.date && (
									<>{timeToTimeZone(eventSchedule.date, eventSchedule.time)}</>
								)}
							</h5>
						</div>
						<div className='max-w-[40%]'>
							{eventSchedule.Circuit.Location.country && (
								<CircuitsAvatar
									country={eventSchedule.Circuit.Location.country}
								/>
							)}
						</div>
					</div>
					<div
						className={`${
							showDetails ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
						} overflow-hidden transition-all duration-500 ease-in-out w-full flex items-center justify-between gap-4`}
					>
						<div className='max-w-[50%] flex flex-col gap-2'>
							<div>
								<h4 className="text-sm">Qualifying</h4>
								<p className={textColorCustom}>
									{eventSchedule.Qualifying.date && (
										<>
											{timeToTimeZone(
												eventSchedule.Qualifying.date,
												eventSchedule.Qualifying.time
											)}
										</>
									)}
								</p>
							</div>
							{eventSchedule.Sprint?.date && (
								<div>
									<h4 className="text-sm">Sprint</h4>
									<p className={textColorCustom}>
										{timeToTimeZone(
											eventSchedule.Sprint.date,
											eventSchedule.Sprint.time
										)}
									</p>
								</div>
							)}
							{eventSchedule.ThirdPractice?.date && (
								<div>
									<h4 className="text-sm">3rd Practice</h4>
									<p className={textColorCustom}>
										{timeToTimeZone(
											eventSchedule.ThirdPractice.date,
											eventSchedule.ThirdPractice.time
										)}
									</p>
								</div>
							)}
						</div>
						<div className='max-w-[50%] flex flex-col gap-2'>
							<div>
								<h4 className="text-sm">2st Practice</h4>
								<p className={textColorCustom}>
									{eventSchedule.SecondPractice.date && (
										<>
											{timeToTimeZone(
												eventSchedule.SecondPractice.date,
												eventSchedule.SecondPractice.time
											)}
										</>
									)}
								</p>
							</div>
							<div>
								<h4 className="text-sm">1st Practice</h4>
								<p className={textColorCustom}>
									{eventSchedule.FirstPractice.date && (
										<>
											{timeToTimeZone(
												eventSchedule.FirstPractice.date,
												eventSchedule.FirstPractice.time
											)}
										</>
									)}
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

{
	/* {eventSchedule?.map((event, index) => (
	<div
		className='wrapper race-item flex flex-col gap-4'
		key={index}
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
))} */
}
