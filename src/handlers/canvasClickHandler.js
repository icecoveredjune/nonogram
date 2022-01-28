function canvasClickHandler(ctx, event) {
	const context = ctx;
	const x = event.offsetX;
	const y = event.offsetY;
	console.log(x)
	console.log(y)
	context.fillStyle = '#000';
	context.fillRect(139,117,20,20)
	context.fillRect(161,139,20,20)
	context.fillRect(161,117,20,20)
}
export default canvasClickHandler;