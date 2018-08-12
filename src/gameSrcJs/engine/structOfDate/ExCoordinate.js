'use strict';

const Coor = require('./coordinate.js');

module.exports = class ExCoor extends Coor {
	constructor (x = 0, y = 0, newX = 0, newY = 0) {
		super(x, y);
		this.newX = newX;
		this.newY = newY;
	}
}