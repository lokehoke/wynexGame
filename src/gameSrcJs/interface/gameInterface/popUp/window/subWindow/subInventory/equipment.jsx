'use strict';

const React = require('react');

module.exports = class Equipment extends React.Component {
    render() {
        return (
          <div className="popUp___wrappWindow">
            <div className="wrapWindow__title">Снаряжение</div>
            <div className="inventory__items">
              {this.allItems}
            </div>
          </div>
        );
    }
}
