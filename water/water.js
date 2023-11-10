const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "#1d2770";
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const GRAVITY = 0.0002;
const HEIGHT_TO_AMPLITUDE = 0.4;
const DAMPING_RATIO = 0.9;
const DAMPING_TIME = 100;
const LIFETIME = 100;
const PERIOD = 0.3;

let drops = [];
let waves = [];

const drawDrops = () => {
	drops.forEach((drop, index) => {
		const t = Date.now() - drop[2];
		const x = drop[0];
		const y = drop[1] + GRAVITY * t ** 2;
		context.beginPath();
		context.arc(x, y, 12, 0, Math.PI * 2, true);
		context.fill();
		if (y > HEIGHT / 2) {
			const wave = [x, HEIGHT / 2 - drop[1], Date.now()];
			waves.push(wave);
			drops.splice(index, 1);
		}
	});
};

const drawSurface = () => {
	context.beginPath();
	context.moveTo(WIDTH, HEIGHT / 2);
	context.lineTo(WIDTH, HEIGHT);
	context.lineTo(0, HEIGHT);
	context.lineTo(0, HEIGHT / 2);

	for (let x = 0; x <= WIDTH; x += 5) {
		let y = HEIGHT / 2;
		waves.forEach((wave, index) => {
			const t = Date.now() - wave[2];
			const T = 100 + wave[1] * PERIOD;

			if (t > DAMPING_TIME * LIFETIME) {
				waves.splice(index, 1);
			} else {
				const phi = (x - wave[0]) / WIDTH;
				const amplitude =
					wave[1] *
					HEIGHT_TO_AMPLITUDE *
					Math.cos(phi * 5) *
					Math.exp(-(phi ** 2) * 5) *
					DAMPING_RATIO ** (t / DAMPING_TIME);
				const dy = amplitude * Math.sin(t / T);
				y += dy;
			}
		});
		context.lineTo(x, y);
	}

	context.fill();
};

const handleClick = (event) => {
	if (
		event.offsetY < HEIGHT / 2 &&
		((event.offsetX - WIDTH / 2) ** 2 +
			(event.offsetY - HEIGHT / 2) ** 2) **
			0.5 <
			WIDTH ** 2 / 4
	) {
		const drop = [event.offsetX, event.offsetY, Date.now()];

		drops.push(drop);
	}
};

const changeColor = () => {
	const h = 230 + Math.sin(Date.now() / 600) * 3;
	const s = 55 + Math.sin(Date.now() / 550) * 5;
	const l = 25 + Math.sin(Date.now() / 500) * 2.5;
	context.fillStyle = `hsl(${h}, ${s}%, ${l}%)`;
};

canvas.addEventListener("click", handleClick);

setInterval(() => {
	changeColor();
	context.clearRect(0, 0, WIDTH, HEIGHT);
	drawDrops();
	drawSurface();
}, 20);
