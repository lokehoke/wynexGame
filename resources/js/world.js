'use strict';
class World {
	constructor(config) {
		this.place = config;
		let world = getEmptyWorld();
		config._place.forEach( val => {
			let row = document.createElement('div');
			row.className = 'row';
			val.forEach( val => {
				let block = getBlock(val);
				row.appendChild(block);
			});
			world.appendChild(row);

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
					let iner = document.createElement('div');
					block.appendChild(iner);
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
						// let div = document.createElement('div');
						// div.className = 'magePlayer';
						block.children[0].className = 'magePlayer';
						// block.appendChild(div);
					}

					function getEnemy(block) {
					}
				}
			}
		});
		document.querySelector('.wrapper').appendChild(world);
		return world;

		function getEmptyWorld() {
			let world = document.createElement('div');
			world.className = 'world';
			return world;
		}
	}
}