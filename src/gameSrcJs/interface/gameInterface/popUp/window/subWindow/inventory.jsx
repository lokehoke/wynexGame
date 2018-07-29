'use strict';

const React = require('react');

const OtherObject = require('./subInventory/otherObject.jsx');
const Items = require('./subInventory/items.jsx');

module.exports = class Inventory extends React.Component {
	render() {
		let otherObject = null;
		let ownInvntory = (
			<Items
				type="big"
				stateGame={this.props.stateGame}
			/>
		);

		if (this.props.otherObject.length) {
			otherObject = (
				<OtherObject />
			);

			ownInvntory = (
				<Items
					type="small"
					stateGame={this.props.stateGame}
				/>
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