'use strict';

const React = require('react');
const PropTypes = require('prop-types');

const InnerItem = require('./innerItem.jsx');

module.exports = class Item extends React.Component {
	static defaultProps = {
		item: {},
		numItems: 0,
		idItemPosition: 0,
		fast: false
	}

	static propsTypes = {
		item: PropTypes.object,
		numItems: PropTypes.number,
		idItemPosition: PropTypes.number,
		fast: PropTypes.bool
	}

	render() {
		let innerItem = null;

		if (this.props.item) {
			innerItem = (
				<InnerItem
					item={this.props.item}
					numItems={this.props.numItems}
					fast={this.props.fast}
					idItemPosition={this.props.idItemPosition}
				/>
			);
		}

		return (
			<div className="__item">
				{innerItem}
			</div>
		);
	}
}
