'use strict';

const Size = require('../structOfDate/size.js');

module.exports = class GLOBAL_SETTING {
	constructor() {
		this.sizeBlock = new Size(30, 30);
		this.numBlocks = new Size(2 ** 10, 2 ** 10);

		this.timeOfTactPlayer = 10;
		this.timeOfTactOther = 400;

		this.timeAnimationWeapon = 2000;
	}
}