import digitRowsMarkup from "./digitRowsMarkup";

/**
 * define digit block maximum length in horizontal direction
 * @returns {number}
 */
export default function digitRowsMaxLength() {
	const arr = digitRowsMarkup()
		.map(markupLine => markupLine.length);

	return Math.max(...arr);
}