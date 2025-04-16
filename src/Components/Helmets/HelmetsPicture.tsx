import { FC } from "react";
import { DriverPictureProps } from "../DriverPictures/DriverPicture"; 

export const Helmets: FC<DriverPictureProps> = ({ familyName }) => {
	return (
		<img
			src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1024/fom-website/manual/Helmets2025/${familyName}`}
			alt=''
		/>
	);
};
