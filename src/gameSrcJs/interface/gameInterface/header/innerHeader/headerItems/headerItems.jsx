'use strict';

const React = require('react');

module.exports = class HeaderItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			active: false
		}
	}

	render() {
		return (
			<div className="header__items-wrapper">
				<div className="header__items">
					<div className="header__items-row">
						<div className="header__item"></div>
						<div className="header__item"></div>
						<div className="header__item"></div>
					</div>
					<div className="header__items-row">
						<div className="header__item"></div>
						<div className="header__item"></div>
						<div className="header__item"></div>
					</div>
				</div>
				<div className={(this.state.active ? 'header__backpack active' : 'header__backpack')}></div>
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