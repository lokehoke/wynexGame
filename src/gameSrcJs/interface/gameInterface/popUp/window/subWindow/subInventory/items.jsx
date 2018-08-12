'use strict';

const React = require('react');

const Item = require('../../../../commonComponent/item.jsx')

module.exports = class Items extends React.Component {

	componentWillMount () {
		this.allItems = [];

		let itemsDate = this.props.stateGame.getWatcher().getItems();

		itemsDate.forEach( itemCur => {
			console.log(itemCur);

			// this.allItems[i] = (
			// 	<Item
			// 		key={i}
			// 		item={item}
			// 		numItems={numItems}
			// 	/>
			// );
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
