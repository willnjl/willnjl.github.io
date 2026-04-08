import EnterMessage from "../EnterMessage";
import ScreenMoveIndicator from "../ScreenMoveIndicator";
import Scene from "../Scene";
import "./Coverpage.scss";

export default () => (
	<div className="coverpage">
		{/* <div className="wrap">
			<a href="/" className="back-link">
				Back to homepage
			</a>
		</div> */}
		<ScreenMoveIndicator />
		<Scene />
		<EnterMessage />
		{/* <BlurLayer /> */}
	</div>
);
