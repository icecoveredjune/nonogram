import {createSlice} from '@reduxjs/toolkit';
import {squares} from "../../consts";
import digitRowsMaxLength from "../../helpers/digitRowsMaxLength";
import digitColumnsMaxLength from "../../helpers/digitColumnsMaxLength";
import mappingSquares from "../../helpers/mappingSquares";
import objDeepClone from "../../helpers/objDeepClone";

const digitRowMaxLength = digitRowsMaxLength();
const digitColumnMaxLength = digitColumnsMaxLength();
const mappedSquares = mappingSquares(digitRowMaxLength, digitColumnMaxLength);

const initialState = {
	canvasCtxAvailable: false,
	squares,
	squaresCopy: mappedSquares,
	squaresMarkupHistory: {
		past: [],
		present: [],
		future: [],
	},
	digitRowMaxLength,
	digitColumnMaxLength,
	value: 0,
};

export const appSlice = createSlice({
	name: 'app',
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		undo: (state) => {
			console.log('undo')
			state.squaresMarkupHistory.past.pop();
		},
		redo: (state) => {
			console.log('redo')
		},
		clear: (state) => {
			console.log('clear')
		},
		setSquares: (state, action) => {
			for (const square of action.payload) {
				state.squaresCopy[square.index].value = square.value;
			}
		},
		saveMarkup: (state, action) => {
			state.squaresMarkupHistory.present.push(objDeepClone(action.payload));
			state.squaresMarkupHistory.past.push(objDeepClone(action.payload));
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action) => {
			state.value += action.payload;
		},
		setCanvasCtxIsAvailable: (state) => {
			state.canvasCtxAvailable = true;
		}
	},
});
export const {
	increment,
	setSquares,
	saveMarkup,
	undo,
	redo,
	clear,
	setCanvasCtxIsAvailable
} = appSlice.actions;
export default appSlice.reducer;
