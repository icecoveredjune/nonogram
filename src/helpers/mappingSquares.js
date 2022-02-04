/*
 TODO:
 1) Надо ли отнимать единицу и морочиться с отступами, мб смена цветов контрольных линий помогла?
 * */
import {squares, nonogramStrokeWidth, canvasStartingPoint, squareSize} from "../consts";

/**
 *
 * @returns {[]} array of objects [{x:139,y:117,id:0,value:0},...]
 */
function mappingSquares(digitRowMaxLength, digitColumnMaxLength) {
	const tempArr = [];
	const startedX = canvasStartingPoint.x + nonogramStrokeWidth / 2 + digitRowMaxLength * squareSize;
	const startedY = canvasStartingPoint.y + nonogramStrokeWidth / 2 + digitColumnMaxLength * squareSize;
	let z = 0; // counter for id increment

	for (let i = 0; i < squares.length; i++) {
		/*
		 increase started y coordinates by square size amount because we shifting by the end of each iteration to the left
		 and down.
		 * */
		const y = startedY + i * squareSize;

		for (let j = 0; j < squares[i].length; j++) {
			tempArr.push({
				id: i + z,
				value: 0,
				x: startedX + squareSize * j,
				y,
			});
			if (j + 1 !== squares[i].length) {
				z += 1;
			}
		}
	}
	return tempArr;
}

export default mappingSquares;