import { FC } from "react";
import { Races } from "../DriverDetails/DriverDetails";

type DriverCurrentResultProps = {
	results: Races[] | undefined;
};

export const DriverCurrentResults: FC<DriverCurrentResultProps> = ({
	results,
}) => {
	return (
		<>
			{results?.map((result) => (
				<div
					key={result.Circuit.circuitId + result.Results[0].Driver.driverId +result.url}
					className='driver-details-race-card-box'
				>
					<div className='driver-details-race-card'>
						<h5>{result.raceName}</h5>
						<div className='driver-details-race-card-result'>
							<div>
								<h6>PTS</h6>
								<p>{result.Results[0].points}</p>
							</div>
							<div>
								<h6>POS</h6>
								<p>{result.Results[0].position}</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
