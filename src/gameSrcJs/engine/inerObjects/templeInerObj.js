'use strict';

const Coor = require('../structOfDate/coordinate.js');

const World = require('../globalClass/world.js');

module.exports = class InnerObject {
	constructor (id, state, coor) {
		this.visabalingInerObject = true;
		this.nesting = true;
		this.patency = false;
		this.state = state;
		this.coor = coor;
		this.id = id;
		this.idOwn = null;

		this.live = false;

		this.visable = {};
		this.visable.was = false;
		this.visable.now = false;
		this.visable = this._identifyVisable({newX: coor.x, newY: coor.y}, state);

		this.classNameCSS = '';
		this.DOMObject = null;

		this._settings = state.getSetting();
	}

	_identifyVisable(coor, state) {
		const visable = {};

		if (this.watcher === true) {
			visable.now = true;
			visable.was = true;
		} else {
			const startPointWatch = this.state.getStartPiointWatch();
			const size = World.getSize(state);

			visable.was = this.visable.now;

			if (coor.newX - startPointWatch.x < size.heightBlocks
			&&
				coor.newY - startPointWatch.y < size.widthBlocks
			&&
				coor.newX - startPointWatch.x >= 0
			&&
				coor.newY - startPointWatch.y >= 0
			) {
				visable.now = true;
			} else {
				visable.now = false;
			}
		}

		if (this.type === 'weapon' && this.born) {
			this.born = false;
			visable.was = false;
		}

		return visable;
	}
}