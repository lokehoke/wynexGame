'use strict';

const Size = require('../structOfDate/size.js');

module.exports = class GLOBAL_SETTING {
	constructor() {
		this.sizeBlock = new Size(30, 30);
		this.numBlocks = new Size(2 ** 10, 2 ** 10);

		this.numEnemy = 1000;

		this.timeOfTactPlayer = 50;
		this.timeOfTactOther = 200;
	}
}