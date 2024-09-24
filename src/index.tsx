import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CommonLayout } from "./Layout/CommonLayout";
import { Racing } from "./Pages/RacingTimetable/RacingTimetable";
import { StandingsPage } from "./Pages/Standings/StandingsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Drivers } from "./Pages/Drivers/Drivers";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

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
		],
	},
]);

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient()

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />

		</QueryClientProvider>
	</React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
