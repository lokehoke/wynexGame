'use strict';

const React = require('react');
const ReactRedux = require('react-redux');

const Item = require('../../../../commonComponent/item.jsx')

class Items extends React.Component {
	componentWillMount () {
		this.allItems = [];

		let itemsDate = this.props.items;

		itemsDate.forEach( (itemCur, i) => {

			this.allItems[i] = (
				<Item
					key={i}
					item={itemCur.item}
					numItems={itemCur.numItems}
				/>
			);
		});
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

module.exports = ReactRedux.connect(
	store => {
		let items = store.stateGame.getWatcher().getItems();

		return {
			items
		}
	}
)(Items);
