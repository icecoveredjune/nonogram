import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {saveMarkup, setSquares} from "../features/app/appSlice";
import {squareSize, squareStrokeWidth, crossesCorrection} from "../consts";
import defineCurrentSquare from "../helpers/defineCurrentSquare";
import throttle from "../utils/throttle";
/*import {store} from "../app/store";*/
import {increment} from "../features/app/appSlice";
import {store} from "../app/store";

const SquaresMarker = (props) => {
	let mouseIsDown = false;
	let mouseButtonType = 0;
	// objects that need to be dispatched after mouse up event
	const batch = [];
	// what squares is currently being edited
	const squaresUnderEditId = [];
	const canvas = props.canvasRef.current;
	const context = props.canvasRef.current.getContext('2d');
	const fillSize = squareSize - squareStrokeWidth;
	const dispatch = useDispatch();
	const markSquares = (x, y) => {
		const currentSquare = defineCurrentSquare(context, x, y);

		if (currentSquare === null) {
			return;
		}
		let squareId = -1;
		// square value, where is 0 - empty, 1 -filled, 2-crossed
		let value = 0;

		squareId = currentSquare.id;
		/*
		 *	this is needed to prevent extra work on square which is already marked while moving mouse
		 * */
		if (squaresUnderEditId.includes(squareId)) {
			return;
		}
		squaresUnderEditId.push(currentSquare.id);
		context.clearRect(currentSquare.x, currentSquare.y, fillSize, fillSize);
		switch (mouseButtonType) {
			// left button held
			case 0:
				if (currentSquare.value !== 1) {
					value = 1;
					context.fillRect(currentSquare.x, currentSquare.y, fillSize, fillSize);
				}
				batch.push({
					index: squareId,
					value,
				});
				break;
			// right button held
			case 2:
				if (currentSquare.value !== 2) {
					value = 2;
					context.lineWidth = 2;
					context.strokeStyle = '#000';
					context.beginPath();
					context.moveTo(currentSquare.x + crossesCorrection, currentSquare.y + crossesCorrection);
					context.lineTo(currentSquare.x + fillSize - crossesCorrection, currentSquare.y + fillSize - crossesCorrection);
					context.moveTo(currentSquare.x + fillSize - crossesCorrection, currentSquare.y + crossesCorrection);
					context.lineTo(currentSquare.x + crossesCorrection, currentSquare.y + fillSize - crossesCorrection);
					context.stroke();
					context.closePath();
				}
				batch.push({
					index: squareId,
					value,
				});
				break;
			default:
			//
		}
	};
	const contextmenuHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const mouseMoveHandler = throttle((e) => {
		if (!mouseIsDown) {
			return;
		}
		const x = e.offsetX;
		const y = e.offsetY;

		markSquares(x, y);
	}, 10);
	const mouseDownHandler = (e) => {
		const x = e.offsetX;
		const y = e.offsetY;

		mouseIsDown = true;
		mouseButtonType = e.button;
		markSquares(x, y);
	};
	const mouseUpHandler = () => {
		mouseIsDown = false;
		dispatch(setSquares(batch));
		dispatch(saveMarkup(batch));
		batch.length = 0;
		squaresUnderEditId.length = 0;
	};
	console.log('SquaresMarker render');
	useEffect(() => {
		canvas.addEventListener('contextmenu', contextmenuHandler);
		canvas.addEventListener('mousemove', mouseMoveHandler);
		canvas.addEventListener('mousedown', mouseDownHandler);
		canvas.addEventListener('mouseup', mouseUpHandler);
		return () => {
			canvas.removeEventListener('contextmenu', contextmenuHandler);
			canvas.removeEventListener('mousemove', mouseMoveHandler);
			canvas.removeEventListener('mousedown', mouseDownHandler);
			canvas.removeEventListener('mouseup', mouseUpHandler);
		};
	}, []);
	/*context.fillStyle = '#000';
	 context.globalCompositeOperation = 'source-over'
	 context.fillRect(139, 117, 20, 20);
	 context.fillRect(161, 117, 20, 20);
	 context.fillRect(203, 117, 20, 20);
	 context.fillRect(205, 117, 20, 20);
	 context.fillRect(227, 117, 20, 20);
	 context.fillRect(249, 117, 20, 20);
	 context.fillRect(271, 117, 20, 20);
	 context.fillRect(293, 117, 20, 20);
	 context.fillRect(315, 117, 20, 20);
	 context.fillRect(337, 117, 20, 20);
	 context.fillRect(359, 117, 20, 20);
	 context.fillRect(381, 117, 20, 20);
	 context.fillRect(403, 117, 20, 20);
	 context.fillRect(425, 117, 20, 20);


	 context.fillRect(447, 117, 20, 20);
	 context.fillRect(447, 403, 20, 20);
	 context.clearRect(447, 403, 20, 20)
	 console.log(context.getContextAttributes())
	 console.log(context)*/
	return null;
};
export default SquaresMarker;