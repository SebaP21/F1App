import  { FC, PropsWithChildren } from "react";
import { DriverAvatarProps } from "../DriverPictures/DriverAvatar";

export const DriverAvatarBackground: FC<
	PropsWithChildren<DriverAvatarProps>
> = ({ givenName, familyName, children }) => {
	return (
		<div
			className='min-w-[100px] w-full h-full  min-h-[100px] bg-cover flex justify-end items-end'
			style={{
				backgroundImage: `url(https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${givenName.substring(
					0,
					1
				)}/${givenName.substring(0, 3)}${familyName.substring(
					0,
					3
				)}01_${givenName}_${familyName}/${givenName.substring(
					0,
					3
				)}${familyName.substring(0, 3)}01.png)`,
			}}
		>
			{children}
		</div>
	);
};
