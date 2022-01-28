/* TODO
 разбраться с размером клетки (при 30 некорректная отрисовка)
 * */
const squares = [
	[
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
	],
	[
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
	],
	[
		0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
	],
	[
		0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
	],
	[
		1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0,
	],
	[
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
	],
	[
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1,
	],
	[
		0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	],
];
const canvasStartingPoint = {
	x: 50,
	y: 50,
};
const squareSize = 22; // width and height in px
const squareStrokeWidth = 2;
const nonogramStrokeWidth = 2; // nonogram stroke width
const nonogramStrokeStyle = '#000'/*'rgba(93, 173,226, 0.4)'*/;
const digitsFontSize = 14;
const digitsFont = 'serif';
const digitsColor = '#000';
export {
	squareSize,
	squares,
	nonogramStrokeWidth,
	nonogramStrokeStyle,
	canvasStartingPoint,
	squareStrokeWidth,
	digitsFontSize,
	digitsFont,
	digitsColor
};

