import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CommonLayout } from "./Layout/CommonLayout";
import { Racing } from "./Pages/RacingTimetable/RacingTimetable";
import { StandingsPage } from "./Pages/Standings/StandingsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatedHeader } from "./Pages/Test/AnimatedHeader";
import { AppProvider } from "./Components/Context/AppContext";
import { ChooseYourTeam } from "./Pages/Test/AnimationWithTeams/AnimationWithTeams";
import { TeamProvider } from "./Components/Context/TeamContext";
import { AnimationForRacing } from "./Pages/Test/AnimationForRacing/AnimationForRacing";

const router = createBrowserRouter([
	{
		path: "/",
		element: <CommonLayout />,
		children: [
			{ path: "/", index: true, element: <App /> },
			{
				path: "/racing",
				element: <Racing />,
			},
			{
				path: "/standings",
				element: <StandingsPage />,
			},
			{
				path: "/test",
				element: <AnimationForRacing />,
			},
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<TeamProvider>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<RouterProvider router={router} />
				</AppProvider>
			</QueryClientProvider>
		</TeamProvider>
	</React.StrictMode>
);

reportWebVitals();
