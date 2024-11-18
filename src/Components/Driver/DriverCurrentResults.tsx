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
					className='w-full even:bg-gray-200 even:rounded-md p-2'
				>
					<div className='w-[95%] flex justify-between items-center'>
						<h5 className="text-sm">{result.raceName}</h5>
						<div className='min-w-[25%] flex justify-between'>
							<div className="text-sm text-center">
								<h6 >PTS</h6>
								<p>{result.Results[0].points}</p>
							</div>
							<div className="text-sm text-center">
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
