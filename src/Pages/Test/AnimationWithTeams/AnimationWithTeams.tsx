import { useState, useEffect } from "react";
import { StandingsTable } from "../../../Components/Classification/Standings";
import { useAppContext } from "../../../Components/Context/AppContext";
import styles from "./animationWithTeams.module.css";
import { CarAvatar } from "../../../Components/Cars/CarAvatar";
import { TeamLogo } from "../../../Components/TeamLogos/TeamLogo";
import { AnimatedHeader } from "../AnimatedHeader";

import f1gif from "../../../Assets/gif/giphy.webp";
import developerImage from "../../../Assets/Pictures/Clipped_image_20241115_203837.png";
import reactLogo from "../../../Assets/Icons/logo.svg";
import { Link } from "react-router-dom";

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
			<div className='w-full flex flex-col min-h-[90svh]'>
				<div className='w-[100%] flex flex-col min-h-[25svh]   py-12 gap-20 bg-red-700 justify-center'>
					<h1 className='text-md text-white text-center font-Formula1-Regular'>
						Welcome in
					</h1>
					<h1 className='text-4xl text-center text-white'>F1 App</h1>
				</div>
				<div
					className='w-full min-h-[70svh]  bg-no-repeat bg-cover flex justify-end items-center'
					style={{
						backgroundImage: f1gif ? `url(${f1gif})` : "none",
					}}
				>
					<div className='relative w-[80%] min-h-[50svh] bg-gray-900 opacity-85 rounded-tl-3xl rounded-bl-3xl flex flex-col animate-fadeLeft delay-500'>
						<div
							className={`${styles.radioItems} w-full flex items-center justify-center  h-[4svh] bg-black rounded-tl-3xl`}
						>
							<h5 className='text-white'>Team Radio</h5>
						</div>
						<div
							className={`w-full flex justify-between items-center py-4  border-b-2 `}
						>
							<div className='p-2 flex flex-col'>
								<h2 className={`text-white text-md text-center`}>Sebastian</h2>
								<div className=' flex justify-between items-center'>
									<div className='w-[70px]'>
										<img
											src={reactLogo}
											alt=''
										/>
									</div>
									<div>
										<h6 className='text-white font-Formula1-Bold'>
											Creator & Developer
										</h6>
									</div>
								</div>
							</div>
							<div className='w-[100px]'>
								<img
									src={developerImage}
									alt=''
								/>
							</div>
						</div>
						<div className='max-w-[70%] self-end text-right py-6 mr-2'>
							<p className=' text-white text-md font-Formula1-Regular'>
								Developed out of a passion for Formula 1 and a love for creating
								with React.
							</p>
							<p className='text-white text-md font-Formula1-Regular'>
								This application was built as a hobby project.
							</p>
							<p className='text-white text-md font-Formula1-Regular'>
								It is not intended for commercial use.
							</p>
						</div>
						<div className='p-4'>
							<a
								className={` text-md font-Formula1-Regular ${styles.reactColor} animate-pulseFast`}
								href='#chooseyourteam'
							>
								COPY?
							</a>
						</div>
					</div>
				</div>
			</div>

			<div
				className='w-[90%] min-h-[95svh] flex flex-col gap-8 pb-12  py-12 justify-center mx-auto'
				id='chooseyourteam'
			>
				<p>
					{" "}
					Choose your favorite team and cheer in the colors of your favorite
					squad!
				</p>
				<fieldset className='border-t-2 border-r-2 w-full border-red-700 rounded-tr-lg flex flex-col gap-6 pr-4 pt-2 shadow-lg'>
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
				</fieldset>
			</div>
			<div className='w-full min-h-[5svh] bg-red-700'></div>
		</div>
	);
};

{
	/* <div className='w-[90%] mx-auto text-center animate-fadeUp flex flex-col gap-2'>
						<p className=' text-white text-md font-Formula1-Regular'>
							Developed out of a passion for Formula 1 and a love for creating
							with React.  
						</p>
                        <p className="text-white text-md font-Formula1-Regular">This application was built as a hobby project.</p>
                        <p className="text-white text-md font-Formula1-Regular">It is
                        not intended for commercial use.</p>
					</div> */
}
