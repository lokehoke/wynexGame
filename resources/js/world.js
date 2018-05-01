'use strict';
class World {
	constructor(state) {
		this.state = state;
		this.size = getSize();

		function getSize () {
			let widthBlocks = Math.floor(window.innerWidth / GLOBAL_SETTING.sizeBlock.width);
			let heightBlocks = Math.floor(window.innerHeight / GLOBAL_SETTING.sizeBlock.height);
			return {
				widthBlocks: widthBlocks,
				heightBlocks: heightBlocks
			};
		}
	}

	renderWorld() {
		let state = this.state;
		let size = this.size;
		let bias = null;
		if ((bias = state.getBias(true)) === null) {
			let world = getEmptyWorld();
			rendersBlocks(world, state, size);
			deliteOldWorld();
			pushNewWorld(world);
		} else if (canIBias(size, state, bias) === true) {
			biasRender(state, size, bias);
			this.state.changeStartPointWatch(bias);
		}
		return true;

		function canIBias(size, state, bais) {
			let startPointWatch = state.getStartPiointWatch();
			let pointWotch = state.getPiointWatch();
			if (
			(((startPointWatch.x === 0 || startPointWatch.x === GLOBAL_SETTING.numBlocks.height - size.heightBlocks)
				&&
			(pointWotch.x < Math.floor(size.heightBlocks / 2) || pointWotch.x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2) - 1))
				&&
			(bais === 'up' || bais === 'down'))
			||
			((startPointWatch.y === 0 || startPointWatch.y === GLOBAL_SETTING.numBlocks.width - size.widthBlocks)
				&&
			(pointWotch.y < Math.floor(size.widthBlocks / 2) || pointWotch.y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2) - 1))
				&&
			(bais === 'left' || bais === 'right')))
			){
				return false;
			}
			return true;
		}

		function getEmptyWorld() {
			let world = document.createElement('div');
			world.className = 'world';
			return world;
		}

		function deliteOldWorld() {
			let children = document.querySelector('.wrapper').children[0];
			if (children !== undefined) {
				children.remove();
			}
			return true;
		}

		function pushNewWorld(world) {
			document.querySelector('.wrapper').appendChild(world);
			return true;
		}

		function rendersBlocks(world, state, size) {
			let x = state.getStartPiointWatch().x;
			let y = state.getStartPiointWatch().y;
			let place = state.getAllPlace();
			for (let i = x; i < x + size.heightBlocks; i++) {
				let row = document.createElement('div');
				row.className = 'row';
				for (let j = y; j < y + size.widthBlocks; j++) {
					let block = getBlock(place[i][j]);
					row.appendChild(block);
				}
				world.appendChild(row);
			}

			return true;
		}

		function biasRender(state, size, bias) {
			let place = state.getAllPlace();
			let oldWorld = document.querySelector('.world');
			let startPointWatch = state.getStartPiointWatch();
			switch(bias) {
				case 'right':
					biasRight();
					break;
				case 'left':
					biasLeft();
					break;
				case 'up':
					biasUp();
					break;
				case 'down':
					biasDown();
					break;
			}
			state.changePointWatch(bias);
			return true;

			function biasDown() {
				oldWorld.children[0].remove();
				let row = document.createElement('div');
				row.className = 'row';
				let y = state.getStartPiointWatch().y;
				for (let i = y; i < y + size.widthBlocks; i++) {
					let block = getBlock(place[state.getStartPiointWatch().x+size.heightBlocks][i]);
					row.appendChild(block);
				}
				oldWorld.appendChild(row);
			}

			function biasUp() {
				oldWorld.children[oldWorld.children.length-1].remove();
				let row = document.createElement('div');
				row.className = 'row';
				let y = state.getStartPiointWatch().y;
				for (let i = y; i < y + size.widthBlocks; i++) {
					let block = getBlock(place[state.getStartPiointWatch().x-1][i]);
					row.appendChild(block);
				}
				oldWorld.insertBefore(row, oldWorld.children[0]);
			}

			function biasRight() {
				let x = state.getStartPiointWatch().x;
				for (let i = x; i < x + size.heightBlocks; i++) {
					let block = getBlock(place[i][state.getStartPiointWatch().y+size.widthBlocks]);
					oldWorld.children[i-x].children[0].remove();
					oldWorld.children[i-x].appendChild(block)
				}
			}

			function biasLeft() {
				let x = state.getStartPiointWatch().x;
				for (let i = x; i < x + size.heightBlocks; i++) {
					let block = getBlock(place[i][state.getStartPiointWatch().y-1]);
					oldWorld.children[i-x].children[oldWorld.children[i-x].children.length-1].remove();
					oldWorld.children[i-x].insertBefore(block, oldWorld.children[i-x].children[0]);
				}
			}
		}

		function getBlock(val) {
			let block = document.createElement('div');
			block.className = 'standartPlace';
			switch(val) {
				case 1:
					getDirt(block);
					break;
				case 2:
					getBorder(block);
					break;
				case 3:
			 		getChest(block);
			 		break;
				default:
			 		getDirt(block);
					getCreature(block);
			 		break;
			}
			return block;

			function getDirt(block) {
				block.className += ' dirt';
			}

			function getBorder(block) {
				block.className += ' border';
			}

			function getChest(block) {
				block.className += ' chest';
			}

			function getCreature(block) {
				if (val.type === 'player') {
					getPlayer(block);
				} else if (val.type === 'enemy') {
					getEnemy(block);
				}

				function getPlayer(block) {
					let div = document.createElement('div');
					div.className = 'magePlayer';
					block.appendChild(div);
				}

				function getEnemy(block) {
					let div = document.createElement('div');
					div.className = 'slimeEnemy';
					block.appendChild(div);
				}
			}
		}
	}
}