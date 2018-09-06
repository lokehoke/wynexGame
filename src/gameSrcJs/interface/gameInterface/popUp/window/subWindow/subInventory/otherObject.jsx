'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const Item = require('../../../../commonComponent/item.jsx')

class OtherObject extends React.Component {
	componentWillMount () {
		this.allItems = [];

		let itemsDate = this.props.items;
		let item = null;
		let numItems = 0;

		for (let i = 0; i < 32; i++) {
			if (i < itemsDate.length) {
				item = itemsDate[i].item;
				numItems = itemsDate[i].num;
			} else {
				item = null;
				numItems = 0;
			}

			this.allItems[i] = (
				<Item
					key={i}
					item={item}
					numItems={numItems}
				/>
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

module.exports = ReactRedux.connect(
	(store) => {
		let items = store.stateGame.getStepOnItems();
		return {
			items
		};
	}
)(OtherObject);
