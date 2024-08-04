import { FC } from "react";
import { Results } from "../Classification/Drivers/CurrentRacesResult/CurrentRacesResult";

export type ConstructorProps = {
	Constructor: string | undefined;
};

export const CarAvatar: FC<ConstructorProps> = ({ Constructor }) => {
	switch (Constructor) {
		case "Red Bull":
			Constructor = "red-bull-racing";
			break;
		case "Aston Martin":
			Constructor = "aston-martin";
			break;
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
			Constructor = "kick-sauber";
			break;
	}

	return (
		<img
			src={`https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/${Constructor}.png`}
			alt=''
		/>
	);
};
