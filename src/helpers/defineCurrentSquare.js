import {store} from "../app/store";
import {squareSize, nonogramStrokeWidth} from "../consts";

/**
 * define in which square was fired mouse event
 * @param ctx	current canvas context
 * @param x	x coordinate
 * @param y	y coordinate
 * @returns {null|*}	object with clicked square info {id,x,y,value}
 */
function defineCurrentSquare(ctx, x, y) {
	const context = ctx;
	const squares = store.getState().app.squares;
	const squaresPerRow = squares[0].length;
	const squaresCopy = store.getState().app.squaresCopy;
	const workspaceField = new Path2D();
	const workspaceStartX = squaresCopy[0].x;
	const workspaceStartY = squaresCopy[0].y;
	const workspaceWidth = squares[0].length * squareSize - nonogramStrokeWidth;
	const workspaceHeight = squares.length * squareSize - nonogramStrokeWidth;
	let currenSquareIndex = -1;

	context.beginPath();
	workspaceField.rect(workspaceStartX, workspaceStartY, workspaceWidth, workspaceHeight);

	context.closePath();
	if (context.isPointInPath(workspaceField, x, y)) {
		currenSquareIndex = Math.trunc((x - workspaceStartX) / squareSize) + Math.trunc((y - workspaceStartY) / squareSize) * squaresPerRow;
		return squaresCopy[currenSquareIndex];
	}
	return null;
}

export default defineCurrentSquare;