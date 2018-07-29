'use strict';

const React = require('react');

const Item = require('../../../../commonComponent/item.jsx')

module.exports = class Items extends React.Component {

	componentWillMount () {
		this.allItems = [];

		for (let i = 0; i < 48; i++) {
			this.allItems[i] = (
				<Item key={i} />
			);
		}
	}

	render() {
		return (
			<div className="popUp___wrappWindow">
				<div className="wrapWindow__title">Останки</div>
				<div className="inventory__items">
					{this.allItems}
				</div>
			</div>
		);
	}
}