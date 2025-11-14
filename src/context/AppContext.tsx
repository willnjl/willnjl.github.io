import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
	ReactNode,
} from "react";
import * as THREE from "three";

interface MousePosition {
	x: number;
	y: number;
}

interface AppContextType {
	isActive: boolean;
	setIsActive: (active: boolean) => void;
	mousePosition: MousePosition;
	targetVector: THREE.Vector3;
	mouseVelocity: THREE.Vector3;
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

	// Shared target vector for camera and DOM - use ref to persist across renders
	const targetVector = useRef(new THREE.Vector3(0, 0, 0)).current;
	const mouseVelocity = useRef(new THREE.Vector3(0, 0, 0)).current;

	// Track last mouse position and time for velocity calculation
	const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
	const velocityDecayRef = useRef<number | null>(null);

	useEffect(() => {
		const updatePosition = (clientX: number, clientY: number) => {
			const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
			const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);

			setMousePosition({ x, y });

			const rotX = -x < 0 ? -x * 5 : -x * 10;
			const rotY = y * 8;
			targetVector.set(rotX, rotY, 0);

			// Calculate velocity
			const now = Date.now();
			const dt = (now - lastMousePos.current.time) / 1000; // seconds

			if (dt > 0) {
				const vx = (x - lastMousePos.current.x) / dt;
				const vy = (y - lastMousePos.current.y) / dt;
				mouseVelocity.set(vx * 2, vy * 2, 0); // Scale for visibility
			}

			lastMousePos.current = { x, y, time: now };

			// Clear existing decay timeout
			if (velocityDecayRef.current) {
				cancelAnimationFrame(velocityDecayRef.current);
			}

			// Start velocity decay after mouse stops
			const decay = () => {
				mouseVelocity.lerp(new THREE.Vector3(0, 0, 0), 0.05);
				if (mouseVelocity.length() > 0.0001) {
					velocityDecayRef.current = requestAnimationFrame(decay);
				} else {
					mouseVelocity.set(0, 0, 0);
					velocityDecayRef.current = null;
				}
			};

			velocityDecayRef.current = requestAnimationFrame(decay);
		};

		const handleMouseMove = (event: MouseEvent) =>
			updatePosition(event.clientX, event.clientY);

		const handleTouchMove = (event: TouchEvent) => {
			if (event.touches.length > 0) {
				const touch = event.touches[0];
				updatePosition(touch.clientX, touch.clientY);
			}
		};

		const handleTouchEnd = () => setMousePosition({ x: 0, y: 0 });
		const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

		const handleEnter = () => {
			setIsActive(true);
		};
		window.addEventListener("keydown", handleEnter);
		// window.addEventListener("click", handleEnter);
		window.addEventListener("touchstart", (event: TouchEvent) => {
			if (event.touches.length === 1) {
				handleEnter();
			}
		});
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseleave", handleMouseLeave);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("keydown", handleEnter);
			// window.removeEventListener("click", handleEnter);
			window.removeEventListener("touchstart", handleEnter as EventListener);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseleave", handleMouseLeave);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
		};
	}, []);

	return (
		<AppContext.Provider
			value={{
				isActive,
				setIsActive,
				mousePosition,
				targetVector,
				mouseVelocity,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
