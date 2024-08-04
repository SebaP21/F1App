import { FC } from "react";
import { CircuitProps } from "./CircuitsAvatar";

export const CircuitPicture: FC<CircuitProps> = ({ country }) => {

		switch (country){
			case "UK":
				country="Great Britain"
				break;
		}


	return (
		<img
			src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_auto,w_1320/content/dam/fom-website/2018-redesign-assets/Circuit%20maps%2016x9/${country}_Circuit`}
			alt=''
		/>
	);
};
