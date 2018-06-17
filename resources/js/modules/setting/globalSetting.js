'use strict';

const Size = require('../structOfDate/size.js');

module.exports = class GLOBAL_SETTING {
	constructor() {
		this.sizeBlock = new Size(50, 50);
		this.numBlocks = new Size(2 ** 10, 2 ** 10);
	}
}