import "../styles/style.css";

import { initWorld2d } from "fluid-sim";
import { sniffDevice } from "../components/sniffer";

const { isMobile } = sniffDevice();

if (!isMobile)
	(() => {
		const hud = document.querySelector("#hud") as HTMLElement;
		const fps_hud = document.createElement("span");
		fps_hud.id = "hud-fps";
		hud.appendChild(fps_hud);

		initWorld2d({
			n: 64,
			decay: 0.0001,
			maxDensity: 35,
			mouseEffectAmplitude: 0.5,
			mouseEffectRadius: 4,
			colorProfile: "greyscale",
			canvas: document.querySelector(".fluid-sim") as HTMLCanvasElement,
		});
	})();
