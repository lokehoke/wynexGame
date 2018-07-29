'use strict';

const React = require('react');

const Item = require('../../../../commonComponent/item.jsx')

module.exports = class Items extends React.Component {

	componentWillMount () {
		this.allItems = [];

		let N = 0;

		if (this.props.type === 'big') {
			N = 120;
		} else {
			N = 60;
		}

		for (let i = 0; i < N; i++) {
			this.allItems[i] = (
				<Item key={i} />
			);
		}
	}

	render() {
		return (
			<div className="popUp___wrappWindow">
				<div className="wrapWindow__title">Инвентарь</div>
				<div className="inventory__items">
					{this.allItems}
				</div>
			</div>
		);
	}
}