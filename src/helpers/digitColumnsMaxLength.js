import digitColumnsMarkup from "./digitColumnsMarkup";

/**
 * define digit block maximum length in vertical direction
 * @returns {number}
 */
export default function digitColumnsMaxLength() {
	const arr = digitColumnsMarkup()
		.map(markupLine => markupLine.length);

	return Math.max(...arr);
}