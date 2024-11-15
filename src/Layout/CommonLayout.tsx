import { useAppContext } from "../Components/Context/AppContext";
import { AnimatedHeader } from "../Pages/Test/AnimatedHeader";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../Components/AppHeader/AppHeader";
import { Nav } from "../Components/Nav/Nav";

export const CommonLayout = () => {
	const { isLoading } = useAppContext();

	return (
		<>
			{isLoading ? (
				<AnimatedHeader />
			) : (
				<>
					<Nav />
					<AppHeader />
					<Outlet />
				</>
			)}
		</>
	);
};
