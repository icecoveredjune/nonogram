import React, {useEffect, useState, cloneElement, forwardRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import digitRowsMaxLength from "../../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../../helpers/digitColumnsMaxLength";
import {setCanvasCtxIsAvailable} from "../../features/app/appSlice";
import {
	nonogramStrokeWidth,
	nonogramStrokeStyle,
	canvasStartingPoint,
	squareSize,
	squareStrokeWidth,
} from "../../consts";

const Canvas = forwardRef((props, ref) => {
	const squaresMarkup = useSelector(state => state.app.squares);
	const squaresPerRow = squaresMarkup[0].length; // number of squares in a row
	const squaresPerColumn = squaresMarkup.length; // number of squares in a column
	const digitRowMaxLength = digitRowsMaxLength();
	const digitColumnMaxLength = digitColumnsMaxLength();
	const nonogramWidth = (squaresPerRow + digitRowMaxLength) * (squareSize - squareStrokeWidth) + (squaresPerRow + digitRowMaxLength - 1) * squareStrokeWidth + nonogramStrokeWidth;
	const nonogramHeight = (squaresPerColumn + digitColumnMaxLength) * (squareSize - squareStrokeWidth) + (squaresPerColumn + digitColumnMaxLength - 1) * squareStrokeWidth + nonogramStrokeWidth;
	const [renderChildren, setRenderChildren] = useState(false);
	const dispatch = useDispatch();
	const childrenProps = {
		canvasRef: ref,
		nonogramWidth,
		nonogramHeight,
	};

	useEffect(() => {
		const context = ref.current.getContext('2d');

		dispatch(setCanvasCtxIsAvailable());
		setRenderChildren(true);
		context.lineWidth = nonogramStrokeWidth;
		context.strokeStyle = nonogramStrokeStyle;
		context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, nonogramWidth, nonogramHeight);
	}, []);
	return (
		<>
			<canvas
				ref={ref}
				width="500px"
				height="500px">
				Your browser doesn't support canvas
			</canvas>
			{renderChildren && props.children.map((child, i) => cloneElement(child, {
				...childrenProps,
				key: i, // yeah, I know that index in key it's not right but children order is fixed
			}))}
		</>
	);
});
export default Canvas;