import { variants } from "@catppuccin/palette";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Maininvitation } from "./components/invitationmain.jsx";

const { BASE_URL } = import.meta.env;

export function App() {
	const [themeIndex, setThemeIndex] = useState(3);
	const themes = ["ctp-macchiato", "ctp-latte", "ctp-frappe", "ctp-mocha"];

	const toggleNav = () => {
		setThemeIndex((themeIndex + 1) % themes.length);
	};

	const theme = themes[themeIndex];
	const themeName = theme.slice(4);
	const base = variants[themeName].base.hex;
	const blue = variants[themeName].blue.hex;
	const iconColor = variants[themeName].mantle.hex;

	document.documentElement.style.setProperty("--primary", base);
	document.documentElement.style.setProperty("--secondary", blue);

	// Cleanup function to remove event listeners and prevent memory leaks
	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = "";
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<BrowserRouter>
			<div
				key={theme}
				className={`App min-h-screen grid ${theme} transition-all duration-500 ease-in-out`}
				// Main container for the app with dynamic theme and transition effects
			>
				<main className="flex flex-col justify-center items-center bg-gradient-to-b from-ctp-base to-ctp-crust p-6 transition-all duration-500 ease-in-out">
					{/* Main content area with gradient background and transition effects */}
					<Routes>
						<Route
							path={`${BASE_URL}`}
							element={<Maininvitation />}
						>
							<Route path=":code" element={<Maininvitation />} />
							{/* Route for handling invitation with code parameter */}
						</Route>
						<Route path="/" element={<Maininvitation />} />
						{/* Default route for the main invitation component */}
					</Routes>
				</main>
				<div className="fixed bottom-4 right-4">
					{/* <button
						onClick={toggleNav}
						className="theme-toggler bg-ctp-teal hover:bg-ctp-teal/60 focus:outline-none focus:ring-2 focus:ring-ctp-green/50 focus:ring-opacity-50 rounded-full px-4 py-2 text-ctp-mantle font-semibold transition-all duration-500 ease-in-out ml-2"
					>
						<div className="flex items-center">Issues</div>
					</button>
					I can't get the buttons to stay consistent and now im angy >:( */}
					<button
						onClick={() =>
							window.open(
								"https://github.com/coldenate/dishandle",
								"_blank"
							)
						}
						className="theme-toggler bg-ctp-teal hover:bg-ctp-teal/60 focus:outline-none focus:ring-2 focus:ring-ctp-green/50 focus:ring-opacity-50 rounded-full px-4 py-2 text-ctp-mantle font-semibold transition-all duration-500 ease-in-out ml-2"
					>
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className=""
								width="32"
								height="32"
								fill={iconColor}
								viewBox="0 0 496 512"
							>
								<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
							</svg>
						</div>
					</button>
					<button
						onClick={toggleNav}
						className="theme-toggler bg-ctp-teal hover:bg-ctp-teal/60 focus:outline-none focus:ring-2 focus:ring-ctp-green/50 focus:ring-opacity-50 rounded-full px-4 py-2 text-ctp-mantle font-semibold transition-all duration-500 ease-in-out ml-2"
					>
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="32"
								width="32"
								fill={iconColor}
								viewBox="0 0 512 512"
							>
								<path d="M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" />
							</svg>
						</div>
					</button>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
