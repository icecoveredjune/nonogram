import {useEffect, useRef} from "react";

const Canvas = () => {
	const canvasRef = useRef(null);
	const drawCanvas = (ctx) => {
		const context = ctx;

		context.lineWidth = nonogramStrokeWidth;
		context.strokeStyle = nonogramStrokeStyle;
		context.strokeRect(canvasStartingPoint.x, canvasStartingPoint.y, nonogramWidth, nonogramHeight);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		console.log('updated/mounted');

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
}
export default Canvas;