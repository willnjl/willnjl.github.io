import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useRef,
	ReactNode,
} from "react";
import * as THREE from "three";
import { useGesture } from "@use-gesture/react";

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
	onTap: (event: TouchEvent | MouseEvent) => void;
	onDrag: (dx: number, dy: number, event: TouchEvent | MouseEvent) => void;
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

	// For tap/drag distinction
	const dragStart = useRef<{ x: number; y: number } | null>(null);

	// --- GESTURE HANDLERS ---
	// Helper to update position and velocity
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

	// Tap handler (single tap, no move)
	const onTap = (event: TouchEvent | MouseEvent) => {
		setIsActive(true);
		// You can add more tap logic here
	};

	// Drag handler (move)
	const onDrag = (dx: number, dy: number, event: TouchEvent | MouseEvent) => {
		// dx, dy are in pixels; convert to normalized coordinates
		const clientX =
			event instanceof TouchEvent
				? event.touches[0]?.clientX ?? 0
				: (event as MouseEvent).clientX;
		const clientY =
			event instanceof TouchEvent
				? event.touches[0]?.clientY ?? 0
				: (event as MouseEvent).clientY;
		updatePosition(clientX, clientY);
	};

	// Set up gesture listeners on the window
	useEffect(() => {
		// UseGesture expects a ref, but we want global events, so we use native listeners for tap/drag distinction
		let moved = false;
		let startX = 0;
		let startY = 0;
		let lastEvent: TouchEvent | MouseEvent | null = null;

		const handleTouchStart = (event: TouchEvent) => {
			if (event.touches.length === 1) {
				moved = false;
				startX = event.touches[0].clientX;
				startY = event.touches[0].clientY;
				lastEvent = event;
			}
		};
		const handleTouchMove = (event: TouchEvent) => {
			if (event.touches.length === 1) {
				const dx = event.touches[0].clientX - startX;
				const dy = event.touches[0].clientY - startY;
				if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
					moved = true;
				}
				onDrag(dx, dy, event); // Always update position/velocity
				lastEvent = event;
			}
		};
		const handleTouchEnd = (event: TouchEvent) => {
			if (!moved && lastEvent) {
				onTap(lastEvent);
			}
			setMousePosition({ x: 0, y: 0 });
			lastEvent = null;
		};

		// Mouse for desktop
		let mouseDown = false;
		let mouseStartX = 0;
		let mouseStartY = 0;
		let mouseMoved = false;
		let mouseLastEvent: MouseEvent | null = null;

		const handleMouseDown = (event: MouseEvent) => {
			mouseDown = true;
			mouseMoved = false;
			mouseStartX = event.clientX;
			mouseStartY = event.clientY;
			mouseLastEvent = event;
		};
		const handleMouseMove = (event: MouseEvent) => {
			if (mouseDown) {
				const dx = event.clientX - mouseStartX;
				const dy = event.clientY - mouseStartY;
				if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
					mouseMoved = true;
					onDrag(dx, dy, event);
				}
				mouseLastEvent = event;
			}
		};
		const handleMouseUp = (event: MouseEvent) => {
			if (mouseDown && !mouseMoved && mouseLastEvent) {
				onTap(mouseLastEvent);
			}
			mouseDown = false;
			mouseLastEvent = null;
		};

		window.addEventListener("touchstart", handleTouchStart);
		window.addEventListener("touchmove", handleTouchMove);
		window.addEventListener("touchend", handleTouchEnd);
		window.addEventListener("mousedown", handleMouseDown);
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);

		return () => {
			window.removeEventListener("touchstart", handleTouchStart);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleTouchEnd);
			window.removeEventListener("mousedown", handleMouseDown);
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
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
				onTap,
				onDrag,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
