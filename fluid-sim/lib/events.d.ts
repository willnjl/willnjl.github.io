interface MouseState {
    mouseX: number;
    mouseY: number;
    vX: number;
    vY: number;
}
interface MouseListenersConfig {
    canvas: HTMLCanvasElement;
    n: number;
}
export declare function initMouseListeners({ canvas, n, }: MouseListenersConfig): () => void;
export declare function getMouseState(): MouseState;
export {};
