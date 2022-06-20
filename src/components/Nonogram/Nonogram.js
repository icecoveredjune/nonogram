import React, {useRef} from "react";
import {useSelector} from "react-redux";
import Canvas from "../Canvas/Canvas";
import ColumnsDrawer from "../Drawers/ColumnsDrawer";
import ControlPanel from "../ControlPanel/ControlPanel";
import DigitsBlockFiller from "../DigitsFiller/digitsBlockFiller";
import DigitsInColumnsDrawer from "../Drawers/DigitsInColumnsDrawer";
import DigitsInRowsDrawer from "../Drawers/DigitsInRowsDrawer";
import RowsDrawer from "../Drawers/RowsDrawer";
import SquaresMarker from "../SquaresMarker/SquaresMarker";
import UpperLeftCornerDrawer from "../Drawers/UpperLeftCornerDrawer";

const Nonogram = () => {
	const canvasRef = useRef(null);
	const canvasCtxIsAvailable = useSelector(state => state.app.canvasCtxIsAvailable);
	const gamePassed = useSelector(state => state.app.gamePassed);
	const childrenComponents = [
		DigitsBlockFiller,
		RowsDrawer,
		ColumnsDrawer,
		UpperLeftCornerDrawer,
		DigitsInRowsDrawer,
		DigitsInColumnsDrawer,
		SquaresMarker,
	];
	const childrenComponentsMapped = childrenComponents.map((Component, index) => ({
		id: index,
		Component,
	}));

	return (
		<>
			<Canvas ref={canvasRef}>
				{childrenComponentsMapped.map(Child => <Child.Component key={Child.id} />)}
			</Canvas>
			{canvasCtxIsAvailable && <ControlPanel canvas={canvasRef} />}
			{gamePassed &&
				<div style={{
					textAlign: "center",
					marginTop: "20px",
					color: "green",
					fontSize: "20px",
				}}> {/*inline styles for demo purposes only!*/}
					<span>GC!Game passed!</span>
				</div>
			}
		</>
	);
};

export default Nonogram;