'use strict';
class World {
	constructor(config, ...players) {
		this.place = config;
		let world = getWorld();
		config.place.forEach( val => {
			let row = document.createElement('div');
			row.className = 'row';
			val.forEach( function (val) {
				getBlock(val);
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
						getCreature(block);
				 		break;
				}
				row.appendChild(block);

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
						block.className += ' player';
					}

					function getEnemy(block) {
						block.className += ' enemy';
					}
				}
			}
		});
		document.querySelector('.wrapper').appendChild(world);
		return world;

		function getWorld() {
			let world = document.createElement('div');
			world.className = 'world';
			return world;
		}
	}
}