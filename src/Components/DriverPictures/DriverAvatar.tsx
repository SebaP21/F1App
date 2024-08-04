import { FC } from "react";

export type DriverAvatarProps = {
	givenName: string;
	familyName: string;
	children?: any;
};

export const DriverAvatar: FC<DriverAvatarProps> = ({
	givenName,
	familyName,
}) => {
	return (
		<img
			src={`https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${givenName.substring(
				0,
				1
			)}/${givenName.substring(-3, 3)}${familyName.substring(
				-3,
				3
			)}01_${givenName}_${familyName}/${givenName.substring(
				-3,
				3
			)}${familyName.substring(-3, 3)}01.png`}
			alt=''
		/>
	);
};
