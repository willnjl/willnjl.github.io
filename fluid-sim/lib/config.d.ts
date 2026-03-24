export interface HudConfig {
    fps?: HTMLSpanElement | null;
    mouseX?: HTMLSpanElement | null;
    mouseY?: HTMLSpanElement | null;
    mouseVX?: HTMLSpanElement | null;
    mouseVY?: HTMLSpanElement | null;
}
export interface WorldConfig {
    n?: number;
    maxDensity?: number;
    decay?: number;
    diffusion?: number;
    viscocity?: number;
    dt?: number;
    mouseEffectAmplitude?: number;
    mouseEffectRadius?: number;
    canvas?: HTMLCanvasElement | null;
    hud?: HudConfig;
    colorProfile?: "heatmap" | "greyscale";
}
export interface ResolvedHudConfig {
    fps: HTMLSpanElement | null;
    mouseX: HTMLSpanElement | null;
    mouseY: HTMLSpanElement | null;
    mouseVX: HTMLSpanElement | null;
    mouseVY: HTMLSpanElement | null;
}
export interface ResolvedWorldConfig {
    n: number;
    center: number;
    maxDensity: number;
    decay: number;
    diffusion: number;
    viscocity: number;
    dt: number;
    mouseEffectAmplitude: number;
    mouseEffectRadius: number;
    canvas: HTMLCanvasElement;
    hud: ResolvedHudConfig;
    colorProfile: "heatmap" | "greyscale";
}
export declare const resolveWorldConfig: (config?: WorldConfig) => ResolvedWorldConfig;
