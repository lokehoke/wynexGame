'use strict';

const React = require('react');

const Inventory = require('./subWindow/inventory.jsx');

module.exports = class MainWindow extends React.Component {
	render() {
		let mainWindow = this._getMainWindow();

		return (
			<div className="mainWindow">
				{mainWindow}
			</div>
		);
	}

	_getMainWindow() {
		let mainwindow = {};

		switch(this.props.type) {
			case "inventory":
				mainwindow = (
					<Inventory
						otherObject={this.props.otherObject}
						stateGame={this.props.stateGame}
					/>
				);
				break;
		}

		return mainwindow;
	}
}
