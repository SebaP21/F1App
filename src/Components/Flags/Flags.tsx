import { FC } from "react"

export type FlagsProps = {
	country:string | undefined
}

export const Flag :FC<FlagsProps> = ({country}) => {

	switch (country){
		case "USA":
			country="united-states"
			break;
		case "United States":
			country="united-states"
			break;
		case "UAE":
			country="united-arab-emirates"
			break;
		case "UK":
			country="united-kingdom"
			break;
		case "Saudi Arabia":
			country="saudi-arabia"
			break;
	}

	return(
		<img src={`https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Flags%2016x9/${country}-flag.png`} alt="" />
	)
}