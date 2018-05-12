'use strict';
function getWorldClass()  {
	let firstFindSize = true;
	let sizeG = {};
	class World {
		constructor(state) {
			this.state = state;
			this.size = World.getSize();
		}

		static getSize() {
			if (firstFindSize === true){
				let widthBlocks = Math.floor(window.innerWidth / GLOBAL_SETTING.sizeBlock.width);
				let heightBlocks = Math.floor(window.innerHeight / GLOBAL_SETTING.sizeBlock.height);
				firstFindSize = false;
				return sizeG = {
					widthBlocks: (widthBlocks < GLOBAL_SETTING.numBlocks.width ? widthBlocks : GLOBAL_SETTING.numBlocks.width),
					heightBlocks: (heightBlocks < GLOBAL_SETTING.numBlocks.height ? heightBlocks : GLOBAL_SETTING.numBlocks.height)
				};
			} else {
				return sizeG;
			}
		}

		static makeAroayWihtEnemy(num) {
			let size = World.getSize();
			let creatures = [];
			for (let i = 0; i < num; i++) {
				let newCreature = {};
				newCreature.type = 'slime';
				newCreature.x = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.height - 2)) + 1;
				newCreature.y = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.width - 2)) + 1;
				creatures[i] = newCreature;
			}
			return creatures;
		}

		renderWorld() {
			let state = this.state;
			let size = this.size;
			let bias = state.getBias(true);
			if (bias === null) {
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
				(((startPointWatch.x === 0
						||
				startPointWatch.x === GLOBAL_SETTING.numBlocks.height - size.heightBlocks)
					&&
				(pointWotch.x < Math.floor(size.heightBlocks / 2)
						||
				pointWotch.x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2)))
					&&
				(bais === 'up'
						||
				bais === 'down'))
				||
				((startPointWatch.y === 0
						||
				startPointWatch.y === GLOBAL_SETTING.numBlocks.width - size.widthBlocks)
					&&
				(pointWotch.y < Math.floor(size.widthBlocks / 2)
						||
				pointWotch.y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2)))
					&&
				(bais === 'left'
						||
				bais === 'right')))
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
						let block = getBlock(place[i][j], {newX:i,newY:j});
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
					let row = document.createElement('div');
					row.className = 'row';
					let y = state.getStartPiointWatch().y;
					for (let i = y; i < y + size.widthBlocks; i++) {
						let x = state.getStartPiointWatch().x+size.heightBlocks;
						let block = getBlock(place[x][i], {newX:x,newY:i}, true);
						row.appendChild(block);
						if (place[x - size.heightBlocks][i].isCreature === true) {
							visableHideCreature(place[x - size.heightBlocks][i]);
						}
					}
					oldWorld.children[0].remove();
					oldWorld.appendChild(row);
				}

				function biasUp() {
					let row = document.createElement('div');
					row.className = 'row';
					let y = state.getStartPiointWatch().y;
					for (let i = y; i < y + size.widthBlocks; i++) {
						let x = state.getStartPiointWatch().x-1;
						let block = getBlock(place[x][i], {newX:x,newY:i}, true);
						row.appendChild(block);
						if (place[x + size.heightBlocks][i].isCreature === true) {
							visableHideCreature(place[x + size.heightBlocks][i]);
						}
					}
					oldWorld.children[oldWorld.children.length-1].remove();
					oldWorld.insertBefore(row, oldWorld.children[0]);
				}

				function biasRight() {
					let x = state.getStartPiointWatch().x;
					for (let i = x; i < x + size.heightBlocks; i++) {
						let y = state.getStartPiointWatch().y + size.widthBlocks;
						let block = getBlock(place[i][y], {newX:i,newY:y}, true);
						oldWorld.children[i-x].children[0].remove();
						if (place[i][y - size.widthBlocks].isCreature === true) {
							visableHideCreature(place[i][y - size.widthBlocks]);
						}
						oldWorld.children[i-x].appendChild(block)
					}
				}

				function biasLeft() {
					let x = state.getStartPiointWatch().x;
					for (let i = x; i < x + size.heightBlocks; i++) {
						let y = state.getStartPiointWatch().y - 1;
						let block = getBlock(place[i][y], {newX:i,newY:y}, true);
						if (place[i][y + size.widthBlocks].isCreature === true) {
							visableHideCreature(place[i][y + size.widthBlocks]);
						}
						oldWorld.children[i-x].children[oldWorld.children[i-x].children.length-1].remove();
						oldWorld.children[i-x].insertBefore(block, oldWorld.children[i-x].children[0]);
					}
				}
			}

			function getBlock(blockObject, coor, bias) {
				let block = document.createElement('div');
				if (blockObject.nesting === true) {
					block.className = 'standartPlace ' + blockObject.classNameBackBlock;
					if (blockObject.isCreature === true) {
						getCreature(block, blockObject, coor);
						blockObject.DOMObject = block;
					}
					changeVisableCreature();
				} else {
					block.className = 'standartPlace ' + blockObject.classNameCSS;
				}
				return block;

				function getCreature(block, creature, coor) {
					let div = document.createElement('div');
					div.className = creature.classNameCSS;
					block.appendChild(div);
					if (bias === true) {
						creature.visable.was = false;
						creature.visable.now = true;
					}
					return true;
				}

				function changeVisableCreature() {
					blockObject.visable = {
						was: blockObject.visable.now,
						now: true
					}
					return true;
				}
			}

			function visableHideCreature(creature) {
				creature.visable.was = true;
				creature.visable.now = false;
			}
		}
	}
	return World;
}

let World = getWorldClass();