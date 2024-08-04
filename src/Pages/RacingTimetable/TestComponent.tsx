import { useContext } from "react";
import { DriverCurrentResultsContext } from "../../Components/Context/DriverCurrentResultContext";

export const TestComponent = () => {
	const { setSelectDriver } = useContext(DriverCurrentResultsContext);
	const { driverResultsContext } = useContext(DriverCurrentResultsContext);

	return (
		<>
			{/* {driverResultsContext ? (
				<div className='test'>
					{driverResultsContext?.Races.map((item) => (
						<p key={item.raceName}></p>
					))}
				</div>
			) : (
				"pizda"
			)}
			<div className='test'>{driverResultsContext?.driverId}</div>
			<div className='test'>dsadsa</div>
			<div className='test'>dsadsa</div>
			<div className='test'>dsadsa</div>
			<button onClick={() => setSelectDriver("sainz")}>Sainz</button>
			<button onClick={() => setSelectDriver("leclerc")}>Leclerc</button> */}
		</>
	);
};
