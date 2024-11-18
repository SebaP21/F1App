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
		fetch(`https://ergast.com/api/f1/drivers/${driverId}/driverStandings.json`)
			.then((response) => response.json())
			.then((driverDetails) => {
				if (!mounted) return;
				setDriverDetails(driverDetails.MRData.StandingsTable);
			});
	}, []);

	
	const allSeasons = driverDetails?.StandingsLists;

	return (
		<>
			<div className='w-full flex flex-col gap-2 text-md  '>
				<div className='w-[95%] flex justify-between pt-2 pb-4'>
					<h5>Season</h5>
					<h5>Constructor</h5>
					<h5>PTS</h5>
					<h5>POS</h5>
				</div>
				{allSeasons?.map((result) =>
					result.DriverStandings.map((standing) => (
						<div
							key={`${result.season}-${standing.Driver.driverId}`}
							className='w-[97%] flex justify-between even:bg-gray-200 even:rounded-md px-2 py-4'
						>
							<p className="">{result.season}</p>
							<p>
								{standing.Constructors.map((constructor) => constructor.name)}
							</p>
							<p>{standing.points}</p>
							<p>{standing.position}</p>
						</div>
					))
				)}
			</div>
		</>
	);
};
