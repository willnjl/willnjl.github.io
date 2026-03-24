import { ResolvedWorldConfig } from './config';
export type HudState = {
    lastTime: number;
    frameCount: number;
    fps: number;
    mouseX: number;
    mouseY: number;
    vX: number;
    vY: number;
    elements: ResolvedWorldConfig["hud"];
};
export declare const initHud: (config: ResolvedWorldConfig) => HudState;
export declare const updateHud: (state: HudState) => void;
