import { useEffect, useState } from "react";

type RaceTable = {
	season: string;
	round: string;
	Races: Races[];
};
type Races = {
	season: string;
	round: string;
	raceName: string;
	Circuit: {
		ciurcuitId: string;
		circuitName: string;
		Location: {
			locality: string;
			country: string;
		};
	};
	date: string;
	time: string;
	QualifyingResults: QualifyingResults[];
};
type QualifyingResults = {
	number: string;
	position: string;
	Driver: {
		driverId: string;
		permanentNumber: string;
		code: string;
		givenName: string;
		familyName: string;
		dateOfBirth: string;
		nationality: string;
	};
	Constructor: {
		constructorId: string;
		name: string;
		nationality: string;
	};
	Q1: string;
	Q2?: string;
	Q3?: string;
};

export const QualifyingResults = () => {
	const [qualifying, setQualifying] = useState<RaceTable>();

	useEffect(() => {
		let mounted = true;
		fetch(`https://ergast.com/api/f1/current/1/qualifying.json`)
			.then((response) => response.json())
			.then((results) => {
				if (!mounted) return;
				setQualifying(results.MRData.RaceTable);
			});
		return () => {
			mounted = false;
		};
	}, []);
	// console.log(qualifying?.Races[0].QualifyingResults);

	const qresults = qualifying?.Races[0].QualifyingResults;

	return (
		<div className='app-wrapper'>
			{qresults &&
				qresults.map((result) => (
					<div key={result.Q1+result.Q2}>
						<p>{result.position}</p>
						<p>{result.Driver.givenName} {result.Driver.familyName}</p>
						{result.Q1 && (
							<div>
								<p>Q1</p>
								<p>{result.Q1}</p>
							</div>
						)}
						{result.Q2 && (
							<div>
								<p>Q2</p>
								<p>{result.Q2}</p>
							</div>
						)}
						{result.Q3 && (
							<div>
								<p>Q3</p>
								<p>{result.Q3}</p>
							</div>
						)}
					</div>
				))}
		</div>
	);
};
