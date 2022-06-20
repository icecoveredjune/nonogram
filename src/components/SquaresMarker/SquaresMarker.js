import {useEffect} from "react";
import {useDispatch, useStore} from "react-redux";
import {squareSize, squareStrokeWidth, crossesCorrection} from "../../consts";
import {
	finishGame,
	saveMove,
	setSquares,
	zeroingCurrentShift,
	saveFilledIds,
	deleteFilledIds,
} from "../../features/app/appSlice";
import defineCurrentSquare from "../../helpers/defineCurrentSquare";
import gameIsFinished from "../../helpers/gameIsFinished";
import throttle from "../../utils/throttle";

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
	const store = useStore();
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
					id: squareId,
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
					id: squareId,
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
		const {
			currentShift,
			userFilledIds,
		} = store.getState().app;
		const idsToSave = [];
		const idsToDelete = [];

		if (currentShift !== 0) {
			dispatch(zeroingCurrentShift());
		}
		mouseIsDown = false;
		dispatch(setSquares(batch));
		dispatch(saveMove(batch));
		// iterate over users marked squares to save id's marked with value "1"
		for (const square of batch) {
			if (square.value === 1) {
				if (!userFilledIds.includes(square.id)) {
					idsToSave.push(square.id);
				}
			} else {
				if (userFilledIds.includes(square.id)) {
					idsToDelete.push(square.id);
				}
			}
		}
		if (idsToSave.length) {
			dispatch(saveFilledIds(idsToSave));
		}
		if (idsToDelete.length) {
			dispatch(deleteFilledIds(idsToDelete));
		}
		if (gameIsFinished()) {
			dispatch(finishGame());
		}
		batch.length = 0;
		squaresUnderEditId.length = 0;

	};
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
	});

	return null;
};
export default SquaresMarker;