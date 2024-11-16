import { useState } from "react";
import { CurrentSchedule } from "../../Components/Schedule/CurrentSeasonSchedule";
import "../RacingTimetable/_racingtimetable.css";
import { CurrentRacesResult } from "../../Components/Classification/Drivers/CurrentRacesResult/CurrentRacesResult";

const RacingPageHeader = () => {
	return (
		<section className='relative z-10 w-full min-h-[8svh] flex justify-center items-center bg-dynamic text-white'>
			<h2 className='max-w-[90%] text-center'>Racing</h2>
		</section>
	);
};

export const Racing = () => {
	const [selectCathegory, setSelectCathegory] = useState("upcoming");

	const upcoming =
		selectCathegory === "upcoming"
			? "transition-all text-black hover:text-white"
			: "text-white hover:text-black";

	const past =
		selectCathegory === "past"
			? "transition-all text-black hover:text-white"
			: "text-white hover:text-black";

	return (
		<>
			<RacingPageHeader />
			<section>
				<div className='min-h-[7svh] w-full bg-dynamic flex items-center justify-evenly text-white font-Formula1-Bold border-t-2'>
					<button
						onClick={() => setSelectCathegory("upcoming")}
						className={upcoming}
					>
						Upcoming
					</button>
					<button
						onClick={() => setSelectCathegory("past")}
						className={past}
					>
						Past
					</button>
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
