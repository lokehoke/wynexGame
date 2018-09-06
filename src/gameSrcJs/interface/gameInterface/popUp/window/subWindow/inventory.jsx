'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const OtherObject = require('./subInventory/otherObject.jsx');
const Items = require('./subInventory/items.jsx');
const Equipment = require('./subInventory/equipment.jsx');

class Inventory extends React.Component {
	render() {
		let otherObject = null;
		let ownInvntory = (
			<Items />
		);

		if (this.props.existOtherObject) {
			otherObject = (
				<OtherObject />
			);
		} else {
			otherObject = (
				<Equipment />
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

module.exports = ReactRedux.connect(
	store => {
		let existOtherObject = !!(store.stateGame.getStepOnItems().length);
		return {
			existOtherObject
		}
	}
)(Inventory);
