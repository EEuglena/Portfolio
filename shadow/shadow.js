const letter = document.querySelector(".letter p");
const pointer = document.querySelector(".pointer");
const POINTER_RADIUS = 8;
const LENGTH = 8;
// const { x, y, width, height } = letter.getBoundingClientRect();
// const centerX = x + width / 2;
// const centerY = y + height / 2;
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight / 2;

const handleMouseMove = (event) => {
	const pointerX = event.pageX - POINTER_RADIUS;
	const pointerY = event.pageY - POINTER_RADIUS;
	const distanceX = centerX - pointerX;
	const distanceY = centerY - pointerY;
	const distance = (distanceX ** 2 + distanceY ** 2) ** 0.5;
	const shadowX = (distanceX / distance) * LENGTH;
	const shadowY = (distanceY / distance) * LENGTH;
	const hue =
		Math.round((Math.atan(distanceX / distanceY) / Math.PI + 0.5) * 180) +
		(distanceY > 0 ? 0 : 180);
	pointer.style.top = `${pointerY}px`;
	pointer.style.left = `${pointerX}px`;
	letter.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 0px hsl(${hue}, 100%, 60%))`;
};

document.addEventListener("mousemove", handleMouseMove);
