import {createSlice} from '@reduxjs/toolkit';
import defineFilledSquaresIds from "../../helpers/defineFilledSquaresIds";
import digitRowsMaxLength from "../../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../../helpers/digitColumnsMaxLength";
import mappingSquares from "../../helpers/mappingSquares";
import objDeepClone from "../../utils/objDeepClone";
import {squares} from "../../consts";

const digitRowMaxLength = digitRowsMaxLength();
const digitColumnMaxLength = digitColumnsMaxLength();
const mappedSquares = mappingSquares(digitRowMaxLength, digitColumnMaxLength);
const filledIds = defineFilledSquaresIds();
const initialState = {
	canvasCtxIsAvailable: false,
	showClearConfirmation: true,
	gamePassed: false, // show if game complete right
	filledIds, // initial id's of squares marked with value "1"
	userFilledIds: [], // users marked id's with value "1"
	squares,
	moves: [], // user's moves history
	currentShift: 0,
	squaresCopy: mappedSquares,
	digitRowMaxLength,
	digitColumnMaxLength,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		finishGame: (state) => {
			state.gamePassed = true;
		},
		toggleClearConfirmation: (state, action) => {
			state.showClearConfirmation = action.payload;
		},
		undo: (state) => {
			state.currentShift -= 1;
			state.userFilledIds.length = 0;
			const ids = state.moves.slice(0, state.currentShift - 1)
				.flat(1)
				.map(move => move.id);

			for (const id of ids) {
				state.userFilledIds.push(id);
			}
		},
		redo: (state) => {
			state.currentShift += 1;
			state.userFilledIds.length = 0;
			const ids = state.moves.slice(0, state.moves.length + state.currentShift)
				.flat(1)
				.map(move => move.id);

			for (const id of ids) {
				state.userFilledIds.push(id);
			}
		},
		clearCanvas: (state) => {
			state.moves.length = 0;
			state.userFilledIds.length = 0;
		},
		saveFilledIds: (state, action) => {
			for (const id of action.payload) {
				state.userFilledIds.push(id);
			}
		},
		deleteFilledIds: (state, action) => {
			const newIds = state.userFilledIds.filter(id => !action.payload.includes(id));

			state.userFilledIds = [...newIds];
		},
		setSquares: (state, action) => {
			if (action.payload.length) {
				for (const square of action.payload) {
					state.squaresCopy[square.id].value = square.value;
				}
			}
		},
		saveMove: (state, action) => {
			state.moves.push(objDeepClone(action.payload));
		},
		clearMovesHistory: (state) => {
			state.moves.length = 0;
		},
		setCanvasCtxIsAvailable: (state) => {
			state.canvasCtxIsAvailable = true;
		},
		zeroingCurrentShift: (state) => {
			state.moves.splice(state.currentShift);
			state.currentShift = 0;
			state.userFilledIds.length = 0;
			for (const move of state.moves) {
				state.userFilledIds.push(move[0].id);
			}
		},
	},
});
export const {
	setSquares,
	saveMove,
	undo,
	redo,
	clearCanvas,
	finishGame,
	zeroingCurrentShift,
	setCanvasCtxIsAvailable,
	toggleClearConfirmation,
	saveFilledIds,
	deleteFilledIds,
} = appSlice.actions;
export default appSlice.reducer;
