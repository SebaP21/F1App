import { FC, useEffect, useState } from "react";
import { Flag } from "../../../Flags/Flags";
import { DriverAvatar } from "../../../DriverPictures/DriverAvatar";
import { TeamLogo } from "../../../TeamLogos/TeamLogo";
import { CircuitsAvatar } from "../../../Circuits/CircuitsAvatar";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "./currentRacesResult.css";
import { useRaceQuery } from "../../../../queries/useLastRacesQuery";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import { AnimationForRacing } from "../../../../Pages/Test/AnimationForRacing/AnimationForRacing";

dayjs.extend(utc);
dayjs.extend(timezone);

export type CurrentRacesResultCardProps = {
	round: string;
	showDetails: number | null;
	onShowDetails: (round: number) => void;
};

export const CurrentRacesResultCard: FC<CurrentRacesResultCardProps> = ({
	round,
	showDetails,
	onShowDetails,
}) => {
	const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.8 });

	const timeZone = "Europe/Warsaw";

	const { data, isLoading, error } = useRaceQuery(round);

	const handleDetailsClick = () => {
		onShowDetails(Number(round));
	};

	const timeToTimeZone = (date: string, time: string) => {
		const eventDate = dayjs.tz(`${date}T${time}`, "UTC");
		return eventDate.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
	};

	const [animateStep, setAnimateStep] = useState<number>(0);
	const [showAnimation, setShowAnimation] = useState(true);

	useEffect(() => {
		let timeout: NodeJS.Timeout;

		if (isLoading) {
			setShowAnimation(true);
			const animationDuration = 3000;

			timeout = setTimeout(() => {
				setShowAnimation(false);
			}, animationDuration);
		} else {
			if (showAnimation) {
				timeout = setTimeout(() => {
					setShowAnimation(false);
				}, 3000);
			} else {
				setShowAnimation(false);
			}
		}

		return () => clearTimeout(timeout);
	}, [isLoading]);

	useEffect(() => {
		if (isIntersecting) {
			const sequence = [3, 2, 1];
			const interval = setInterval(() => {
				setAnimateStep((prev) => {
					if (prev >= sequence.length) {
						clearInterval(interval);
						return prev;
					}
					return prev + 1;
				});
			}, 500);
			return () => clearInterval(interval);
		}
	}, [isIntersecting]);

	if (showAnimation) {
		return <AnimationForRacing />;
	}

	if (error) {
		return <div>Wystąpił błąd podczas ładowania danych.</div>;
	}

	const currentStandings = data?.MRData?.RaceTable?.Races;

	return (
		<>
			{currentStandings?.map((result, index) => (
				<div
					className={`${
						showDetails === Number(result.round) && " scale:105 my-6"
					} transition-all w-full min-h-[40svh] border border-black rounded-xl flex flex-col cursor-pointer my-2 hover:scale-105 `}
					key={index}
					onClick={handleDetailsClick}
					ref={ref}
				>
					<div>
						<div className='w-full flex justify-between px-4 pt-4 pb-2'>
							<h4>{result.Circuit.Location.country}</h4>
							<div className='w-[40px] rounded-md overflow-hidden border border-black flex'>
								<Flag country={result.Circuit.Location.country} />
							</div>
						</div>
						<div className='w-full flex justify-between px-4 gap-4 pb-2'>
							<div className='max-w-[45%] flex flex-col gap-2'>
								<p>Round {result.round}</p>
								<p>{result.Circuit.circuitName}</p>
								<p>
									{result.Circuit.Location.country},{" "}
									{result.Circuit.Location.locality}
								</p>
								<h5>{timeToTimeZone(result.date, result.time)}</h5>
							</div>
							<div className='max-w-[50%] flex items-center justify-center'>
								<CircuitsAvatar country={result.Circuit.Location.country} />
							</div>
						</div>
						<div className='w-full min-h-[27svh] grid grid-cols-3 gap-1 bg-gray-600 mt-2 rounded-br-xl rounded-bl-xl '>
							<div className=' flex items-end'>
								<div
									className={`w-full ${
										animateStep >= 2 ? "min-h-[17svh]" : "min-h-0"
									} flex justify-center items-center bg-slate-300 rounded-bl-xl rounded-t-xl transition-all duration-700 ease-in-out`}
								>
									<div className='w-[95%] -mt-[8svh] flex flex-col gap-2 text-center'>
										{result.Results[1].Driver.familyName && (
											<DriverAvatar
												givenName={result.Results[1].Driver.givenName}
												familyName={result.Results[1].Driver.familyName}
											/>
										)}
										<h4>{result.Results[1].Driver.code}</h4>
									</div>
								</div>
							</div>
							<div className=' flex items-end'>
								<div
									className={`w-full ${
										animateStep >= 3 ? "min-h-[22svh]" : "min-h-0"
									} flex justify-center items-center bg-amber-500 rounded-t-xl transition-all duration-700 ease-in-out`}
								>
									<div className='w-[100%]  -mt-[9svh] flex flex-col gap-2 text-center'>
										{result.Results[0].Driver.familyName && (
											<DriverAvatar
												givenName={result.Results[0].Driver.givenName}
												familyName={result.Results[0].Driver.familyName}
											/>
										)}
										<h4>{result.Results[0].Driver.code}</h4>
									</div>
								</div>
							</div>
							<div className=' flex items-end'>
								<div
									className={`w-full ${
										animateStep >= 1 ? "min-h-[14svh]" : "min-h-0"
									} flex justify-center items-center bg-amber-700 rounded-br-xl rounded-t-xl transition-all duration-700 ease-in-out`}
								>
									<div className='w-[95%] -mt-[8svh] flex flex-col gap-2 text-center'>
										{result.Results[2].Driver.familyName && (
											<DriverAvatar
												givenName={result.Results[2].Driver.givenName}
												familyName={result.Results[2].Driver.familyName}
											/>
										)}
										<h4>{result.Results[2].Driver.code}</h4>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div
						className={`${
							showDetails === Number(result.round)
								? "max-h-[1500px] opacity-100 p-2 mt-4"
								: "max-h-0 opacity-0 "
						}  w-full flex transition-all ease-in-out overflow-hidden `}
					>
						<table className='w-[100%] text-center mx-auto'>
							<thead>
								<tr>
									<th>POS.</th>
									<th>Driver</th>
									<th>Team</th>
									<th>Points</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
								{result.Results.map((data, index) => (
									<tr
										className='odd:bg-gray-300 even:rounded-md'
										key={index}
									>
										<td>{data.positionText}</td>
										<td className='font-Formula1-Bold text-sm'>
											{data.Driver.familyName}
										</td>
										<td>
											<div className='my-2 max-w-[50px] rounded-lg overflow-hidden mx-auto ml-1'>
												<TeamLogo Constructor={data.Constructor.name} />
											</div>
										</td>
										<td className='text-sm'>{data.points}</td>
										<td className='text-sm'>{data.status}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
		</>
	);
};
