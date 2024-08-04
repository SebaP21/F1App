import { CarAvatar } from "../Components/Cars/CarAvatar";
import { DriverAvatar } from "../Components/DriverPictures/DriverAvatar";
import { DriverPicture } from "../Components/DriverPictures/DriverPicture"; 
import { Helmets } from "../Components/Helmets/HelmetsPicture";
import { TeamLogo } from "../Components/TeamLogos/TeamLogo";

export const DriverStandingsSupport = () => {
	const support = DriverStandingsSupportData.MRData.StandingsTable;
	const driverResults = support.StandingsLists[0].DriverStandings;

	return (
		<section className='app-wrapper'>
			{!driverResults ? (
				<p>Ładowanie....</p>
			) : (
				<table className='standings'>
					<thead>
						<tr>
							<th>Pozycja</th>
							<th>Imię i nazwisko</th>
							<th>Kierowca</th>
							<th>Zdjęcie dziada</th>
							<th>Kask</th>

							<th>Ilość punktów</th>
							<th>Ilość wygranych</th>
						</tr>
					</thead>
					{driverResults?.map((result) => (
						<tbody key={result.Driver.driverId}>
							<tr>
								<td>{result.positionText}</td>
								<td>
									{result.Driver.givenName} {result.Driver.familyName}
								</td>
								<td>
									<DriverAvatar
										givenName={result.Driver.givenName}
										familyName={result.Driver.familyName}
									/>
								</td>
								<td>
									{" "}
									<DriverPicture familyName={result.Driver.familyName} />
								</td>
								<td>
									<Helmets familyName={result.Driver.familyName} />
								</td>

								<td>{result.points}</td>
								<td>{result.wins}</td>
							</tr>
						</tbody>
					))}
				</table>
			)}
		</section>
	);
};

export const DriverStandingsSupportData = {
	MRData: {
		xmlns: "http://ergast.com/mrd/1.5",
		series: "f1",
		url: "http://ergast.com/api/f1/current/driverstandings.json",
		limit: "30",
		offset: "0",
		total: "21",
		StandingsTable: {
			season: "2024",
			StandingsLists: [
				{
					season: "2024",
					round: "12",
					DriverStandings: [
						{
							position: "1",
							positionText: "1",
							points: "255",
							wins: "7",
							Driver: {
								driverId: "max_verstappen",
								permanentNumber: "33",
								code: "VER",
								url: "http://en.wikipedia.org/wiki/Max_Verstappen",
								givenName: "Max",
								familyName: "Verstappen",
								dateOfBirth: "1997-09-30",
								nationality: "Dutch",
							},
							Constructors: [
								{
									constructorId: "red_bull",
									url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
									name: "Red Bull",
									nationality: "Austrian",
								},
							],
						},
						{
							position: "2",
							positionText: "2",
							points: "171",
							wins: "1",
							Driver: {
								driverId: "norris",
								permanentNumber: "4",
								code: "NOR",
								url: "http://en.wikipedia.org/wiki/Lando_Norris",
								givenName: "Lando",
								familyName: "Norris",
								dateOfBirth: "1999-11-13",
								nationality: "British",
							},
							Constructors: [
								{
									constructorId: "mclaren",
									url: "http://en.wikipedia.org/wiki/McLaren",
									name: "McLaren",
									nationality: "British",
								},
							],
						},
						{
							position: "3",
							positionText: "3",
							points: "150",
							wins: "1",
							Driver: {
								driverId: "leclerc",
								permanentNumber: "16",
								code: "LEC",
								url: "http://en.wikipedia.org/wiki/Charles_Leclerc",
								givenName: "Charles",
								familyName: "Leclerc",
								dateOfBirth: "1997-10-16",
								nationality: "Monegasque",
							},
							Constructors: [
								{
									constructorId: "ferrari",
									url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
									name: "Ferrari",
									nationality: "Italian",
								},
							],
						},
						{
							position: "4",
							positionText: "4",
							points: "146",
							wins: "1",
							Driver: {
								driverId: "sainz",
								permanentNumber: "55",
								code: "SAI",
								url: "http://en.wikipedia.org/wiki/Carlos_Sainz_Jr.",
								givenName: "Carlos",
								familyName: "Sainz",
								dateOfBirth: "1994-09-01",
								nationality: "Spanish",
							},
							Constructors: [
								{
									constructorId: "ferrari",
									url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
									name: "Ferrari",
									nationality: "Italian",
								},
							],
						},
						{
							position: "5",
							positionText: "5",
							points: "124",
							wins: "0",
							Driver: {
								driverId: "piastri",
								permanentNumber: "81",
								code: "PIA",
								url: "http://en.wikipedia.org/wiki/Oscar_Piastri",
								givenName: "Oscar",
								familyName: "Piastri",
								dateOfBirth: "2001-04-06",
								nationality: "Australian",
							},
							Constructors: [
								{
									constructorId: "mclaren",
									url: "http://en.wikipedia.org/wiki/McLaren",
									name: "McLaren",
									nationality: "British",
								},
							],
						},
						{
							position: "6",
							positionText: "6",
							points: "118",
							wins: "0",
							Driver: {
								driverId: "perez",
								permanentNumber: "11",
								code: "PER",
								url: "http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez",
								givenName: "Sergio",
								familyName: "Pérez",
								dateOfBirth: "1990-01-26",
								nationality: "Mexican",
							},
							Constructors: [
								{
									constructorId: "red_bull",
									url: "http://en.wikipedia.org/wiki/Red_Bull_Racing",
									name: "Red Bull",
									nationality: "Austrian",
								},
							],
						},
						{
							position: "7",
							positionText: "7",
							points: "111",
							wins: "1",
							Driver: {
								driverId: "russell",
								permanentNumber: "63",
								code: "RUS",
								url: "http://en.wikipedia.org/wiki/George_Russell_(racing_driver)",
								givenName: "George",
								familyName: "Russell",
								dateOfBirth: "1998-02-15",
								nationality: "British",
							},
							Constructors: [
								{
									constructorId: "mercedes",
									url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
									name: "Mercedes",
									nationality: "German",
								},
							],
						},
						{
							position: "8",
							positionText: "8",
							points: "110",
							wins: "1",
							Driver: {
								driverId: "hamilton",
								permanentNumber: "44",
								code: "HAM",
								url: "http://en.wikipedia.org/wiki/Lewis_Hamilton",
								givenName: "Lewis",
								familyName: "Hamilton",
								dateOfBirth: "1985-01-07",
								nationality: "British",
							},
							Constructors: [
								{
									constructorId: "mercedes",
									url: "http://en.wikipedia.org/wiki/Mercedes-Benz_in_Formula_One",
									name: "Mercedes",
									nationality: "German",
								},
							],
						},
						{
							position: "9",
							positionText: "9",
							points: "45",
							wins: "0",
							Driver: {
								driverId: "alonso",
								permanentNumber: "14",
								code: "ALO",
								url: "http://en.wikipedia.org/wiki/Fernando_Alonso",
								givenName: "Fernando",
								familyName: "Alonso",
								dateOfBirth: "1981-07-29",
								nationality: "Spanish",
							},
							Constructors: [
								{
									constructorId: "aston_martin",
									url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
									name: "Aston Martin",
									nationality: "British",
								},
							],
						},
						{
							position: "10",
							positionText: "10",
							points: "23",
							wins: "0",
							Driver: {
								driverId: "stroll",
								permanentNumber: "18",
								code: "STR",
								url: "http://en.wikipedia.org/wiki/Lance_Stroll",
								givenName: "Lance",
								familyName: "Stroll",
								dateOfBirth: "1998-10-29",
								nationality: "Canadian",
							},
							Constructors: [
								{
									constructorId: "aston_martin",
									url: "http://en.wikipedia.org/wiki/Aston_Martin_in_Formula_One",
									name: "Aston Martin",
									nationality: "British",
								},
							],
						},
						{
							position: "11",
							positionText: "11",
							points: "22",
							wins: "0",
							Driver: {
								driverId: "hulkenberg",
								permanentNumber: "27",
								code: "HUL",
								url: "http://en.wikipedia.org/wiki/Nico_H%C3%BClkenberg",
								givenName: "Nico",
								familyName: "Hülkenberg",
								dateOfBirth: "1987-08-19",
								nationality: "German",
							},
							Constructors: [
								{
									constructorId: "haas",
									url: "http://en.wikipedia.org/wiki/Haas_F1_Team",
									name: "Haas F1 Team",
									nationality: "American",
								},
							],
						},
						{
							position: "12",
							positionText: "12",
							points: "20",
							wins: "0",
							Driver: {
								driverId: "tsunoda",
								permanentNumber: "22",
								code: "TSU",
								url: "http://en.wikipedia.org/wiki/Yuki_Tsunoda",
								givenName: "Yuki",
								familyName: "Tsunoda",
								dateOfBirth: "2000-05-11",
								nationality: "Japanese",
							},
							Constructors: [
								{
									constructorId: "rb",
									url: "http://en.wikipedia.org/wiki/RB_Formula_One_Team",
									name: "RB F1 Team",
									nationality: "Italian",
								},
							],
						},
						{
							position: "13",
							positionText: "13",
							points: "11",
							wins: "0",
							Driver: {
								driverId: "ricciardo",
								permanentNumber: "3",
								code: "RIC",
								url: "http://en.wikipedia.org/wiki/Daniel_Ricciardo",
								givenName: "Daniel",
								familyName: "Ricciardo",
								dateOfBirth: "1989-07-01",
								nationality: "Australian",
							},
							Constructors: [
								{
									constructorId: "rb",
									url: "http://en.wikipedia.org/wiki/RB_Formula_One_Team",
									name: "RB F1 Team",
									nationality: "Italian",
								},
							],
						},
						{
							position: "14",
							positionText: "14",
							points: "6",
							wins: "0",
							Driver: {
								driverId: "bearman",
								permanentNumber: "38",
								code: "BEA",
								url: "http://en.wikipedia.org/wiki/Oliver_Bearman",
								givenName: "Oliver",
								familyName: "Bearman",
								dateOfBirth: "2005-05-08",
								nationality: "British",
							},
							Constructors: [
								{
									constructorId: "ferrari",
									url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
									name: "Ferrari",
									nationality: "Italian",
								},
							],
						},
						{
							position: "15",
							positionText: "15",
							points: "6",
							wins: "0",
							Driver: {
								driverId: "gasly",
								permanentNumber: "10",
								code: "GAS",
								url: "http://en.wikipedia.org/wiki/Pierre_Gasly",
								givenName: "Pierre",
								familyName: "Gasly",
								dateOfBirth: "1996-02-07",
								nationality: "French",
							},
							Constructors: [
								{
									constructorId: "alpine",
									url: "http://en.wikipedia.org/wiki/Alpine_F1_Team",
									name: "Alpine F1 Team",
									nationality: "French",
								},
							],
						},
						{
							position: "16",
							positionText: "16",
							points: "5",
							wins: "0",
							Driver: {
								driverId: "kevin_magnussen",
								permanentNumber: "20",
								code: "MAG",
								url: "http://en.wikipedia.org/wiki/Kevin_Magnussen",
								givenName: "Kevin",
								familyName: "Magnussen",
								dateOfBirth: "1992-10-05",
								nationality: "Danish",
							},
							Constructors: [
								{
									constructorId: "haas",
									url: "http://en.wikipedia.org/wiki/Haas_F1_Team",
									name: "Haas F1 Team",
									nationality: "American",
								},
							],
						},
						{
							position: "17",
							positionText: "17",
							points: "4",
							wins: "0",
							Driver: {
								driverId: "albon",
								permanentNumber: "23",
								code: "ALB",
								url: "http://en.wikipedia.org/wiki/Alexander_Albon",
								givenName: "Alexander",
								familyName: "Albon",
								dateOfBirth: "1996-03-23",
								nationality: "Thai",
							},
							Constructors: [
								{
									constructorId: "williams",
									url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
									name: "Williams",
									nationality: "British",
								},
							],
						},
						{
							position: "18",
							positionText: "18",
							points: "3",
							wins: "0",
							Driver: {
								driverId: "ocon",
								permanentNumber: "31",
								code: "OCO",
								url: "http://en.wikipedia.org/wiki/Esteban_Ocon",
								givenName: "Esteban",
								familyName: "Ocon",
								dateOfBirth: "1996-09-17",
								nationality: "French",
							},
							Constructors: [
								{
									constructorId: "alpine",
									url: "http://en.wikipedia.org/wiki/Alpine_F1_Team",
									name: "Alpine F1 Team",
									nationality: "French",
								},
							],
						},
						{
							position: "19",
							positionText: "19",
							points: "0",
							wins: "0",
							Driver: {
								driverId: "zhou",
								permanentNumber: "24",
								code: "ZHO",
								url: "http://en.wikipedia.org/wiki/Zhou_Guanyu",
								givenName: "Guanyu",
								familyName: "Zhou",
								dateOfBirth: "1999-05-30",
								nationality: "Chinese",
							},
							Constructors: [
								{
									constructorId: "sauber",
									url: "http://en.wikipedia.org/wiki/Sauber_Motorsport",
									name: "Sauber",
									nationality: "Swiss",
								},
							],
						},
						{
							position: "20",
							positionText: "20",
							points: "0",
							wins: "0",
							Driver: {
								driverId: "sargeant",
								permanentNumber: "2",
								code: "SAR",
								url: "http://en.wikipedia.org/wiki/Logan_Sargeant",
								givenName: "Logan",
								familyName: "Sargeant",
								dateOfBirth: "2000-12-31",
								nationality: "American",
							},
							Constructors: [
								{
									constructorId: "williams",
									url: "http://en.wikipedia.org/wiki/Williams_Grand_Prix_Engineering",
									name: "Williams",
									nationality: "British",
								},
							],
						},
						{
							position: "21",
							positionText: "21",
							points: "0",
							wins: "0",
							Driver: {
								driverId: "bottas",
								permanentNumber: "77",
								code: "BOT",
								url: "http://en.wikipedia.org/wiki/Valtteri_Bottas",
								givenName: "Valtteri",
								familyName: "Bottas",
								dateOfBirth: "1989-08-28",
								nationality: "Finnish",
							},
							Constructors: [
								{
									constructorId: "sauber",
									url: "http://en.wikipedia.org/wiki/Sauber_Motorsport",
									name: "Sauber",
									nationality: "Swiss",
								},
							],
						},
					],
				},
			],
		},
	},
};
