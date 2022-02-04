import {canvasStartingPoint, nonogramStrokeWidth, squareSize,controlLineStrokeStyle} from "../consts";
import {useSelector} from "react-redux";

const RowsDrawer = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const {nonogramWidth} = props;
	const squaresMarkup = useSelector(state => state.app.squares);
	const squaresPerColumn = squaresMarkup.length; // number of squares in a column
	const digitColumnMaxLength = useSelector(state => state.app.digitColumnMaxLength);
	/*
	 *	taking squares array length in one column, adding digits array length and subtraction 1, because count of lines
	 * less than count of squares by one
	 * */
	const linesCount = (squaresPerColumn + digitColumnMaxLength) - 1; // replace +3
	const x = canvasStartingPoint.x + nonogramStrokeWidth / 2;
	let y = canvasStartingPoint.y;

	context.lineWidth = 2;
	/*context.globalCompositeOperation = 'source-over';*/
	for (let i = 0; i < linesCount; i++) {
		context.beginPath();
		context.strokeStyle = '#BFC9CA';
		// mark control lines such as digits block border and each block border with five squares
		if ((i + 1 - digitColumnMaxLength) % 5 === 0) {
			/*context.globalCompositeOperation = 'multiply';*/
			context.strokeStyle = controlLineStrokeStyle;
		}
		y += squareSize;
		context.moveTo(x, y);
		context.lineTo(canvasStartingPoint.x + nonogramWidth - nonogramStrokeWidth / 2, y);
		context.stroke();
	}
	return null;
}
export default RowsDrawer;