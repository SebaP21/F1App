import { Link } from "react-router-dom";

export const Nav = () => {
	return (
		<div className='w-full flex justify-evenly items-center fixed bottom-0 bg-white min-h-[10svh] z-50 border-t-[1px] border-black shadow-xl'>
			<Link to='/'>
				<div className='transition-all flex flex-col items-center gap-1 hover:scale-105 '>
					<img
						src='https://cdn-icons-png.flaticon.com/512/1275/1275364.png'
						alt=''
						className="w-[30px]"
					/>
					<p className="font-Formula1-Regular text-sm ">Drivers</p>
				</div>
			</Link>
			<Link to='/racing'>
				<div className='transition-all flex flex-col items-center gap-1 hover:scale-105'>
					<img
						src='https://www.transparentpng.com/thumb/racing-flag/f1-flag-race-racing-icon-png-10.png'
						alt=''
						className="w-[30px]"
					/>
					<p className="font-Formula1-Regular text-sm ">Racing</p>
				</div>
			</Link>
			<Link to='/standings'>
				<div className='transition-all flex flex-col items-center gap-1 hover:scale-105'>
					<img
						src='https://clipart-library.com/image_gallery/46370.jpg'
						alt=''
						className="w-[30px]"
					/>
					<p className="font-Formula1-Regular text-sm">Standings</p>
				</div>
			</Link>
		</div>
	);
};
