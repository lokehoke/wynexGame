'use strict';

const BorderBlock = require('./borderblock.js');
const DirtBlock = require('./dirtblock.js');

module.exports = class BlockController {
	constructor (){}

	static getBlockObject(id) {
		switch(id) {
			case 1:
				return new DirtBlock();
			case 2:
				return new BorderBlock();
		}
	}
}