'use strict';

const Block = require('./block.js');

module.exports = class DirtBlock extends Block {
	constructor() {
		super();
		this.type = 'dirt';
		this.idBlock = 1;
		this.patency = true;
		this.classNameCSS = 'dirt';
	}
}