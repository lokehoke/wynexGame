'use strict';

const React = require('react');

const OtherObject = require('./subInventory/otherObject.jsx');
const Items = require('./subInventory/items.jsx');
const Equipment = require('./subInventory/equipment.jsx');

module.exports = class Inventory extends React.Component {
	render() {
		let otherObject = null;
		let ownInvntory = (
			<Items stateGame={this.props.stateGame} />
		);

		if (this.props.otherObject.length) {
			otherObject = (
				<OtherObject stateGame={this.props.stateGame} />
			);
		} else {
			otherObject = (
				<Equipment stateGame={this.props.stateGame} />
			);
		}

		return (
			<div className="popUp__inventory">
				{otherObject}
				{ownInvntory}
			</div>
		);
	}
}
