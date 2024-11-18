import { useState } from "react";
import { useAppContext } from "../Components/Context/AppContext";
import { AnimatedHeader } from "../Pages/Test/AnimatedHeader";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../Components/AppHeader/AppHeader";
import { Nav } from "../Components/Nav/Nav";
import { ChooseYourTeam } from "../Pages/Test/AnimationWithTeams/AnimationWithTeams";

export const CommonLayout = () => {
	const { isLoading } = useAppContext();
	const [showTeamSelection, setShowTeamSelection] = useState(true);

	const handleTeamSelection = () => {
		setShowTeamSelection(false);
	};

	return (
		<>
			{isLoading ? (
				<AnimatedHeader />
			) : (
				<>
					{showTeamSelection ? (
						<ChooseYourTeam onTeamSelect={handleTeamSelection} />
					) : (
						<>
							<div className="flex flex-col sm:hidden">
								<Nav />
								<AppHeader />
								<Outlet />
							</div>
              <div className="hidden w-full min-h-[100vh] bg-dynamic sm:flex justify-center items-center">
                      <h3>This app is only for mobile now ! </h3>
              </div>
						</>
					)}
				</>
			)}
		</>
	);
};
