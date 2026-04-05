import React, { useEffect, useState } from "react";
import EnterMessage from "../EnterMessage";
import ScreenMoveIndicator from "../ScreenMoveIndicator";
import BlurLayer from "../BlurLayer";
import Scene from "../Scene";
import "./Coverpage.scss";

export default () => (
	<div className="coverpage">
		<ScreenMoveIndicator />
		<Scene />
		<EnterMessage />
		{/* <BlurLayer /> */}
	</div>
);
