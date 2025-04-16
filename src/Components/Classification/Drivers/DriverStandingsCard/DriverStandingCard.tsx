import { FC, useContext } from "react";
import { DriverStanding } from "../../Standings";
import { DriverAvatarBackground } from "../../../DriverPictures/DriverAvatarBackground";

import { DriverCurrentResultsContext } from "../../../Context/DriverCurrentResultContext";
import { Flag } from "../../../Flags/Flags";
// import { DriverAvatar } from "../../../DriverPictures/DriverAvatar";

type DriverStandingCardProps = {
	result: DriverStanding;
	index: number;
	expanded: boolean;
	expand: () => void;
};

export const DriverStandingCard: FC<DriverStandingCardProps> = ({
	result,
	index,
	expanded,
	expand,
}) => {
	const { driverResultsContext } = useContext(DriverCurrentResultsContext);

	return (
		<div className='w-full flex flex-col '>
			<div
				key={index}
				onClick={expand}
				className={`transition-all ${
					expanded ? "w-[90%]" : "w-[88%]"
				}  min-h-[17svh] sm:min-h-[20vh] md:min-h-[20svh] lg:min-h-[25svh] xl:min-h-[30svh] 2xl:min-h-[35svh] flex rounded-r-xl bg-gray-200 hover:scale-105 cursor-pointer  lg:mb-4`}
			>
				<div className='w-full flex items-center justify-between  gap-4'>
					<div className='flex min-w-[15%] h-[7svh] items-center justify-center border-r-2 border-gray-500 lg:text-3xl md:text-3xl'>
						<h2>{result.position}</h2>
					</div>
					<div className='flex flex-col lg:text-3xl md:text-3xl'>
						<h5>{result.Driver.givenName}</h5>
						<h3>{result.Driver.familyName}</h3>
					</div>
					<div className='min-w-[40%] h-[100%] flex'>
						<DriverAvatarBackground
							givenName={result.Driver.givenName}
							familyName={result.Driver.familyName}
						>
							<div className='bg-gray-300 bg-opacity-90 py-1 px-2 rounded-xl -mr-6 lg:min-w-[30%] lg:min-h-[30%]
							flex flex-col justify-center items-center lg:-mr-16 lg:text-2xl'>
								<h4>{result.points}</h4>
								<p>PTS</p>
							</div>
						</DriverAvatarBackground>
					</div>
				</div>
			</div>
			{expanded && (
				<div className='pt-2'>
					<table className='w-[97%] text-center mx-auto '>
						<tbody>
							{driverResultsContext?.Races.map((data, index) => (
								<tr
									className='even:bg-gray-200 even:rounded-md'
									key={index}
								>
									<td>
										<div className='w-[40px] py-1 px-1 my-4'>
											<Flag country={data.Circuit.Location.country} />
										</div>
									</td>
									<td className='font-Formula1-Bold text-sm'>
										{data.raceName}
									</td>
									<td>
										<div className='text-sm'>
											<p>{data.Results[0].points}</p>
											<h6>PTS</h6>
										</div>
									</td>
									<td>
										<div className='text-sm px-2'>
											<p>{data.Results[0].position}</p>
											<h6>POS</h6>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};
