import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

interface MousePosition {
	x: number;
	y: number;
}

interface AppContextType {
	isActive: boolean;
	setIsActive: (active: boolean) => void;
	mousePosition: MousePosition;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within AppProvider");
	}
	return context;
};

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [isActive, setIsActive] = useState(false);
	const [mousePosition, setMousePosition] = useState<MousePosition>({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsActive(true);
			}
		};

		const handleMouseMove = (event: MouseEvent) => {
			setMousePosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<AppContext.Provider value={{ isActive, setIsActive, mousePosition }}>
			{children}
		</AppContext.Provider>
	);
};
