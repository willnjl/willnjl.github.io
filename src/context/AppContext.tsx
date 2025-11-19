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

	const targetVector = useRef(new THREE.Vector3(0, 0, 0)).current;
	const mouseVelocity = useRef(new THREE.Vector3(0, 0, 0)).current;
	const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });
	const velocityDecayRef = useRef<number | null>(null);

	const updatePosition = (clientX: number, clientY: number) => {
		const x = (clientX - window.innerWidth / 2) / (window.innerWidth / 2);
		const y = (clientY - window.innerHeight / 2) / (window.innerHeight / 2);
		setMousePosition({ x, y });
		const rotX = -x < 0 ? -x * 5 : -x * 10;
		const rotY = y * 8;
		targetVector.set(rotX, rotY, 0);
		const now = Date.now();
		const dt = (now - lastMousePos.current.time) / 1000;
		if (dt > 0) {
			const vx = (x - lastMousePos.current.x) / dt;
			const vy = (y - lastMousePos.current.y) / dt;
			mouseVelocity.set(vx * 2, vy * 2, 0);
		}
		lastMousePos.current = { x, y, time: now };
		if (velocityDecayRef.current)
			cancelAnimationFrame(velocityDecayRef.current);
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

	const onTap = () => setIsActive(true);
	const onDrag = (dx: number, dy: number, event: TouchEvent | MouseEvent) => {
		let clientX = 0,
			clientY = 0;
		if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
			clientX = event.touches[0]?.clientX ?? 0;
			clientY = event.touches[0]?.clientY ?? 0;
		} else if ("clientX" in event && "clientY" in event) {
			clientX = (event as MouseEvent).clientX;
			clientY = (event as MouseEvent).clientY;
		}
		updatePosition(clientX, clientY);
	};

	useEffect(() => {
		let moved = false,
			startX = 0,
			startY = 0,
			lastEvent: TouchEvent | MouseEvent | null = null;
		const handleTouchStart = (e: TouchEvent) => {
			if (e.touches.length === 1) {
				moved = false;
				startX = e.touches[0].clientX;
				startY = e.touches[0].clientY;
				lastEvent = e;
			}
		};
		const handleTouchMove = (e: TouchEvent) => {
			if (e.touches.length === 1) {
				const dx = e.touches[0].clientX - startX;
				const dy = e.touches[0].clientY - startY;
				if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved = true;
				onDrag(dx, dy, e);
				lastEvent = e;
			}
		};
		const handleTouchEnd = () => {
			if (!moved && lastEvent) onTap();
			setMousePosition({ x: 0, y: 0 });
			lastEvent = null;
		};
		let mouseDown = false,
			mouseStartX = 0,
			mouseStartY = 0;
		const handleMouseDown = (e: MouseEvent) => {
			mouseDown = true;
			mouseStartX = e.clientX;
			mouseStartY = e.clientY;
		};
		const handleMouseMove = (e: MouseEvent) => {
			updatePosition(e.clientX, e.clientY);
			if (mouseDown) {
				const dx = e.clientX - mouseStartX;
				const dy = e.clientY - mouseStartY;
				onDrag(dx, dy, e);
			}
		};
		const handleMouseUp = () => {
			mouseDown = false;
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
