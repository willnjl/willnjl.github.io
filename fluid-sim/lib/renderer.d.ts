import { default as REGL } from 'regl';
export type Renderer = {
    canvas: HTMLCanvasElement;
    regl: ReturnType<typeof REGL>;
    resize: () => void;
    destroy: () => void;
};
export declare const createRenderer: (canvas: HTMLCanvasElement) => Renderer;
