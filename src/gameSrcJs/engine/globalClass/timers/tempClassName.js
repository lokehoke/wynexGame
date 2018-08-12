'use strict';

module.exports = class tempClassName {
	constructor (item, time, className) {
		this.item = item;
		this.time = time;
		this.className = className;

		this.timer = null;

		this._setUpClass(item, time, className);
	}

	_setUpClass() {
		this.item.classList.add(this.className);

		this.timer = setTimeout(() => {
			if (this.item.classList.contains(this.className)) {
				this.item.classList.remove(this.className);
			}
		}, this.time);

		this.__destructor();
	}

	__destructor() {
		delete this;
	}
}