/*
 * TODO
 * 1) split this on components to avoid redraw entire canvas when working field changed and rename to Nonogram
 * */
import {nonogramStrokeWidth, squareSize, nonogramStrokeStyle} from "../consts";
import React, {useRef, useEffect} from "react";
import {canvasStartingPoint} from "../consts";
import {squareStrokeWidth} from "../consts";
import digitRowsMaxLength from "../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../helpers/digitColumnsMaxLength";
import digitRowsMarkup from "../helpers/digitRowsMarkup";
import digitColumnsMarkup from "../helpers/digitColumnsMarkup";
import {digitsFont} from "../consts";
import {digitsColor} from "../consts";
import {digitsFontSize} from "../consts";
import canvasClickHandler from "../handlers/canvasClickHandler";

const Nonogram = (props) => {
	const canvasRef = useRef(null);
	const {squaresMarkup} = props;
	const squaresPerRow = squaresMarkup[0].length; // number of squares in a row
	const squaresPerColumn = squaresMarkup.length; // number of squares in a column
	const digitRowMaxLength = digitRowsMaxLength();
	const digitColumnMaxLength = digitColumnsMaxLength();
	/*const nonogramWidth = (squaresPerRow + 4) * squareSize ; //replace 4*/
	/*const nonogramHeight = (squaresPerColumn + 3) * squareSize; //replace 3*/
	const nonogramWidth = (squaresPerRow + digitRowMaxLength) * (squareSize - squareStrokeWidth) + (squaresPerRow + digitRowMaxLength - 1) * squareStrokeWidth + nonogramStrokeWidth;
	const nonogramHeight = (squaresPerColumn + digitColumnMaxLength) * (squareSize - squareStrokeWidth) + (squaresPerColumn + digitColumnMaxLength - 1) * squareStrokeWidth + nonogramStrokeWidth;
	const drawCanvas = (ctx) => {
		const context = ctx;

		context.lineWidth = nonogramStrokeWidth;
		context.strokeStyle = nonogramStrokeStyle;
		context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, nonogramWidth, nonogramHeight);
	};
	const drawRows = (ctx) => {
		const context = ctx;
		/*
		 *	taking squares array length in one column, adding digits array length and subtraction 1, because count of lines
		 * less than count of squares by one
		 * */
		const linesCount = (squaresPerColumn + digitColumnMaxLength) - 1; // replace +3
		const x = canvasStartingPoint.x + nonogramStrokeWidth / 2;
		let y = canvasStartingPoint.y;

		context.lineWidth = 2;
		for (let i = 0; i < linesCount; i++) {
			context.beginPath();
			context.strokeStyle = '#BFC9CA';
			// mark control lines such as digits block border and each block border with five squares
			if ((i + 1 - digitColumnMaxLength) % 5 === 0) {
				context.strokeStyle = nonogramStrokeStyle;
			}
			y += squareSize;
			context.moveTo(x, y);
			context.lineTo(canvasStartingPoint.x + nonogramWidth - nonogramStrokeWidth / 2, y);
			context.stroke();
		}
	};
	const drawColumns = (ctx) => {
		const context = ctx;
		/*
		 * taking squares array length in one row, adding digits array length and subtraction 1, because count of lines
		 * less than count of squares by one
		 * */
		const linesCount = (squaresPerRow + digitRowMaxLength) - 1; // replace +4
		const y = canvasStartingPoint.y + nonogramStrokeWidth / 2;
		let x = canvasStartingPoint.x;

		context.lineWidth = 2;
		ctx.globalCompositeOperation = 'multiply';
		for (let i = 0; i < linesCount; i++) {
			context.beginPath();
			context.strokeStyle = '#BFC9CA';
			// mark control lines such as digits block border and each block border with five squares
			if ((i + 1 - digitRowMaxLength) % 5 === 0) {
				context.strokeStyle = nonogramStrokeStyle;
			}
			x += squareSize;
			context.moveTo(x, y);
			context.lineTo(x, canvasStartingPoint.y + nonogramHeight - nonogramStrokeWidth / 2);
			context.stroke();
		}
	};
	const drawUpperLeftCorner = (ctx) => {
		const context = ctx;

		context.fillStyle = '#f0f0f0';
		ctx.globalCompositeOperation = 'source-over';
		context.strokeStyle = nonogramStrokeStyle;
		context.lineWidth = nonogramStrokeWidth;

		context.fillRect(canvasStartingPoint.x, canvasStartingPoint.y, digitRowMaxLength * squareSize, digitColumnMaxLength * squareSize);
		context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, digitRowMaxLength * squareSize, digitColumnMaxLength * squareSize);
	};
	const fillDigitsBlock = (ctx) => {
		const context = ctx;
		context.fillStyle = '#e4e4e4';
		const fillRows = () => {
			context.fillRect(canvasStartingPoint.x + nonogramStrokeWidth / 2, canvasStartingPoint.y + nonogramStrokeWidth / 2, digitRowMaxLength * squareSize, nonogramHeight - nonogramStrokeWidth);
		};
		const fillColumns = () => {
			context.fillRect(canvasStartingPoint.x + nonogramStrokeWidth / 2, canvasStartingPoint.y + nonogramStrokeWidth / 2, nonogramWidth - nonogramStrokeWidth, digitColumnMaxLength * squareSize);
		};

		fillRows();
		fillColumns();
	};
	const drawDigitsInRows = (ctx) => {
		const context = ctx;
		const digitsMarkup = digitRowsMarkup();

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
			/*context.fillStyle = 'red';
			 context.fillRect(x, y, 1, 1);*/
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
				/*context.fillRect(squareCenterX, squareCenterY, 1, 1);*/
				context.fillText(`${number}`, squareCenterX, squareCenterY);
			}
		}
	};
	const drawDigitsInColumns = (ctx) => {
		const context = ctx;
		const digitsMarkup = digitColumnsMarkup();

		for (let i = 0; i < digitsMarkup.length; i++) {
			/*
			 *	{x} and {y} are starting coordinates for each square, {x} shifted by square size amount (except first square),
			 * 	bcs we move in horizontal direction from left to right
			 **/
			const x = i * squareSize + canvasStartingPoint.x + nonogramStrokeWidth / 2 + digitRowMaxLength * squareSize;
			const y = canvasStartingPoint.y - nonogramStrokeWidth + digitColumnMaxLength * squareSize;
			/*context.fillStyle = 'red';
			 context.fillRect(x, y, 1, 1);*/
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
				/*context.fillStyle = 'red';
				 context.fillRect(squareCenterX, squareCenterY, 1, 1);*/
				context.fillText(`${number}`, squareCenterX, squareCenterY);
			}
		}
	};
	useEffect(() => {
		const functionsArray = [
			drawCanvas,
			fillDigitsBlock,
			drawRows,
			drawColumns,
			drawUpperLeftCorner,
			drawDigitsInRows,
			drawDigitsInColumns,
		];
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		console.log('updated/mounted');

		for (const fn of functionsArray) {
			fn(context);
		}
		context.fillStyle = 'red';
		context.fillRect(canvasStartingPoint.x, canvasStartingPoint.y, 1, 1);
		canvas.addEventListener('click', canvasClickHandler.bind(this, context));
	}, []);
	return (
		<canvas
			ref={canvasRef}
			width="500px"
			height="500px">
			Your browser doesn't support canvas
		</canvas>
	);
};

export default Nonogram;