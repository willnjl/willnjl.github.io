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

		const updatePosition = (clientX: number, clientY: number) => {
			setMousePosition({
				x: (clientX - window.innerWidth / 2) / (window.innerWidth / 2),
				y: (clientY - window.innerHeight / 2) / (window.innerHeight / 2),
			});
		};

		const handleMouseMove = (event: MouseEvent) => {
			updatePosition(event.clientX, event.clientY);
		};

		const handleTouchMove = (event: TouchEvent) => {
			if (event.touches.length > 0) {
				const touch = event.touches[0];
				updatePosition(touch.clientX, touch.clientY);
			}
		};

		const handleTouchEnd = () => {
			setMousePosition({ x: 0, y: 0 });
		};

		const handleMouseLeave = () => {
			setMousePosition({ x: 0, y: 0 });
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseleave", handleMouseLeave);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseleave", handleMouseLeave);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	return (
		<AppContext.Provider value={{ isActive, setIsActive, mousePosition }}>
			{children}
		</AppContext.Provider>
	);
};
