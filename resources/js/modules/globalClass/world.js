'use strict';

const GLOBAL_SETTING = new (require('../setting/globalSetting.js'))();
const State = require('./state/state.js')

const Coor = require('../structOfDate/coordinate.js');

module.exports = class World {
	constructor(state) {
		this.state = state;
		this.size = World.getSize(state);
		this.afterWorldRenderDoing = [];
	}

	static getSize(state) {
		let firstFindSize = state.getSizeWorld().firstFindSize;

		if (firstFindSize === true){

			const widthBlocks = Math.floor(window.innerWidth / GLOBAL_SETTING.sizeBlock.width);
			const heightBlocks = Math.floor(window.innerHeight / GLOBAL_SETTING.sizeBlock.height);

			let sizeG = {
				widthBlocks: (widthBlocks < GLOBAL_SETTING.numBlocks.width ? widthBlocks : GLOBAL_SETTING.numBlocks.width),
				heightBlocks: (heightBlocks < GLOBAL_SETTING.numBlocks.height ? heightBlocks : GLOBAL_SETTING.numBlocks.height)
			};

			state.setFirstFindSize({
				firstFindSize: true,
				sizeG: sizeG
			});

			return sizeG;
		} else {
			return state.getSizeWorld().sizeG;
		}
	}

	static makeAroayWihtEnemy(num, state) {
		const size = World.getSize(state);

		let creatures = [];
		for (let i = 0; i < num; i++) {
			let newCreature = {};
			newCreature.coor = new Coor();
			newCreature.type = 'slime';
			newCreature.coor.x = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.height - 2)) + 1;
			newCreature.coor.y = Math.floor(Math.random() * (GLOBAL_SETTING.numBlocks.width - 2)) + 1;
			creatures[i] = newCreature;
		}
		return creatures;
	}

	setAfterWorldRenderDoing(func) {
		this.afterWorldRenderDoing.push(func);
	}

	doAfterWorldRenderDoing() {
		this.afterWorldRenderDoing.forEach((func) => {
			func();
		});
	}

	renderWorld(startRender) {
		const state = this.state;
		const size = this.size;
		const bias = state.getBias(true);

		if (bias === null && startRender === true) {
			let world = getEmptyWorld();

			rendersBlocks(world, state, size);
			deliteOldWorld();
			pushNewWorld(world);

			return world;
		} else if (canIBias(size, state, bias) === true) {
			biasRender(this, bias);
			state.changeStartPointWatch(bias);
		}

		return true;

		function canIBias(size, state, bias) {
			const startPointWatch = state.getStartPiointWatch();
			const pointWotch = state.getPiointWatch();

			if (
			(((startPointWatch.x === 0
					||
			startPointWatch.x === GLOBAL_SETTING.numBlocks.height - size.heightBlocks)
				&&
			(pointWotch.x < Math.floor(size.heightBlocks / 2)
					||
			pointWotch.x >= (GLOBAL_SETTING.numBlocks.height - Math.floor(size.heightBlocks / 2)))
				&&
			(bias === 'up'
					||
			bias === 'down'))
			||
			((startPointWatch.y === 0
					||
			startPointWatch.y === GLOBAL_SETTING.numBlocks.width - size.widthBlocks)
				&&
			(pointWotch.y < Math.floor(size.widthBlocks / 2)
					||
			pointWotch.y >= (GLOBAL_SETTING.numBlocks.width - Math.floor(size.widthBlocks / 2)))
				&&
			(bias === 'left'
					||
			bias === 'right')))
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
			let world = state.getWorldDiv();
			if (world !== null) {
				world.remove();
				state.setWorldDiv = null;
			}
			return true;
		}

		function pushNewWorld(world) {
			document.querySelector('.wrapper').appendChild(world);
			return true;
		}

		function rendersBlocks(world, state, size) {
			const x = state.getStartPiointWatch().x;
			const y = state.getStartPiointWatch().y;
			const place = state.getAllPlace();

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

		function biasRender(world, bias) {
			const state = world.state;
			const size = world.size;
			const place = state.getAllPlace();
			const oldWorld = state.getWorldDiv();
			const startPointWatch = state.getStartPiointWatch();

			if (bias === 'right' || bias === 'left') {
				leftRightBias();
			} else if (bias === 'up' || bias === 'down') {
				upDownBias();
			} else {
				return false;
			}

			world.doAfterWorldRenderDoing();

			state.changePointWatch(bias);
			return true;

			function leftRightBias() {
				const x = state.getStartPiointWatch().x;

				for (let i = x; i < x + size.heightBlocks; i++) {

					let y = 0;
					let newY = 0;

					if (bias === 'right') {
						y = state.getStartPiointWatch().y + size.widthBlocks;
						newY = y - size.widthBlocks;
					} else if (bias === 'left') {
						y = state.getStartPiointWatch().y - 1;
						newY = y + size.widthBlocks;
					}


					if (place[i][newY].isCreature === true) {
						visableHideCreature(place[i][newY]);
					}

					let block = null;
					let line = oldWorld.children[i-x];
					let idBlockForRemove = (bias === 'right' ? 0 : line.children.length - 1);

					block = getBlock(place[i][y], {newX:i,newY:y}, true, line.children[idBlockForRemove]);

					if (bias === 'right') {
						line.appendChild(block);
					} else if (bias === 'left') {
						line.insertBefore(block, oldWorld.children[i-x].children[0]);
					}

				}

				return true;
			}

			function upDownBias() {
				const y = state.getStartPiointWatch().y;

				let row = null;

				if (bias === 'up') {
					row = oldWorld.children[oldWorld.children.length-1];
				} else if (bias === 'down') {
					row = oldWorld.children[0];
				}

				for (let i = y; i < y + size.widthBlocks; i++) {
					let x = 0;
					let newX = 0;

					if (bias === 'up') {
						x = state.getStartPiointWatch().x - 1;
						newX = x + size.heightBlocks;
					} else {
						x = state.getStartPiointWatch().x + size.heightBlocks;
						newX = x - size.heightBlocks;
					}

					let block = getBlock(place[x][i], {newX:x,newY:i}, true, row.children[i-y]);

					if (place[newX][i].isCreature === true) {
						visableHideCreature(place[newX][i]);
					}
				}

				if (bias === 'up') {
					oldWorld.insertBefore(row, oldWorld.children[0]);
				} else if (bias === 'down') {
					oldWorld.appendChild(row);
				}


				return true;
			}
		}

		function getBlock(blockObject, coor, bias, lastBlock = null) {
			let block = null;

			if (lastBlock === null) {
				block = document.createElement('div');
			} else {
				block = lastBlock;

				if (block.children[0]) {
					block.children[0].remove();
				}
			}

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