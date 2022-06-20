import {squares} from "../consts";

/**
 * define id's of squares that must be filled with "1" value
 * @returns {*[]}	array of id's [6,10,23...]
 */
function defineFilledSquaresIds() {
	const tempArr = [];
	let z = 0; // counter for id increment

	for (let i = 0; i < squares.length; i++) {
		for (let j = 0; j < squares[i].length; j++) {
			if(squares[i][j] === 1) {
				tempArr.push(z);
			}
			z += 1;
		}
	}
	return tempArr;
}
export default defineFilledSquaresIds;