'use strict';

const React = require('react');

const Item = require('../../../commonComponent/item.jsx');

module.exports = class HeaderItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			items: props.stateGame.getWatcher().getFastItem()
		}
	}

	render() {
		let bpClassName = (this.state.active ? 'header__backpack active' : 'header__backpack');

		let headerItems = [];
		let row = [];
		let key = 0;

		let item = null;
		let num = 0;

		for (let i = 0; i < 2; i++) {
			row[i] = [];

			for (let j = 0; j < 3; j++) {
				if (this.state.items[key]) {
					item = this.state.items[key].item;
					num = this.state.items[key].num;
				} else {
					item = null;
					num = 0;
				}

				row[i][j] = (
					<Item
						key={key++}
						item={item}
						numItems={num}
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
				<div className={bpClassName} onClick={this.props.openPopUp}>
					<div className="header__backpack-divImg"></div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		document.addEventListener('mainStepOn', e => {
			this.setState({
				active: e.detail.withItems
			});
		});
	}
}