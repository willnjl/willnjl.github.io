import { Renderer } from '../../renderer';
import { RenderState } from '../../types';
import { ColorProfileName } from '../../colorProfiles';
/**
 * Renders a slice of density data as a visualization using WebGL.
 *
 * @description
 * This regl command draws a full-screen quad textured with density data from a sampler.
 * The fragment shader applies a color profile based on normalized density values.
 *
 * @property {string} vert - Vertex shader that maps the quad to screen space and computes UV coordinates
 * @property {string} frag - Fragment shader that samples density texture and applies color profile
 * @property {Object} attributes - Vertex attributes for the rendering command
 * @property {regl.Buffer} attributes.position - 6 vertices defining two triangles (full-screen quad)
 * @property {Object} uniforms - Uniform variables passed to shaders
 * @property {regl.Texture} uniforms.uDensity - Texture containing normalized density values (red channel)
 * @property {number} uniforms.uMax - Maximum density value used for normalization (prop-based, varies per call)
 * @property {number} count - Number of vertices to render (6 for quad)
 */
export declare const createDrawSlice: ({ regl }: Renderer, n: number, colorProfile?: ColorProfileName) => ({ world, config }: RenderState) => void;
