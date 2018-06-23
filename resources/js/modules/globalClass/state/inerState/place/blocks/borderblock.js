'use strict';

const Block = require('./block.js');

module.exports = class BorderBlock extends Block {
	constructor() {
		super();
		this.type = 'border';
		this.idBlock = 2;
		this.patency = false;
		this.classNameCSS = 'border';
	}
}