/*	TODO
 *	replace i in children map
 * */
import React, {useEffect, useRef, useState} from "react";
import {nonogramStrokeWidth, nonogramStrokeStyle, canvasStartingPoint, squareSize, squareStrokeWidth} from "../consts";
import digitRowsMaxLength from "../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../helpers/digitColumnsMaxLength";
import {useDispatch, useSelector} from "react-redux";
import {cloneElement} from "react";
import styles from "./Canvas.module.css";
import {forwardRef} from "react";
import {setCanvasCtxIsAvailable} from "../features/app/appSlice";

const Canvas = forwardRef((props, ref) => {
	console.log('Canvas');
	/*const canvasRef = ref;*/
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
		console.log('updated/mounted');
		/*const canvas = canvasRef.current;*/
		const context = ref.current.getContext('2d');

		dispatch(setCanvasCtxIsAvailable());
		setRenderChildren(true);
		context.lineWidth = nonogramStrokeWidth;
		context.strokeStyle = nonogramStrokeStyle;
		context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, nonogramWidth, nonogramHeight);
	}, []);
	return (
		<div className={styles.canvasWrapper}>
			<canvas
				ref={ref}
				width="500px"
				height="500px">
				Your browser doesn't support canvas
			</canvas>
			{renderChildren && props.children.map((child, i) => cloneElement(child, {
				...childrenProps,
				key: i,
			}))}
		</div>
	);
});
export default Canvas;