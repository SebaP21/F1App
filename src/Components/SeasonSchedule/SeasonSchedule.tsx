import { useEffect, useState } from "react";

type Session = {
	location: string;
	country_key: number;
	country_code: string;
	country_name: string;
	circuit_key: number;
	circuit_short_name: string;
	session_type: string;
	session_name: string;
	date_start: string;
	date_end: string;
	gmt_offset: string;
	session_key: number;
	meeting_key: number;
	year: number;
};

export const SeasonSchedule = () => {
	const [sessions, setSessions] = useState<Session[]>([]);
	const [mergeSessions, setMergeSessions] = useState<any[]>([]);

	useEffect(() => {
		let mounted = true;
		fetch("https://api.openf1.org/v1/sessions?year=2025")
			.then((response) => response.json())
			.then((sessions) => {
				if (!mounted) return;
				setSessions(sessions);
			});

		return () => {
			mounted = false;
		};
	}, []);

	useEffect(() => {
		if (sessions.length > 0) {
			const mergedEvent: any = {};
			sessions.forEach((session) => {
				const eventName = session.location;
				if (mergedEvent[eventName]) {
					mergedEvent[eventName].push({
						session_name: session.session_name,
						session_country: session.country_name,
						date_start: session.date_start,
						session: session.location,
					});
				} else {
					mergedEvent[eventName] = [
						{
							session_name: session.session_name,
							date_start: session.date_start,
							country: session.country_name,
						},
					];
				}
			});
			setMergeSessions(Object.entries(mergedEvent));
		}
	}, [sessions]);
	return (
		<>
			<section className='schedule'>
				<div>
					{mergeSessions.map(([location, sessions]) => (
						<div key={location}>
							<h3>{location}</h3>
							<ul>
								{sessions.map((session: any, index: number) => (
									<li key={index}>
										{session.session_name} - {session.date_start}
										{session.country_name}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</section>
		</>
	);
};
