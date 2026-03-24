/**
 * Color profile definitions for density visualization.
 * Each profile contains a GLSL function that maps a normalized value [0,1] to an RGB color.
 */
export type ColorProfileName = "heatmap" | "greyscale";
export interface ColorProfile {
    name: ColorProfileName;
    glslFunction: string;
    label: string;
}
export declare const COLOR_PROFILES: Record<ColorProfileName, ColorProfile>;
export declare const COLOR_PROFILE_NAMES: ColorProfileName[];
export declare const getColorProfile: (name: ColorProfileName) => ColorProfile;
