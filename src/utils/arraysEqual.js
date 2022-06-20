// this might not work if array contains object, but in game context we compare numbers
function arraysEqual(a, b) {
	const sortedA = [...a].sort((x,y) => x-y);
	const sortedB = [...b].sort((x,y) => x-y);

	return JSON.stringify(sortedA) === JSON.stringify(sortedB);
}
export default arraysEqual;