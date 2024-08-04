import { Link } from "react-router-dom";

export const Nav = () => {
	return (
		<div className='nav'>
			<Link to='/'>
				<div className='nav-item'>
					<img
						src='https://cdn-icons-png.flaticon.com/512/1275/1275364.png'
						alt=''
					/>
					<p>Drivers</p>
				</div>
			</Link>
			<Link to='/racing'>
				<div className='nav-item'>
					<img
						src='https://www.transparentpng.com/thumb/racing-flag/f1-flag-race-racing-icon-png-10.png'
						alt=''
					/>
					<p>Racing</p>
				</div>
			</Link>
			<Link to='/standings'>
				<div className='nav-item'>
					<img
						src='https://clipart-library.com/image_gallery/46370.jpg'
						alt=''
					/>
					<p>Standings</p>
				</div>
			</Link>
		</div>
	);
};
