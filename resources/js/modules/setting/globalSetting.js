'use strict';

const Size = require('../structOfDate/size.js');

module.exports = class GLOBAL_SETTING {
	constructor() {
		this.sizeBlock = new Size(30, 30);
		this.numBlocks = new Size(2 ** 4, 2 ** 4);

		this.numEnemy = 5;

		this.timeOfTactPlayer = 50;
		this.timeOfTactOther = 200;
	}
}