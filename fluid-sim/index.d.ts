import { World2d, World3d } from 'rust-wasm';
import { WorldConfig } from './lib/config';
export type World = World2d | World3d;
export declare const initWorld2d: (worldConfig?: WorldConfig) => Promise<void>;
export declare const initWorld3d: (worldConfig?: WorldConfig) => Promise<void>;
export type { WorldConfig } from './lib/config';
