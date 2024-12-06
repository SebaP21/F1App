import styles from "./animation-for-racing.module.css";

import reactLogo from "../../../Assets/Icons/logo.svg";
import developerImage from "../../../Assets/Pictures/Clipped_image_20241115_203837.png";

export const AnimationForRacing = () => {
	return (
		<section
			className={`${styles.animationForRacing} w-full min-h-[100svh] bg-dynamic fixed top-0 left-0 flex justify-end items-center overflow-hidden transition-all mx-auto`}
		>
			<div className='  min-h-[60svh] w-full flex flex-col justify-between items-center'>
				<div className='w-[50%] min-h-[40svh] animate-spin-smooth flex justify-center items-center'>
					<img
						src='https://tyre-assets.pirelli.com/staticfolder/Tyre/resources/img/white-parentesi.png'
						alt=''
					/>
				</div>
				<div className=' w-full min-h-[40svh] flex justify-end'>
					<div className='relative w-[80%] md:w-[60%] lg:w-[40%] min-h-[40svh] bg-gray-900  rounded-tl-3xl rounded-bl-3xl flex flex-col animate-fadeLeft delay-500 self-end'>
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
						<div className='max-w-[70%] self-end my-auto text-right py-6 mr-2'>
							<p className=' text-white text-md font-Formula1-Regular'>
								"Please wait!
							</p>
							<p className='text-white text-md font-Formula1-Regular'>
								The drivers are already running to line up on the podium."
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
