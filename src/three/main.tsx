import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AppProvider } from "./context/AppContext";

declare global {
	interface Window {
		reactRoot?: ReactDOM.Root;
	}
}

const root = document.getElementById("react-root");

if (root) {
	if (!window.reactRoot) {
		window.reactRoot = ReactDOM.createRoot(root);
	}
	window.reactRoot.render(
		<React.StrictMode>
			<AppProvider>
				<App />
			</AppProvider>
		</React.StrictMode>,
	);
}
export const killReactApp = () => {
	window.reactRoot?.unmount();
	window.reactRoot = undefined;
};
