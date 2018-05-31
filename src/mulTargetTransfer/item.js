/*
 * @Author: huangkwf 
 * @Date: 2018-05-28 15:23:04 
 * @Last Modified by:   huangkwf 
 * @Last Modified time: 2018-05-28 15:23:04 
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { base } from 'nc-lightapp-front';
// const { NCIcon: Icon, NCButton: Button, NCFormControl, NCCheckbox: Checkbox } = base;
import { Checkbox } from 'tinper-bee';

export default class Item extends Component {
	constructor(props) {
		super(props);
	}
	itemClick = () => {
		let { item } = this.props;
		this.props.itemClick(item);
	};
	render() {
		let { item, checked, itemClick } = this.props;
		return (
			<li className="m-transfer-list-content-item" onClick={this.itemClick}>
				<Checkbox checked={checked} colors="info" />
				<span>{item.title}</span>
			</li>
		);
	}
}
