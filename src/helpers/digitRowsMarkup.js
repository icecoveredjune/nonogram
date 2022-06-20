import {squares} from "../consts";

/**
 *
 * @returns {array} returns matrix like [[1,3],[4,1,1]...] to mark rows with digits
 */
export default function digitRowsMarkup() {
	const arr = [];

	for (let i = 0; i < squares.length; i++) {
		let x = 0;

		arr[i] = [];
		for (let j = 0; j < squares[i].length; j++) {
			if (squares[i][j] === 1) {
				x += 1;
				while (squares[i][j + 1] === 1) {
					x += 1;
					j += 1;
				}
				arr[i].push(x);
				x = 0;
			}
		}
	}
	return arr;
}