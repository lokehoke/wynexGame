'use strict';

const React = require('react');

const Item = require('../../../commonComponent/item.jsx');

module.exports = class HeaderItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			active: false
		}
	}

	render() {
		let bpClassName = (this.state.active ? 'header__backpack active' : 'header__backpack');

		return (
			<div className="header__items-wrapper">
				<div className="header__items">
					<div className="header__items-row">
						<Item />
						<Item />
						<Item />
					</div>
					<div className="header__items-row">
						<Item />
						<Item />
						<Item />
					</div>
				</div>
				<div className={bpClassName} onClick={this.props.openPopUp}></div>
			</div>
		);
	}

	componentDidMount() {
		document.addEventListener('mainStepOn', e => {
			if (e.detail.withItems) {
				this.setState({
					items: e.detail.items,
					active: true
				});
			} else {
				this.setState({
					items: [],
					active: false
				});
			}
		});
	}
}