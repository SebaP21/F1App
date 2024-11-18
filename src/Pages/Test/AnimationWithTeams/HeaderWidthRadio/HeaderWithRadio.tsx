import styles from "../animationWithTeams.module.css";

import f1gif from "../../../../Assets/gif/giphy.webp";
import developerImage from "../../../../Assets/Pictures/Clipped_image_20241115_203837.png";
import reactLogo from "../../../../Assets/Icons/logo.svg";

export const HeaderWidthRadio = ({
	scrollToTeamSection,
}: {
	scrollToTeamSection: () => void;
}) => {
	return (
		<div className='w-full flex flex-col min-h-[95svh]'>
			<div className='w-[100%] flex flex-col min-h-[20svh]   py-10 gap-8 bg-[#e80020] justify-center'>
				<h1 className='text-md text-white text-center font-Formula1-Regular '>
					Welcome in
				</h1>
				<h1 className='text-4xl text-center text-white'>F1 App</h1>
			</div>
			<div
				className='w-full min-h-[70svh]   bg-no-repeat bg-cover flex justify-end items-center py-8'
				style={{
					backgroundImage: f1gif ? `url(${f1gif})` : "none",
				}}
			>
				<div className='relative w-[80%]  bg-gray-900 opacity-85 rounded-tl-3xl rounded-bl-3xl flex flex-col animate-fadeLeft delay-500'>
					<div
						className={`${styles.radioItems} w-full flex items-center justify-center  h-[4svh] bg-black rounded-tl-3xl gap-4`}
					>
						<h5 className='text-white'>Team Radio</h5>{" "}
						<div className='text-dynamic border-4 border-dynamic  rounded-full flex justify-center items-center animate-pulseFast text-xl w-[15px] h-[15px]'></div>
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
							" Developed out of a passion for Formula 1 and a love for creating
							with React.
						</p>
						<p className='text-white text-md font-Formula1-Regular'>
							This application was built as a hobby project.
						</p>
						<p className='text-white text-md font-Formula1-Regular'>
							It is not intended for commercial use."
						</p>
					</div>
					<div className='pl-4 pb-4'>
						<button
							className={` text-md font-Formula1-Regular ${styles.reactColor} animate-pulseFast`}
							onClick={scrollToTeamSection}
						>
							COPY?
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
