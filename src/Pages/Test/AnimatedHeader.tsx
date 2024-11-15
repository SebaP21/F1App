export const AnimatedHeader = () => {
	return (
		<div className='absolute top-0 bg-red-700 w-full min-h-[100svh] flex justify-center items-center '>
			<div className='w-[50%] animate-spin-smooth'>
				<img
					src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/F1_tire_Pirelli_PZero_Red.svg/2048px-F1_tire_Pirelli_PZero_Red.svg.png'
					alt=''
				/>
			</div>
		</div>
	);
};
