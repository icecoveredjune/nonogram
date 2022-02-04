import digitRowsMarkup from "../helpers/digitRowsMarkup";
import {digitsFontSize,squareStrokeWidth, digitsFont, digitsColor,canvasStartingPoint,nonogramStrokeWidth,squareSize} from "../consts";
import {useSelector} from "react-redux";

const DigitsInRowsDrawer = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const digitsMarkup = digitRowsMarkup();
	const digitRowMaxLength = useSelector(state => state.app.digitRowMaxLength);
	const digitColumnMaxLength = useSelector(state => state.app.digitColumnMaxLength);

	context.font = `${digitsFontSize}px ${digitsFont}`;
	context.fillStyle = digitsColor;
	context.textBaseline = 'middle';
	context.textAlign = 'center';
	for (let i = 0; i < digitsMarkup.length; i++) {
		/*
		 *	{x} and {y} are starting coordinates for each square, {y} shifted by square size amount,bcs we move in
		 * 	vertical direction from top to bottom
		 **/
		const x = canvasStartingPoint.x + nonogramStrokeWidth / 2 + digitRowMaxLength * squareSize - nonogramStrokeWidth - 1;
		const y = i * squareSize + canvasStartingPoint.y + nonogramStrokeWidth / 2 + digitColumnMaxLength * squareSize;
		/*
		 *	moving from right to left (in canvas) and fill squares with digits until array elements are available
		 *  starting also from end to start in each sub-array
		 * 	{x} shifted from right to left by square size amount (except first iteration - only half of size)
		 * 	{y} shifted down for each iteration by square size
		 * 	{z} is iteration counter started from 1
		 * */
		let squareCenterX = x - (squareSize - squareStrokeWidth) / 2;
		let squareCenterY = y + (squareSize - squareStrokeWidth) / 2;

		for (let j = digitsMarkup[i].length, z = 1; j !== 0; j--, z++) {
			const number = digitsMarkup[i][j - 1];

			if (z !== 1) {
				squareCenterX = squareCenterX - squareSize;
			}
			context.fillText(`${number}`, squareCenterX, squareCenterY);
		}
	}
	return null;
};
export default DigitsInRowsDrawer;