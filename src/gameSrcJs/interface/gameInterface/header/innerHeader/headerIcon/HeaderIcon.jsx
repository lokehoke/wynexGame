'use strict';

const React = require('react');
const ReactDOM = require('react-dom');

module.exports = class HeaderIcon extends React.Component {
	render() {
		return (
			<div className="header__icon">
				<img
					src="/resources/img/interface/mage_iconV2.nesvg.png"
					width="100"
					height="100"
				/>
			</div>
		);
	}
}