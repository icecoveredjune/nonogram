import {canvasStartingPoint, nonogramStrokeWidth, squareSize} from "../consts";
import digitRowsMaxLength from "../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../helpers/digitColumnsMaxLength";

const DigitsBlockFiller = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const {nonogramWidth} = props;
	const {nonogramHeight} = props;
	const digitRowMaxLength = digitRowsMaxLength();
	const digitColumnMaxLength = digitColumnsMaxLength();
	const fillRows = () => {
		context.fillRect(canvasStartingPoint.x + nonogramStrokeWidth / 2, canvasStartingPoint.y + nonogramStrokeWidth / 2, digitRowMaxLength * squareSize, nonogramHeight - nonogramStrokeWidth);
	};
	const fillColumns = () => {
		context.fillRect(canvasStartingPoint.x + nonogramStrokeWidth / 2, canvasStartingPoint.y + nonogramStrokeWidth / 2, nonogramWidth - nonogramStrokeWidth, digitColumnMaxLength * squareSize);
	};

	context.fillStyle = '#e4e4e4';
	fillRows();
	fillColumns();
	return null;
}
export default DigitsBlockFiller;