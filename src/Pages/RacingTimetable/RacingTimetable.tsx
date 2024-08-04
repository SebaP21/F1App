import { useState } from "react";
import { CurrentSchedule } from "../../Components/Schedule/CurrentSeasonSchedule";
import "../RacingTimetable/_racingtimetable.css";
import { CurrentRacesResult } from "../../Components/Classification/Drivers/CurrentRacesResult/CurrentRacesResult";

const RacingPageHeader = () => {
	return (
		<section className='racing-header'>
			<h2>Racing</h2>
		</section>
	);
};

export const Racing = () => {
	const [selectCathegory, setSelectCathegory] = useState("upcoming");

	return (
		<>
			<RacingPageHeader />
			<section>
				<div className='racing-buttons-box'>
					<button onClick={() => setSelectCathegory("upcoming")}>
						Upcoming
					</button>
					<button onClick={() => setSelectCathegory("past")}>Past</button>
				</div>
				{selectCathegory === "upcoming" ? (
					<CurrentSchedule />
				) : (
					<CurrentRacesResult />
				)}
			</section>
		</>
	);
};

{
	/* <CurrentSchedule /> */
}
