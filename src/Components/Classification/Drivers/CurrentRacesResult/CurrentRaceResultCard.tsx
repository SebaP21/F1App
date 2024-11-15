import { FC, useEffect, useState } from "react";
import { Flag } from "../../../Flags/Flags";
import { DriverAvatar } from "../../../DriverPictures/DriverAvatar";
import { TeamLogo } from "../../../TeamLogos/TeamLogo";
import { CircuitsAvatar } from "../../../Circuits/CircuitsAvatar";
// import { CircuitPicture } from "../../../Circuits/CircuitPicture";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "./currentRacesResult.css";
import { RaceTable } from "./CurrentRacesResult";

dayjs.extend(utc);
dayjs.extend(timezone);

export type CurrentRacesResultCardProps = {
	round: number;
};

export const CurrentRacesResultCard: FC<CurrentRacesResultCardProps> = ({
	round,
}) => {
	const [currentResults, setCurrentResults] = useState<RaceTable>();
	const [showDetails, setShowDetails] = useState<number>();
	const [loading, setLoading] = useState(true);
	const timeZone = "Europe/Warsaw";



	//useLastRacesQuery


	useEffect(() => {
		let mounted = true;
		fetch(`https://ergast.com/api/f1/current/${round}
			/results.json?limit=10000`)
			.then((response) => response.json())
			.then((results) => {
				if (!mounted) return;
				setCurrentResults(results.MRData.RaceTable);
				setLoading(false);
			});
		return () => {
			mounted = false;
		};
	}, []);

	const handleDetails = (props: number) => {
		setShowDetails(undefined);
		setShowDetails(props);
	};

	const currentStandings = currentResults?.Races;

	const timeToTimeZone = (date: string, time: string) => {
		const eventDate = dayjs.tz(`${date}T${time}`, "UTC");
		return eventDate.tz(timeZone).format("YYYY-MM-DD HH:mm:ss");
	};
	return (
		<>
			{loading ? (
				<div>
					<p>Loading....</p>
				</div>
			) : (
				<>
					{currentStandings?.map((result,index) => (
						<div
							className='current-event'
							key={index}
							onClick={() => handleDetails(result.round)}
						>
							<div className='current-event-title'>
								<div className='current-event-name'>
									<div className='current-event-flag'>
										<Flag country={result.Circuit.Location.country} />
										<h3>{result.raceName}</h3>
									</div>

									<p>Round {result.round}</p>
									<p>{result.Circuit.circuitName}</p>
									<p>
										{result.Circuit.Location.country},{" "}
										{result.Circuit.Location.locality}
									</p>
									<h5>{timeToTimeZone(result.date, result.time)}</h5>
								</div>
								<CircuitsAvatar
									country={result.Circuit.Location.country}
									key={
										result.Circuit.circuitId +
										result.Circuit.circuitName +
										result.date
									}
								/>
							</div>
							<div className='podium-last-events'>
								{result.Results.slice(0, 3).map((podium) => (
									<div className='podium-last-event-driver'>
										<DriverAvatar
											givenName={`${podium.Driver.givenName}`}
											familyName={podium.Driver.familyName}
										/>
										<p key={podium.Driver.driverId}>{podium.Driver.code}</p>
									</div>
								))}
							</div>

							{showDetails === result.round && (
								<>
									<div className='current-event-result-details'>
										<table className='event-result'>
											<thead>
												<tr>
													<th>POS.</th>
													<th>Driver</th>
													<th>Team</th>

													<th>Points</th>
													<th>Laps</th>
													<th>Status</th>
												</tr>
											</thead>

											<tbody>
												{result.Results.map((data) => (
													<tr key={result.date + result.season + data.laps}>
														<td>{data.positionText}</td>
														<td>{`${data.Driver.givenName} ${data.Driver.familyName}`}</td>

														<td className='current-event-constructor'>
															<TeamLogo Constructor={data.Constructor.name} />
														</td>
														<td>{data.points}</td>
														<td>{data.laps}</td>
														<td>{data.status}</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</>
							)}
						</div>
					))}
				</>
			)}
		</>
	);
};
