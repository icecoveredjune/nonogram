import {canvasStartingPoint, nonogramStrokeWidth, squareSize,controlLineStrokeStyle} from "../consts";
import {useSelector} from "react-redux";

const ColumnsDrawer = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const {nonogramHeight} = props;
	const digitRowMaxLength = useSelector(state => state.app.digitRowMaxLength);
	const squaresMarkup = useSelector(state => state.app.squares);
	const squaresPerRow = squaresMarkup[0].length; // number of squares in a row
	/*
	* taking squares array length in one row, adding digits array length and subtraction 1, because count of lines
	* less than count of squares by one
	* */
	const linesCount = (squaresPerRow + digitRowMaxLength) - 1; // replace +4
	const y = canvasStartingPoint.y + nonogramStrokeWidth / 2;
	let x = canvasStartingPoint.x;

	context.lineWidth = 2;
	context.globalCompositeOperation = 'darken';
	for (let i = 0; i < linesCount; i++) {
		context.beginPath();
		context.strokeStyle = '#BFC9CA';
		// mark control lines such as digits block border and each block border with five squares
		if ((i + 1 - digitRowMaxLength) % 5 === 0) {
			context.strokeStyle = controlLineStrokeStyle;
		}
		x += squareSize;
		context.moveTo(x, y);
		context.lineTo(x, canvasStartingPoint.y + nonogramHeight - nonogramStrokeWidth / 2);
		context.stroke();
	}
	return null;
}
export default ColumnsDrawer;