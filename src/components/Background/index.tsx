import * as THREE from "three";
import { BG_TOP_COLOR, BG_BOTTOM_COLOR } from "@/constants";

export default () => {
	return (
		<mesh scale={[-1, 1, 1]} position={[0, 150, 0]}>
			<sphereGeometry args={[500, 32, 32]} />
			<shaderMaterial
				side={THREE.BackSide}
				depthWrite={false}
				uniforms={{
					topColor: { value: new THREE.Color(BG_TOP_COLOR) },
					bottomColor: { value: new THREE.Color(BG_BOTTOM_COLOR) },
				}}
				vertexShader={`
                    varying vec3 vWorldPosition;
                    void main() {
                        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                        vWorldPosition = worldPosition.xyz;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `}
				fragmentShader={`
                    uniform vec3 topColor;
                    uniform vec3 bottomColor;
                    varying vec3 vWorldPosition;
                    void main() {
                        float h = normalize(vWorldPosition).y;
                        float mixValue = pow((h + 1.0) * 0.5, 2.0);
                        gl_FragColor = vec4(mix(bottomColor, topColor, mixValue), 1.0);
                    }
                `}
			/>
		</mesh>
	);
};
