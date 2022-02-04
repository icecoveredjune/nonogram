/* TODO
 разбраться с размером клетки (при 30 некорректная отрисовка)
 * */
// @formatter:off
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
// @formatter:on
const canvasStartingPoint = {
	x: 50,
	y: 50,
};
const squareSize = 22; // width and height in px
const squareStrokeWidth = 2;
const nonogramStrokeWidth = 2; // nonogram stroke width
const nonogramStrokeStyle = '#000';
const controlLineStrokeStyle = '#8f8f8f'/*'#505050'*/;
const digitsFontSize = 14;
const digitsFont = 'serif';
const digitsColor = '#000';
// squares padding when drawing crosses, px
const crossesCorrection = 2;
const backward = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
	</svg>`;
const forward = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
	</svg>`;
const clearCanvas = `
	<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>`;
export {
	squareSize,
	squares,
	nonogramStrokeWidth,
	nonogramStrokeStyle,
	controlLineStrokeStyle,
	canvasStartingPoint,
	squareStrokeWidth,
	digitsFontSize,
	digitsFont,
	digitsColor,
	crossesCorrection,
	backward,
	forward,
	clearCanvas,
};

