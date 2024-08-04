


import { Outlet } from "react-router-dom";
import { AppHeader } from "../Components/AppHeader/AppHeader";
import { Nav } from "../Components/Nav/Nav";

export const CommonLayout = () => {

	return (
        <>
        <Nav />
        <AppHeader />
        <Outlet />
        </>
		
	);
};
