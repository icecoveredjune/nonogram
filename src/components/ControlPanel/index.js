import {useState} from "react";
import {useDispatch, useSelector, useStore} from "react-redux";
import {clearCanvas, redo, undo, toggleClearConfirmation} from "../../features/app/appSlice";
import Modal from "../Modal";
import {setSquares} from "../../features/app/appSlice";
import {backward, forward, clear, crossesCorrection} from "../../consts";
import {squareSize, squareStrokeWidth} from "../../consts";
import styles from "./ControlPanel.module.css";

const ControlPanel = (props) => {
	const canvas = props.canvas.current;
	const context = canvas.getContext('2d');
	const dispatch = useDispatch();
	const store = useStore();
	const [modalIsVisible, setModalVisibility] = useState(false);
	const currentShift = useSelector(state => state.app.currentShift);
	const moves = useSelector(state => state.app.moves);
	const {
		showClearConfirmation,
		squaresCopy,
	} = store.getState().app;
	const undoIsDisabled = moves.length + currentShift === 0;
	const redoIsDisabled = currentShift === 0;
	const clearIsDisabled = moves.length === 0 || moves.length + currentShift === 0;
	const clearedSize = squareSize - squareStrokeWidth;
	const fillSize = squareSize - squareStrokeWidth;
	const batch = [];
	const clearCnv = () => {
		for (const square of squaresCopy) {
			const {
				x,
				y,
				id,
			} = square;

			context.clearRect(x, y, clearedSize, clearedSize);
			batch.push({
				id,
				value: 0,
			});
		}
		dispatch(setSquares(batch));
	};
	const drawHistoryMoves = (movesHistory) => {
		clearCnv();
		for (const square of movesHistory) {
			const {
				id,
				value,
			} = square;
			const {
				x,
				y,
			} = squaresCopy[square.id];

			switch (value) {
				case 0:
					context.clearRect(x, y, clearedSize, clearedSize);
					break;
				case 1:
					context.fillRect(x, y, clearedSize, clearedSize);
					break;
				case 2:
					context.clearRect(x, y, clearedSize, clearedSize);
					context.beginPath();
					context.moveTo(x + crossesCorrection, y + crossesCorrection);
					context.lineTo(x + fillSize - crossesCorrection, y + fillSize - crossesCorrection);
					context.moveTo(x + fillSize - crossesCorrection, y + crossesCorrection);
					context.lineTo(x + crossesCorrection, y + fillSize - crossesCorrection);
					context.stroke();
					context.closePath();
					break;
				default:
				//
			}
			batch.push({
				id,
				value,
			});
		}
		dispatch(setSquares(batch));
	};
	const undoHandler = () => {
		const slicedLeftMoves = moves.slice(0, currentShift - 1);
		const flattedMoves = slicedLeftMoves.flat(1);

		drawHistoryMoves(flattedMoves);
		dispatch(undo());
	};
	const redoHandler = () => {
		let slicedRightMoves = moves.slice(0, currentShift + 1);
		let flattedMoves = null;

		if (currentShift === -1) {
			slicedRightMoves = moves.slice(0, moves.length - currentShift);
		}
		flattedMoves = slicedRightMoves.flat(1);
		drawHistoryMoves(flattedMoves);
		dispatch(redo());
	};
	const clearHandler = () => {
		if (!showClearConfirmation) {
			clearCnv();
			return;
		}
		setModalVisibility(true);
	};
	const agreeHandler = () => {
		setModalVisibility(false);
		clearCnv();
		dispatch(clearCanvas());
	};
	const disagreeHandler = () => {
		setModalVisibility(false);
	};
	const clearCheckboxHandler = (e) => {
		const checked = e.target.checked;

		dispatch(toggleClearConfirmation(!checked));
	};
	return (
		<>
			<div className={styles.wrapper}>
				<button dangerouslySetInnerHTML={{ __html: `${backward}` }} onClick={undoHandler} disabled={undoIsDisabled} />
				<button dangerouslySetInnerHTML={{ __html: `${forward}` }} onClick={redoHandler} disabled={redoIsDisabled} />
				<button
					dangerouslySetInnerHTML={{ __html: `${clear}` }}
					onClick={clearHandler}
					disabled={clearIsDisabled}
				/>
			</div>
			{showClearConfirmation &&
				<Modal visible={modalIsVisible}>
					<div>
						<span>Are you sure to clear field? This can't be undone!</span>
					</div>
					<div>
						<button onClick={agreeHandler}>Yes</button>
						<button onClick={disagreeHandler}>No</button>
					</div>
					<div>
						<input type="checkbox" name="clearFieldWarning" id="clearFieldWarning" onChange={clearCheckboxHandler} />
						<label htmlFor="clearFieldWarning">Don't ask again</label>
					</div>
				</Modal>
			}
		</>
	);
};
export default ControlPanel;
