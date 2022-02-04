import digitColumnsMarkup from "../helpers/digitColumnsMarkup";
import {
	squareStrokeWidth,
	canvasStartingPoint,
	nonogramStrokeWidth,
	squareSize,
} from "../consts";
import digitColumnsMaxLength from "../helpers/digitColumnsMaxLength";
import {useSelector} from "react-redux";

const DigitsInColumnsDrawer = (props) => {
	const context = props.canvasRef.current.getContext('2d');
	const digitsMarkup = digitColumnsMarkup();
	const digitColumnMaxLength = digitColumnsMaxLength();
	const digitRowMaxLength = useSelector(state => state.app.digitRowMaxLength);

	for (let i = 0; i < digitsMarkup.length; i++) {
		/*
		 *	{x} and {y} are starting coordinates for each square, {x} shifted by square size amount (except first square),
		 * 	bcs we move in horizontal direction from left to right
		 **/
		const x = i * squareSize + canvasStartingPoint.x + nonogramStrokeWidth / 2 + digitRowMaxLength * squareSize;
		const y = canvasStartingPoint.y - nonogramStrokeWidth + digitColumnMaxLength * squareSize;

		/*
		 *	moving from left to right (in canvas) and fill squares with digits until array elements are available
		 *  starting from end to start in each sub-array
		 * 	{x} shifted from left to right by square size amount (except first iteration - only half of size)
		 * 	{y} shifted up for each iteration by square size
		 * 	{z} is iteration counter started from 1
		 * */
		let squareCenterX = x + (squareSize - squareStrokeWidth) / 2;
		let squareCenterY = y - (squareSize - squareStrokeWidth) / 2;

		for (let j = digitsMarkup[i].length, z = 1; j !== 0; j--, z++) {
			const number = digitsMarkup[i][j - 1];

			if (z !== 1) {
				squareCenterY = squareCenterY - squareSize;
			}

			context.fillText(`${number}`, squareCenterX, squareCenterY);
		}
	}
	return null;
};
export default DigitsInColumnsDrawer;