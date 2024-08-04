import { FC } from "react";
import { ConstructorProps } from "../Cars/CarAvatar";

export const TeamLogo: FC<ConstructorProps> = ({ Constructor }) => {
	switch (Constructor) {
		case "RB F1 Team":
			Constructor = "rb";
			break;
		case "Haas F1 Team":
			Constructor = "haas";
			break;
		case "Alpine F1 Team":
			Constructor = "alpine";
			break;
		case "Sauber":
			Constructor = "kick sauber";
			break;
	}

	return (
		<img
			src={`https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1320/content/dam/fom-website/2018-redesign-assets/team%20logos/${Constructor}`}
			alt=''
		/>
	);
};
