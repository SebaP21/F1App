import { FC } from "react";
import { Races } from "../Classification/Drivers/CurrentRacesResult/CurrentRacesResult";

export type CircuitProps = Pick<Races["Circuit"]["Location"], "country">;

export const CircuitsAvatar: FC<CircuitProps> = ({ country }) => {

	switch (country){
		case "UK":
			country="Great Britain"
			break;
		case "UAE":
			country="Abu Dhabi"
			break
	}

	return (
		<img
			src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/${country}%20carbon.png`}
			alt=''
		/>
	);
};
