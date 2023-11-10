const tiles = document.querySelectorAll(".tile");
const UNIT = 86;
let positions = [
	[0, 0],
	[1, 0],
	[2, 0],
	[0, 1],
	[1, 1],
	[2, 1],
	[0, 2],
	[1, 2],
];
let blank = [2, 2];

const setTiles = () => {
	// for (let i = 0; i < 8; i++) {
	// 	tiles[i].style.transform = `translate(${positions[i][0] * UNIT}px, ${
	// 		positions[i][1] * UNIT
	// 	}px)`;
	// }
	tiles.forEach(
		(tile, i) =>
			(tile.style.transform = `translate(${positions[i][0] * UNIT}px, ${
				positions[i][1] * UNIT
			}px)`)
	);
};

const moveTile = (number) => {
	if (
		(positions[number][0] == blank[0] &&
			Math.abs(positions[number][1] - blank[1]) == 1) ||
		(positions[number][1] == blank[1] &&
			Math.abs(positions[number][0] - blank[0]) == 1)
	) {
		const temp = [...blank];
		blank = [...positions[number]];
		positions[number] = temp;
	}
};

const handleTileClick = (event) => {
	if (event.currentTarget.className == "tile") {
		moveTile(parseInt(event.currentTarget.id - 1));
		setTiles();
	}
};

setTiles();

tiles.forEach((tile) => tile.addEventListener("click", handleTileClick));
