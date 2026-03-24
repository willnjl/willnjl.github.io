import "./styles/style.css";
import "./components";

import { initWorld2d } from "fluid-sim";

initWorld2d({
	n: 120,
	decay: 0.0001,
	maxDensity: 35,
	mouseEffectAmplitude: 0.5,
	mouseEffectRadius: 4,
	canvas: document.querySelector(".fluid-sim") as HTMLCanvasElement,
});
