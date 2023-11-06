const COR = 0.9;
const TICK = 10;
const GRAVITY = 0.005;
const WIDTH = 480;
const HEIGHT = 480;
const LIMIT = GRAVITY * TICK * 12;
const MAX_NUM = 10;
const container = document.querySelector(".container");
const balls = [];

const createBallDiv = (pageX, pageY) => {
	const anchorX = container.getBoundingClientRect().x;
	const anchorY = container.getBoundingClientRect().y;
	const x = pageX - anchorX;
	const y = pageY - anchorY;
	const radius = Math.round(Math.random() * 30 + 10);
	const ballDiv = document.createElement("div");
	const h = Math.round(Math.random() * 360);
	ballDiv.className = "ball";
	ballDiv.style.width = `${2 * radius}px`;
	ballDiv.style.height = `${2 * radius}px`;
	ballDiv.style.top = `${y}px`;
	ballDiv.style.left = `${x}px`;
	ballDiv.style.backgroundColor = `hsla(${h}, 100%, 65%, 0.8)`;
	container.appendChild(ballDiv);
	const ball = { y0: y, y: 0, vy: 0, ay: GRAVITY, ballDiv };
	balls.push(ball);
	const interval = setInterval(() => {
		if (ball.y0 + ball.y + ball.vy * TICK > HEIGHT - radius) {
			if (ball.vy <= LIMIT) {
				ball.vy = 0;
				ball.ay = 0;
			} else {
				ball.vy *= -COR;
			}
		}
		ball.y += ball.vy * TICK;
		ball.vy += ball.ay * TICK;
		ballDiv.style.transform = `translate(-50%, calc(${ball.y}px - 50%))`;
	}, TICK);
	ball.interval = interval;
	if (balls.length > MAX_NUM) {
		while (balls.length > MAX_NUM) {
			const removeBall = balls.shift();
			clearInterval(removeBall.interval);
			container.removeChild(removeBall.ballDiv);
		}
	}
};
const handleClick = (event) => {
	if (event.currentTarget.className == "container") {
		createBallDiv(event.pageX, event.pageY);
	}
};

container.addEventListener("mousedown", handleClick);
