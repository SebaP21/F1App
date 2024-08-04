import { FC, useEffect, useState } from "react";

type Constructor = {
	constructorId: string;
	name: string;
	nationality: string;
};

type DriverStanding = {
	position: string;
	positionText: string;
	points: string;
	wins: string;
	Driver: {
		driverId: string;
		permanentNumber: string;
		code: string;
		url: string;
		givenName: string;
		familyName: string;
		dateOfBirth: string;
		nationality: string;
	};
	Constructors: Constructor[];
};

type StandingsList = {
	season: string;
	round: string;
	DriverStandings: DriverStanding[];
};

type StandingsTable = {
	driverId: string;
	StandingsLists: StandingsList[];
};

type DriverIdProps = {
	driverId: string | undefined;
};

export const DriverHistoricalResults: FC<DriverIdProps> = ({ driverId }) => {
	const [driverDetails, setDriverDetails] = useState<StandingsTable>();

	useEffect(() => {
		let mounted = true;
		fetch(`/api/f1/drivers/${driverId}/driverStandings.json`)
			.then((response) => response.json())
			.then((driverDetails) => {
				if (!mounted) return;
				setDriverDetails(driverDetails.MRData.StandingsTable);
			});
	}, []);

	const driverInformation =
		driverDetails?.StandingsLists[0].DriverStandings[0].Driver;
	const allSeasons = driverDetails?.StandingsLists;

	return (
		<>
			<div className='all-seasons-table'>
				<div className='all-seasons-thead'>
					<h5>Season</h5>
					<h5>Constructor</h5>
					<h5>Points</h5>
					{/* <h5>Wins</h5> */}
					<h5>Position</h5>
				</div>
				{allSeasons?.map((result) =>
					result.DriverStandings.map((standing) => (
						<div
							key={`${result.season}-${standing.Driver.driverId}`}
							className='all-seasons-tbody'
						>
							<p>{result.season}</p>
							<p>
								{standing.Constructors.map((constructor) => constructor.name)}
							</p>
							{/* <p>{standing.wins}</p> */}
							<p>{standing.points}</p>
							<p>{standing.position}</p>
						</div>
					))
				)}
			</div>
		</>
	);
};
