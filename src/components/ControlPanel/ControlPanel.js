import styles from "./ControlPanel.module.css";
import {backward, forward, clearCanvas} from "../../consts";
import {useDispatch, useStore} from "react-redux";
import {clear, redo, undo} from "../../features/app/appSlice";
import React, {useEffect} from "react";
import {setSquares} from "../../features/app/appSlice";
import {squareSize, squareStrokeWidth} from "../../consts";

const ControlPanel = (props) => {
	console.log('ControlPanel');
	const dispatch = useDispatch();
	const store = useStore();
	const canvas = props.canvas.current;
	let context = canvas.getContext('2d');
	const undoHandler = () => {
		const pastHistory = store.getState().app.squaresMarkupHistory.past;
		const lastItem = pastHistory[pastHistory.length - 1];
		console.log(lastItem);
		if (lastItem) {
			for (const item of lastItem) {
				const currentSquare = store.getState().app.squaresCopy[item.index];
				const { x, y } = currentSquare;
				console.log(currentSquare);
				context.clearRect(x, y, squareSize - squareStrokeWidth, squareSize - squareStrokeWidth);
			}
		}
		dispatch(undo());
		/*dispatch(setSquares());*/
	};
	const redoHandler = () => {
		dispatch(redo());
	};
	const clearHandler = () => {
		dispatch(clear());
	};
	useEffect(() => {

	});
	return (<div className={styles.wrapper}>
		<div dangerouslySetInnerHTML={{ __html: `${backward}` }} onClick={undoHandler} />
		<div dangerouslySetInnerHTML={{ __html: `${forward}` }} onClick={redoHandler} />
		<div dangerouslySetInnerHTML={{ __html: `${clearCanvas}` }} onClick={clearHandler} />
	</div>);
};
export default ControlPanel;