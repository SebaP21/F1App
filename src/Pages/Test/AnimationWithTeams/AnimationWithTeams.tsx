import { useState, useEffect } from "react";
import { StandingsTable } from "../../../Components/Classification/Standings";
import { useAppContext } from "../../../Components/Context/AppContext";
import styles from "./animationWithTeams.module.css";
import { CarAvatar } from "../../../Components/Cars/CarAvatar";
import { TeamLogo } from "../../../Components/TeamLogos/TeamLogo";
import { AnimatedHeader } from "../AnimatedHeader";

export const ChooseYourTeam = () => {
	const { constructorStandings, isLoading, error } = useAppContext();
	const [constructorData, setConstructorData] = useState<
		StandingsTable | undefined
	>();

	useEffect(() => {
		if (constructorStandings?.MRData?.StandingsTable) {
			setConstructorData(constructorStandings?.MRData?.StandingsTable);
		}
	}, [constructorStandings.MRData.StandingsTable]);

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
		<div
			className={`${styles.animationWidthTeams} w-full min-h-[100svh] bg-white flex flex-col overflow-x-hidden`}
		>
			<div className='w-[100%]  flex flex-col justify-start items-center gap-8'>
				<div className='w-[100%] flex flex-col min-h-[60svh] py-16 gap-6 bg-red-700 justify-center'>
					<h1 className='text-md text-white text-center font-Formula1-Regular'>
						Welcome in
					</h1>
					<h1 className='text-4xl text-center text-white'>F1 App</h1>
					<div className='w-[90%] mx-auto text-center animate-fadeUp'>
						<p className=' text-white text-md font-Formula1-Regular'>
							Developed out of a passion for Formula 1 and a love for creating
							with React, this application was built as a hobby project. It is
							not intended for commercial use.
						</p>
					</div>
				</div>
				<div className='w-[90%] min-h-[40svh] flex flex-col gap-8 pb-12'>
					<p>
						{" "}
						Choose your favorite team and cheer in the colors of your favorite
						squad!
					</p>
					<fieldset className='border-t-2 border-r-2 w-full border-red-700 rounded-tr-lg flex flex-col gap-2 pr-4 shadow-lg'>
						<legend className='mx-4 px-2 font-semibold text-md  font-Formula1-Bold'>
							Teams
						</legend>

						{constructorResults?.map((result, index) => (
							<div
								key={index}
								className='w-full flex animate-fadeRight justify-between p-2 gap-4 text-center shadow-md cursor-pointer transition-all hover:scale-105 '
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

						{/* <CarAvatar Constructor={constructor?.name} /> */}
						{/* <h3>{constructor?.name}</h3> */}
						{/* <TeamLogo Constructor={constructor?.name} /> */}
					</fieldset>
				</div>
			</div>
			<div className='w-full min-h-[4svh] bg-red-700'></div>
		</div>
	);
};
