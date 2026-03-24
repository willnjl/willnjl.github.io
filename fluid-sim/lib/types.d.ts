import { InitOutput, World2d, World3d } from 'rust-wasm';
import { ResolvedWorldConfig } from './config';
import { HudState } from './hud';
import { Renderer } from './renderer';
export type World = World2d | World3d;
export type RenderState<T extends World = World> = {
    world: T;
    wasm: InitOutput;
    config: ResolvedWorldConfig;
    hud: HudState;
    renderer: Renderer;
};
