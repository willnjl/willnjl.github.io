// ========================================
// EVENT LISTENERS
// ========================================

/*
 * Amplification factor for drag/mouse velocity
 */
export const DRAG_VELOCITY_AMPLIFICATION = 2;

/**
 * Global project constants
 * Centralized configuration for easy tuning of visual effects and behaviors
 */

// ========================================
// LOADING PAGE
// ========================================

export const LOADING_PHRASES = [
	"Deploying submersible",
	"Bioilluminating",
	"Entering submersible",
	"Plotting course",
	"Switching on biolights",
	"Avoiding Kraken",
	"Charging glow panels",
	"Untangling seaweed",
	"Feeding Fish",
];

// ========================================
// POST PROCESSING EFFECTS
// ========================================

/**
 * General noise/glitch intensity multiplier (0-2)
 * Controls the strength of chromatic aberration noise effects
 */
export const NOISE_INTENSITY = 0.4;

/**
 * Probability of noise occurring per frame (0-1)
 * Higher values = more frequent glitch flickers
 */
export const NOISE_FREQUENCY = 0.9;

/**
 * Mouse velocity effect intensity multiplier (0-2)
 * Controls how much mouse movement affects chromatic aberration
 */
export const MOUSE_VELOCITY_INTENSITY = 1.0;

// ========================================
// BLOOM EFFECT
// ========================================

/**
 * Bloom intensity for bioluminescent glow
 */
export const BLOOM_INTENSITY = 0.8;

/**
 * Luminance threshold for bloom effect
 */
export const BLOOM_LUMINANCE_THRESHOLD = 0.2;

/**
 * Luminance smoothing for bloom effect
 */
export const BLOOM_LUMINANCE_SMOOTHING = 0.9;

// ========================================
// DEPTH OF FIELD
// ========================================

/**
 * Focus distance for depth of field effect
 */
export const DOF_FOCUS_DISTANCE = 0.1;

/**
 * Focal length for depth of field effect
 */
export const DOF_FOCAL_LENGTH = 60;

/**
 * Bokeh scale for depth of field blur
 */
export const DOF_BOKEH_SCALE = 0.25;

// ========================================
// VIGNETTE EFFECT
// ========================================

/**
 * Vignette offset from edges
 */
export const VIGNETTE_OFFSET = 0.3;

/**
 * Vignette darkness intensity
 */
export const VIGNETTE_DARKNESS = 0.6;

// ========================================
// BUBBLES
// ========================================

/**
 * Number of bubble instances to render
 */
export const BUBBLE_COUNT = 150;

/**
 * Base radius for bubble positioning
 */
export const BUBBLE_RADIUS = 2;

/**
 * Speed multiplier for bubble movement
 */
export const BUBBLE_SPEED = 0.5;

/**
 * Minimum distance from center for bubble spawn (units)
 */
export const BUBBLE_MIN_DISTANCE = 5;

/**
 * Maximum distance from center for bubble spawn (units)
 */
export const BUBBLE_MAX_DISTANCE = 13;

/**
 * Bubble material opacity (0-1)
 */
export const BUBBLE_OPACITY = 0.5;

/**
 * Bubble material color
 */
export const BUBBLE_COLOR = "#a3b1bb";

/**
 * Bubble scale range - minimum
 */
export const BUBBLE_SCALE_MIN = 0.03;

/**
 * Bubble scale range - maximum
 */
export const BUBBLE_SCALE_MAX = 0.11;

/**
 * Bubble wobble speed range - minimum
 */
export const BUBBLE_WOBBLE_SPEED_MIN = 0.01;

/**
 * Bubble wobble speed range - maximum
 */
export const BUBBLE_WOBBLE_SPEED_MAX = 0.03;

/**
 * Bubble wobble amplitude
 */
export const BUBBLE_WOBBLE_AMPLITUDE = 0.1;

// ========================================
// COLORS
// ========================================

/**
 * Background gradient - top color
 */
export const BG_TOP_COLOR = 0x102b44;

/**
 * Background gradient - bottom color
 */
export const BG_BOTTOM_COLOR = 0x000000;

/**
 * Fog shader - bottom color
 */
export const FOG_BOTTOM_COLOR = "#000000";

/**
 * Fog shader - top color
 */
export const FOG_TOP_COLOR = "#4a90e2";

/**
 * Scene lighting - ambient light color
 */
export const AMBIENT_LIGHT_COLOR = "#1a3d5c";

/**
 * Scene lighting - main directional light color
 */
export const DIRECTIONAL_LIGHT_MAIN_COLOR = "#4db8e8";

/**
 * Scene lighting - secondary directional light color
 */
export const DIRECTIONAL_LIGHT_SECONDARY_COLOR = "#6a4c93";

/**
 * Scene lighting - point light 1 color (left)
 */
export const POINT_LIGHT_1_COLOR = "#d946ef";

/**
 * Scene lighting - point light 2 color (right)
 */
export const POINT_LIGHT_2_COLOR = "#8b5cf6";

/**
 * Scene lighting - point light 3 color (top)
 */
export const POINT_LIGHT_3_COLOR = "#a78bfa";

/**
 * Scene lighting - point light 4 color (bottom)
 */
export const POINT_LIGHT_4_COLOR = "#0ea5e9";

/**
 * Anchor chain - link color
 */
export const ANCHOR_CHAIN_COLOR = "#fcfbfb";

// ========================================
// CAMERA RIG
// ========================================

/**
 * Camera movement - maximum X position
 */
export const CAMERA_MAX_X = 10;

/**
 * Camera movement - maximum Y position
 */
export const CAMERA_MAX_Y = 5;

/**
 * Camera movement - lerp speed multiplier
 */
export const CAMERA_LERP_SPEED = 1.85;

/**
 * Camera position - Z position (distance from origin)
 */
export const CAMERA_POSITION_Z = 6;

/**
 * Camera start position - X (right side)
 */
export const CAMERA_START_X = -2;

/**
 * Camera start position - Y (elevated)
 */
export const CAMERA_START_Y = -0.5;

/**
 * Camera look-at target position
 */
export const CAMERA_LOOK_AT_X = -0.24;
export const CAMERA_LOOK_AT_Y = 0;
export const CAMERA_LOOK_AT_Z = 0;

// ========================================
// CONTENT
// ========================================

/**
 * Content rotation - X axis intensity (rotation based on mouse velocity)
 */
export const CONTENT_X_INTENSITY = -4;

/**
 * Content rotation - Y axis intensity (rotation based on mouse velocity)
 */
export const CONTENT_Y_INTENSITY = 4;

/**
 * Content rotation - lerp speed for smooth transitions
 */
export const CONTENT_LERP_SPEED = 0.01;

/**
 * Content text - chromatic aberration intensity multiplier
 */
export const CONTENT_CHROMATIC_ABERRATION_INTENSITY = 1.25;

/**
 * Content text - chromatic aberration max opacity
 */
export const CONTENT_CHROMATIC_ABERRATION_MAX_OPACITY = 0.75;

// ========================================
// JELLYFISH MODEL
// ========================================

/**
 * Animation sequence for jellyfish movements
 * Define the order in which animations will cycle
 */
export const JELLYFISH_ANIMATION_SEQUENCE = [
	"jellyfish|move_4",
	"jellyfish|move_3",
	"jellyfish|move_2",
] as const;
// ========================================
// LUMINESCENT PARTICLES
// ========================================

/**
 * Movement rate/activity of luminescent particles
 */
export const LUMINESCENT_PARTICLE_ACTIVITY = 0.0025;

/**
 * Number of luminescent particles
 */
export const LUMINESCENT_PARTICLE_COUNT = 40;

/**
 * Color of luminescent particles
 */
export const LUMINESCENT_PARTICLE_COLOR = "#fffaf0";

/**
 * Size of luminescent particles
 */
export const LUMINESCENT_PARTICLE_SIZE = 0.045;

/**
 * Opacity of luminescent particles
 */
export const LUMINESCENT_PARTICLE_OPACITY = 0.5;
