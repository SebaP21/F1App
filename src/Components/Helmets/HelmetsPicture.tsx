import { FC } from "react";
import { DriverPictureProps } from "../DriverPictures/DriverPicture"; 

export const Helmets: FC<DriverPictureProps> = ({ familyName }) => {
	return (
		<img
			src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1024/content/dam/fom-website/manual/Helmets2024/${familyName}`}
			alt=''
		/>
	);
};
