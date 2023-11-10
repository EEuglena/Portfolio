const mask = document.querySelector(".mask");

const handleMouseMove = (event) => {
	const { offsetX: x, offsetY: y } = event;

	mask.style.opacity = 1;
	mask.style.webkitMask = `url(circle.svg) ${x - 25}px ${
		y - 25
	}px/50px 50px no-repeat`;
};

const handleMouseOut = (event) => {
	mask.style.opacity = 0;
};

mask.addEventListener("mousemove", handleMouseMove);
mask.addEventListener("mouseout", handleMouseOut);
