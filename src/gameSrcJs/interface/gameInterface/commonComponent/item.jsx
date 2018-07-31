'use strict';

const React = require('react');

module.exports = class Item extends React.Component {
	render() {
		let cn = '__item__count '
		let num = null;

		if (this.props.item) {
			cn += this.props.item.classNameCSS;
			num = this.props.numItems;
		}

		return (
			<div className="__item">
				<div className="__item__icon">
					<div className={cn}>
						{num}
					</div>
				</div>
			</div>
		);
	}
}