import { FC } from "react";
// import { DriverAvatarProps } from "../DriverPictures/DriverAvatar";

// export type DriverPictureProps = Pick<DriverAvatarProps, "familyName">;

export type DriverPictureProps = {
	familyName: string | undefined;
};

export const DriverPicture: FC<DriverPictureProps> = ({ familyName }) => {
	return (
		<img
			src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/drivers/2024Drivers/${familyName}`}
			alt=''
		/>
	);
};
