'use strict';

const InnerObject = require('../innerObject.js');

const Coor = require('../../structOfDate/coordinate.js');
const ExCoor = require('../../structOfDate/ExCoordinate.js');

const ControllerBlock = require('../../globalClass/state/inerState/place/blocks/controllerBlock.js');

const World = require('../../globalClass/world.js');


module.exports = class Weapon extends InnerObject {
	constructor (id, state, owner, coor) {
		super(id, state, coor);
		this.isCreature = false;
		this.owner = owner;

		this.type = 'weapon';
		this.born = true;

		this.classNameCSS = 'weapon';
	}

	die() {

		if (this.DOMObject && this.DOMObject.children[0]) {
			this.DOMObject.children[0].remove();
		}

		this.state.deleteWeapon(this.id);
	}
}