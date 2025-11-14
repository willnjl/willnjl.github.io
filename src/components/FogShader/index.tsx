import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FogShaderProps {
	thickness?: number;
	bottomColor?: string;
	topColor?: string;
	near?: number;
	far?: number;
}

export default function FogShader({
	thickness = 1.0,
	bottomColor = "#000000",
	topColor = "#4a90e2",
	near = 5,
	far = 50,
}: FogShaderProps) {
	const { scene } = useThree();

	useEffect(() => {
		const bottomColorObj = new THREE.Color(bottomColor);
		const topColorObj = new THREE.Color(topColor);

		// Store original onBeforeCompile functions
		const originalCompiles = new Map();

		// Traverse all objects and modify their materials
		scene.traverse((object: any) => {
			if (object.isMesh && object.material) {
				const materials = Array.isArray(object.material)
					? object.material
					: [object.material];

				materials.forEach((material: any) => {
					// Skip materials with high transmission (like bubbles) or materials marked to skip fog
					if (material.transmission > 0.5 || material.userData.skipFog) {
						return;
					}

					if (!material.userData.fogModified) {
						// Store original compile function
						originalCompiles.set(material.uuid, material.onBeforeCompile);

						material.onBeforeCompile = (shader: any) => {
							// Add custom uniforms
							shader.uniforms.fogNear = { value: near };
							shader.uniforms.fogFar = { value: far };
							shader.uniforms.fogThickness = { value: thickness };
							shader.uniforms.fogColorBottom = { value: bottomColorObj };
							shader.uniforms.fogColorTop = { value: topColorObj };

							// Add uniforms to vertex shader
							shader.vertexShader = shader.vertexShader.replace(
								"#include <common>",
								`#include <common>
								varying vec3 vWorldPosition;`
							);

							shader.vertexShader = shader.vertexShader.replace(
								"#include <fog_vertex>",
								`#include <fog_vertex>
								vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;`
							);

							// Add uniforms and gradient fog to fragment shader
							shader.fragmentShader = shader.fragmentShader.replace(
								"#include <common>",
								`#include <common>
								uniform float fogNear;
								uniform float fogFar;
								uniform float fogThickness;
								uniform vec3 fogColorBottom;
								uniform vec3 fogColorTop;
								varying vec3 vWorldPosition;`
							);

							shader.fragmentShader = shader.fragmentShader.replace(
								"#include <fog_fragment>",
								`
								float fogDepth = length(vWorldPosition - cameraPosition);
								float fogFactor = smoothstep(fogNear, fogFar, fogDepth);
								fogFactor = pow(fogFactor, fogThickness);
								
								// Calculate gradient based on world position Y
								float heightFactor = (vWorldPosition.y + 5.0) / 10.0;
								heightFactor = clamp(heightFactor, 0.0, 1.0);
								
								vec3 fogColor = mix(fogColorBottom, fogColorTop, heightFactor);
								gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
								`
							);
						};

						material.userData.fogModified = true;
						material.needsUpdate = true;
					}
				});
			}
		});

		return () => {
			// Cleanup: restore original materials
			scene.traverse((object: any) => {
				if (object.isMesh && object.material) {
					const materials = Array.isArray(object.material)
						? object.material
						: [object.material];

					materials.forEach((material: any) => {
						if (material.userData.fogModified) {
							const originalCompile = originalCompiles.get(material.uuid);
							if (originalCompile) {
								material.onBeforeCompile = originalCompile;
							} else {
								delete material.onBeforeCompile;
							}
							delete material.userData.fogModified;
							material.needsUpdate = true;
						}
					});
				}
			});
		};
	}, [scene, thickness, bottomColor, topColor, near, far]);

	return null;
}
