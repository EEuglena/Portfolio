const canvas = document.querySelector("canvas");
const playButton = document.querySelector(".play");
const stopButton = document.querySelector(".stop");
const context = canvas.getContext("2d");
const RADIUS = 45;
let LENGTH = 45;
const Vx = 0.1;
const GROUND = 300;

let startTime = Date.now();
let points = [];
let playing = false;
let interval;
let isClicking = false;

const initiateCanvas = () => {
	startTime = Date.now();
	context.strokeStyle = "#2c1a10";
	context.fillStyle = "#2c1a10";
	points = [];
};

const drawCanvas = () => {
	console.log(Date.now());
	const t = Date.now() - startTime;
	const center = [55 + Vx * t, GROUND - RADIUS];
	const theta = (Vx * t) / RADIUS - Math.PI / 2;
	const point = [
		center[0] + LENGTH * Math.cos(theta),
		center[1] + LENGTH * Math.sin(theta),
	];

	if (theta > (3 / 2) * Math.PI) return false;

	points.push(point);

	const clearCanvas = () => {
		context.clearRect(0, 0, 400, 400);
	};

	const drawGround = () => {
		context.beginPath();
		context.moveTo(0, GROUND);
		context.lineTo(400, GROUND);
		context.closePath();
		context.stroke();
	};

	const drawCircle = () => {
		context.beginPath();
		context.arc(center[0], center[1], RADIUS, 0, 2 * Math.PI, true);
		context.closePath();
		context.stroke();
	};

	const drawPoint = () => {
		context.beginPath();
		context.arc(point[0], point[1], playing ? 2 : 6, 0, 2 * Math.PI, true);
		context.closePath();
		context.fill();
	};

	const drawRadius = () => {
		context.beginPath();
		context.moveTo(center[0], center[1]);
		context.lineTo(point[0], point[1]);
		context.closePath();
		context.stroke();
	};

	const drawPath = () => {
		if (points) {
			for (let index = 1; index < points.length; index++) {
				context.beginPath();
				context.moveTo(points[index - 1][0], points[index - 1][1]);
				context.lineTo(points[index][0], points[index][1]);
				context.closePath();
				context.stroke();
			}
		}
	};

	clearCanvas();
	drawGround();
	drawCircle();
	drawPoint();
	drawRadius();
	drawPath();

	return true;
};

const handlePlay = () => {
	if (!playing) {
		playing = true;
		initiateCanvas();
		interval = setInterval(() => {
			playing = drawCanvas();
			if (!playing) {
				clearInterval(interval);
			}
		}, 20);
	}
};

const handleStop = () => {
	playing = false;
	if (interval) clearInterval(interval);
	initiateCanvas();
	drawCanvas();
};

const handleCanvasMouseDown = (event) => {
	const point = [55, GROUND - RADIUS - LENGTH];
	const distance =
		((point[0] - event.offsetX) ** 2 + (point[1] - event.offsetY) ** 2) **
		0.5;
	if (distance <= 6) {
		isClicking = true;
		console.log("Clicked");
	}
};

const handleCanvasMouseMove = (event) => {
	if (isClicking && points.length <= 1) {
		const distance = GROUND - RADIUS - event.offsetY;
		LENGTH = distance;
		initiateCanvas();
		drawCanvas();
	}
};

const handleCanvasMouseUp = (event) => {
	isClicking = false;
};

drawCanvas();
playButton.addEventListener("click", handlePlay);
stopButton.addEventListener("click", handleStop);
canvas.addEventListener("mousedown", handleCanvasMouseDown);
canvas.addEventListener("mousemove", handleCanvasMouseMove);
document.addEventListener("mouseup", handleCanvasMouseUp);
