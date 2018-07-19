'use strict';

module.exports = class ChangeStatistic {
	constructor(fromO = null, num = 0, max = 0, cur = 0, type = 'hp') {
		this.fromO = fromO;
		this.num = num;
		this.max = max;
		this.cur = cur;
		this.type = type;
	}
}