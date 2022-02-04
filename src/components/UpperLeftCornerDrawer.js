import {nonogramStrokeWidth, nonogramStrokeStyle, canvasStartingPoint, squareSize} from "../consts";
import {useSelector} from "react-redux";

const UpperLeftCornerDrawer = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const digitRowMaxLength = useSelector(state => state.app.digitRowMaxLength);
	const digitColumnMaxLength = useSelector(state => state.app.digitColumnMaxLength);

	context.fillStyle = '#f0f0f0';
	context.globalCompositeOperation = 'source-over';
	context.strokeStyle = nonogramStrokeStyle;
	context.lineWidth = nonogramStrokeWidth;
	context.fillRect(canvasStartingPoint.x, canvasStartingPoint.y, digitRowMaxLength * squareSize, digitColumnMaxLength * squareSize);
	context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, digitRowMaxLength * squareSize, digitColumnMaxLength * squareSize);
	return null;
};
export default UpperLeftCornerDrawer;