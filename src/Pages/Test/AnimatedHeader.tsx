import { useEffect } from "react";
import { useTeamContext } from "../../Components/Context/TeamContext";

export const AnimatedHeader = () => {
	const { teamColor } = useTeamContext();

	useEffect(() => {
		if (teamColor) {
			document.documentElement.style.setProperty("--team-color", teamColor);
		}
	}, [teamColor]);

	return (
		<div className='absolute top-0 bg-dynamic w-full min-h-[100svh] flex justify-center items-center '>
			<div className='w-[50%] animate-spin-smooth flex justify-center items-center'>
				<img
					src='https://tyre-assets.pirelli.com/staticfolder/Tyre/resources/img/white-parentesi.png'
					alt=''
				/>
			</div>
		</div>
	);
};
//Ikona Pirelli white
// https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/F1_tire_Pirelli_PZero_White.svg/768px-F1_tire_Pirelli_PZero_White.svg.png
