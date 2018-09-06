'use strict';

const React = require('react');
const ReactRedux = require('react-redux');
const PropTypes = require('prop-types');
const Item = require('./../../../commonComponent/item.jsx');

class HeaderItems extends React.Component {
	render() {
		let bpClassName = (
			this.props.active
				? 'header__backpack active'
				: 'header__backpack'
		);

		let headerItems = [];
		let row = [];
		let key = 0;

		let item = null;
		let num = 0;

		for (let i = 0; i < 2; i++) {
			row[i] = [];

			for (let j = 0; j < 3; j++) {
				item = this.props.items[key].item;
				num = this.props.items[key].numItems;

				row[i][j] = (
					<Item
						key={key}
						item={item}
						numItems={num}
						idItemPosition={key++}
						fast={true}
					/>
				);
			}

			headerItems[i] = (
				<div className="header__items-row" key={i}>
					{row[i]}
				</div>
			);
		}


		return (
			<div className="header__items-wrapper">
				<div className="header__items">
					{headerItems}
				</div>
				<div
					className={bpClassName}
					onClick={this.props.openPopUp}
				>
					<div className="header__backpack-divImg"></div>
				</div>
			</div>
		);
	}
}

module.exports = ReactRedux.connect(
	store => {
		let items = store.stateGame.getFastItems();
		let active = !!(store.stateGame.getStepOnItems().length);
		return {
			active,
			items
		};
	}, () => {
		return {};
	})(HeaderItems);
