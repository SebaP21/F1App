import { useState, useEffect } from "react";
import { StandingsTable } from "../../../Components/Classification/Standings";
import { useAppContext } from "../../../Components/Context/AppContext";
import styles from "./animationWithTeams.module.css";
import { CarAvatar } from "../../../Components/Cars/CarAvatar";
import { TeamLogo } from "../../../Components/TeamLogos/TeamLogo";
import { AnimatedHeader } from "../AnimatedHeader";

import { HeaderWidthRadio } from "./HeaderWidthRadio/HeaderWithRadio";
import {
	TeamColors,
	useTeamContext,
} from "../../../Components/Context/TeamContext";

interface ChooseYourTeamProps {
	onTeamSelect: () => void;
}

export const ChooseYourTeam: React.FC<ChooseYourTeamProps> = ({
	onTeamSelect,
}) => {
	const { constructorStandings, isLoading, error } = useAppContext();
	const [constructorData, setConstructorData] = useState<
		StandingsTable | undefined
	>();
	const [isExiting, setIsExiting] = useState(false);

	useEffect(() => {
		if (constructorStandings?.MRData?.StandingsTable) {
			setConstructorData(constructorStandings?.MRData?.StandingsTable);
		}
	}, [constructorStandings.MRData.StandingsTable]);

	const { selectTeam } = useTeamContext();

	const handleTeamClick = (teamId: string) => {
		const color = teamColors[teamId] || "#e80020";
		selectTeam(teamId, color);

		setIsExiting(true);
		setTimeout(() => {
			onTeamSelect();
		}, 500);
	};

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
				<AnimatedHeader />
			</div>
		);
	}

	const constructorResults =
		constructorData?.StandingsLists[0].ConstructorStandings;

	return (
		<>
			{isExiting ? (
				<AnimatedHeader />
			) : (
				<div
					className={`${styles.animationWidthTeams} w-full min-h-[100svh] bg-white flex flex-col overflow-x-hidden`}
				>
					<HeaderWidthRadio />

					<div
						className='w-[90%] min-h-[95svh] flex flex-col gap-8 pb-12  py-12 justify-center mx-auto'
						id='chooseyourteam'
					>
						<p>
							{" "}
							Choose your favorite team and cheer in the colors of your favorite
							squad!
						</p>
						<fieldset className='border-t-2 border-r-2 w-full border-[#e80020] rounded-tr-lg flex flex-col gap-6 pr-4 pt-2 shadow-lg'>
							<legend className='mx-4 px-2 font-semibold text-md  font-Formula1-Bold'>
								Teams
							</legend>

							{constructorResults?.map((result, index) => (
								<div
									key={index}
									className='w-full flex animate-fadeRight justify-between p-2 gap-4 text-center shadow-md cursor-pointer transition-all hover:scale-105 '
									onClick={() =>
										handleTeamClick(result.Constructor?.constructorId || "")
									}
								>
									<div className='max-w-[120px]'>
										<CarAvatar Constructor={result.Constructor?.name} />
									</div>
									<h3>{result.Constructor?.name}</h3>
									<div className='max-w-[70px]'>
										<TeamLogo Constructor={result.Constructor?.name} />
									</div>
								</div>
							))}
						</fieldset>
					</div>
					<div className='w-full min-h-[5svh] bg-dynamic'></div>
				</div>
			)}
		</>
	);
};

// {result.Constructor?.constructorId}
const teamColors: TeamColors = {
	red_bull: "#3671c6",
	mclaren: "#ff8000",
	ferrari: "#e80020",
	mercedes: "#27f4d2",
	aston_martin: "#229971",
	haas: "#b6babd",
	rb: "#6692ff",
	alpine: "#0093cc",
	williams: "#64c4ff",
	sauber: "#90dc92",
};
