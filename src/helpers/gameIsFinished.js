import {store} from "../app/store";
import arraysEqual from "../utils/arraysEqual";

/**
 * define if user complete game right
 * @returns {boolean}
 */
function gameIsFinished() {
	const {
		filledIds,
		userFilledIds,
	} = store.getState().app;

	return arraysEqual(filledIds, userFilledIds);
}

export default gameIsFinished;