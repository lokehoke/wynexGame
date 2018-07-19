'use strict';

const Size = require('../structOfDate/size.js');

module.exports = {
	sizeBlock: new Size(30, 30),
	numBlocks: new Size(2 ** 10, 2 ** 10),

	numEnemy: 1000,

	timeOfTactPlayer: 50,
	timeOfTactOther: 200,

	standartPlayer: {
		maxHP: 10000,
		attackDamage: 50,
		attackRange: 10
	},

	standartEnemy: {
		maxHP: 100,
		attackDamage: 10,
		attackRange: 10,
		pursuitRange: 50
	}
}