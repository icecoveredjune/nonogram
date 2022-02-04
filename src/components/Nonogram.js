import React, {useRef} from "react";
import Canvas from "./Canvas";
import DigitsBlockFiller from "./digitsBlockFiller";
import RowsDrawer from "./RowsDrawer";
import ColumnsDrawer from "./ColumnsDrawer";
import UpperLeftCornerDrawer from "./UpperLeftCornerDrawer";
import DigitsInRowsDrawer from "./DigitsInRowsDrawer";
import DigitsInColumnsDrawer from "./DigitsInColumnsDrawer";
import SquaresMarker from "./SquaresMarker";
import ControlPanel from "./ControlPanel/ControlPanel";
import {useSelector} from "react-redux";

const Nonogram = () => {
	const canvasRef = useRef(null);
	const canvasCtxAvailable = useSelector(state => state.app.canvasCtxAvailable);

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
			{canvasCtxAvailable && <ControlPanel canvas={canvasRef}/>}
		</>
	);
};

export default Nonogram;