import {squares} from "../consts";

/**
 *
 * @returns {array} returns matrix like [[1,3],[4,1,1]...] to mark rows with digits
 */
export default function digitColumnsMarkup() {
	const arr = [];

	for (let i = 0; i < squares[0].length; i++) {
		let x = 0;

		arr[i] = [];
		for (let j = 0; j < squares.length; j++) {
			if (squares[j][i] === 1) {
				x += 1;
				while (squares[j+1] && squares[j+1][i] === 1) {
					x += 1;
					j += 1;
				}
				arr[i].push(x);
				x = 0;
			}
		}
	}
	/*console.log('columns markup ', arr)*/
	return arr;
}