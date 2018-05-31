/*
 * @Author: huangkwf 
 * @Date: 2018-05-28 15:22:46 
 * @Last Modified by:   huangkwf 
 * @Last Modified time: 2018-05-28 15:22:46 
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from './list';
import Operation from './operation';
import { initState } from './method';

import '../static/tinper-bee.css'
import './index.less';

export default class MulTargetTransfer extends Component {
	constructor(props) {
		super(props);
		let { topTargetKeys = [], bottomTargetKeys = [], selectedKeys = [] } = props;
		let { sourceSelectedKeys, tTargetSelectedKeys, bTargetSelectedKeys } = initState(
			selectedKeys,
			topTargetKeys,
			bottomTargetKeys
		);
		this.state = {
			topTargetKeys: [ ...topTargetKeys ], //上方目标区域key值集合
			bottomTargetKeys: [ ...bottomTargetKeys ], //下方目标区域key值集合
			sourceSelectedKeys,
			tTargetSelectedKeys,
			bTargetSelectedKeys
		};
	}
	componentWillReceiveProps(nextProps) {
		let { topTargetKeys = [], bottomTargetKeys = [], selectedKeys = [] } = nextProps;
		let { sourceSelectedKeys, tTargetSelectedKeys, bTargetSelectedKeys } = initState(
			selectedKeys,
			topTargetKeys,
			bottomTargetKeys
		);
		this.setState({
			topTargetKeys: [ ...topTargetKeys ],
			bottomTargetKeys: [ ...bottomTargetKeys ],
			sourceSelectedKeys,
			tTargetSelectedKeys,
			bTargetSelectedKeys
		});
	}
	// 拆分DataSource
	splitDataSource = () => {
		let res = { leftData: [], tTargetData: [], bTargetData: [] };
		let { topTargetKeys = [], bottomTargetKeys = [] } = this.state;
		let dataSource = [ ...this.props.dataSource ];
		topTargetKeys.map((key, index) => {
			dataSource.map((item, i) => {
				if (item['key'] == key) {
					res.tTargetData.push(item);
					dataSource.splice(i, 1);
				}
			});
		});
		bottomTargetKeys.map((key, index) => {
			dataSource.map((item, i) => {
				if (item['key'] == key) {
					res.bTargetData.push(item);
					dataSource.splice(i, 1);
				}
			});
		});
		res.leftData = dataSource;
		return res;
	};
	//获取选中集合名称
	getSelectedKeysName = (direction) => {
		let selectedKeysName;
		switch (direction) {
			case 'left':
				selectedKeysName = 'sourceSelectedKeys';
				break;
			case 'rTop':
				selectedKeysName = 'tTargetSelectedKeys';
				break;
			case 'rBottom':
				selectedKeysName = 'bTargetSelectedKeys';
				break;
			default:
				break;
		}
		return selectedKeysName;
	};
	//单行选中/取消
	itemClick = (direction, item, check) => {
		let handleSelectedKeys = [];
		let { sourceSelectedKeys, tTargetSelectedKeys, bTargetSelectedKeys } = this.state;
		switch (direction) {
			case 'left':
				handleSelectedKeys = [ ...sourceSelectedKeys ];
				break;
			case 'rTop':
				handleSelectedKeys = [ ...tTargetSelectedKeys ];
				break;
			case 'rBottom':
				handleSelectedKeys = [ ...bTargetSelectedKeys ];
				break;
			default:
				break;
		}
		if (check) {
			handleSelectedKeys.push(item.key);
		} else {
			let index = handleSelectedKeys.indexOf(item.key);
			handleSelectedKeys.splice(index, 1);
		}
		let selectedKeysName = this.getSelectedKeysName(direction);
		this.setState({ [selectedKeysName]: handleSelectedKeys });
	};
	//单行点击源数据
	handleLeftSelect = (item, check) => {
		this.itemClick('left', item, check);
	};
	//单行点击右上目标数据
	handlerTopSelect = (item, check) => {
		this.itemClick('rTop', item, check);
	};
	//单行点击右上目标数据
	handlerBottomSelect = (item, check) => {
		this.itemClick('rBottom', item, check);
	};
	//转移数据
	moveTo = (direction, targetKeys, targetSelectedKeys) => {
		let selectedKeys = [];
		let tarKeys = [ ...this.state[targetKeys] ];
		let { onChange } = this.props;
		let splitDataRes;
		if (direction == 'right') {
			selectedKeys = [ ...this.state['sourceSelectedKeys'] ];
			tarKeys.push(...selectedKeys);
			this.setState({ [targetKeys]: tarKeys, sourceSelectedKeys: [] }, () => {
				splitDataRes = this.splitDataSource();
				if (onChange && typeof onChange === 'function') {
					onChange(splitDataRes);
				}
			});
		} else {
			selectedKeys = [ ...this.state[targetSelectedKeys] ];
			selectedKeys.map((key, index) => {
				let i = tarKeys.indexOf(key);
				tarKeys.splice(i, 1);
			});
			this.setState({ [targetKeys]: tarKeys, [targetSelectedKeys]: [] }, () => {
				splitDataRes = this.splitDataSource();
				if (onChange && typeof onChange === 'function') {
					onChange(splitDataRes);
				}
			});
		}
	};
	//源数据和目标1之间转移数据
	moveToRTop = (direction) => {
		this.moveTo(direction, 'topTargetKeys', 'tTargetSelectedKeys');
	};
	//源数据和目标2之间转移数据
	moveToRBottom = (direction) => {
		this.moveTo(direction, 'bottomTargetKeys', 'bTargetSelectedKeys');
	};
	//列表全选
	allCheckChange = (dataSource, selectedKeysName, checkedStatus) => {
		if (checkedStatus) {
			let newSelectedKeys = dataSource.map((item) => {
				return item.key;
			});
			this.setState({ [selectedKeysName]: newSelectedKeys });
		} else {
			this.setState({ [selectedKeysName]: [] });
		}
	};
	//源数据全选操作
	sourceAllCheckChange = (dataSource, checkedStatus) => {
		this.allCheckChange(dataSource, 'sourceSelectedKeys', checkedStatus);
	};
	//目标一全选操作
	tTargetAllCheckChange = (dataSource, checkedStatus) => {
		this.allCheckChange(dataSource, 'tTargetSelectedKeys', checkedStatus);
	};
	//目标二全选操作
	bTargetAllCheckChange = (dataSource, checkedStatus) => {
		this.allCheckChange(dataSource, 'bTargetSelectedKeys', checkedStatus);
	};
	// 目标一排序
	tTargetSort = (direction) => {
		this.sortMove(direction, 'topTargetKeys', 'tTargetSelectedKeys');
	};
	// 目标二排序
	bTargetSort = (direction) => {
		this.sortMove(direction, 'bottomTargetKeys', 'bTargetSelectedKeys');
	};
	//排序操作
	sortMove = (direction, targetKeys, selectedKeys) => {
		let sortTargetKeys = [ ...this.state[targetKeys] ];
		let sortSelectedKey = [ ...this.state[selectedKeys] ][0];
		if (direction == 'up') {
			let hasFirstItem = sortTargetKeys.indexOf(sortSelectedKey) == 0;
			if (hasFirstItem) {
				// toast({ color: 'warning', content: '第一项无法上移！' });
				alert('第一项无法上移！');
			} else {
				let i = sortTargetKeys.indexOf(sortSelectedKey);
				sortTargetKeys.splice(i - 1, 0, sortSelectedKey);
				sortTargetKeys.splice(i + 1, 1);
			}
		} else {
			let hasLastItem = sortTargetKeys.indexOf(sortSelectedKey) == sortTargetKeys.length - 1;
			if (hasLastItem) {
				// toast({ color: 'warning', content: '最后一项无法下移！' });
				alert('最后一项无法下移！');
			} else {
				let i = sortTargetKeys.indexOf(sortSelectedKey);
				sortTargetKeys.splice(i + 2, 0, sortSelectedKey);
				sortTargetKeys.splice(i, 1);
			}
		}
		this.setState({ [targetKeys]: sortTargetKeys });
	};
	render() {
		let { leftData, tTargetData, bTargetData } = this.splitDataSource();
		let { sourceSelectedKeys, tTargetSelectedKeys, bTargetSelectedKeys } = this.state;
		let { className, titles, showSortBtn } = this.props;
		const customerClass = classNames({ 'm-transfer': true, [className]: !!className }); //自定义class
		return (
			<div className={customerClass}>
				<div className="m-transfer-source-list">
					<List
						className="m-transfer-list"
						title={titles[0]}
						dataSource={leftData}
						selectedKeys={sourceSelectedKeys}
						allCheckChange={this.sourceAllCheckChange.bind(this, leftData)}
						itemClick={this.handleLeftSelect}
					/>
				</div>
				<div className="m-transfer-operation-group">
					<Operation
						className="m-transfer-operation"
						moveTo={this.moveToRTop}
						sourceSelectedKeys={sourceSelectedKeys}
						targetSelectedKeys={tTargetSelectedKeys}
					/>
					<Operation
						className="m-transfer-operation"
						moveTo={this.moveToRBottom}
						sourceSelectedKeys={sourceSelectedKeys}
						targetSelectedKeys={bTargetSelectedKeys}
					/>
				</div>
				<div className="m-transfer-target-list">
					<List
						className="m-transfer-list"
						title={titles[1]}
						showSortBtn={showSortBtn}
						sortMove={this.tTargetSort}
						dataSource={tTargetData}
						selectedKeys={tTargetSelectedKeys}
						allCheckChange={this.tTargetAllCheckChange.bind(this, tTargetData)}
						itemClick={this.handlerTopSelect}
					/>
					<List
						className="m-transfer-list"
						title={titles[2]}
						showSortBtn={showSortBtn}
						sortMove={this.bTargetSort}
						dataSource={bTargetData}
						selectedKeys={bTargetSelectedKeys}
						allCheckChange={this.bTargetAllCheckChange.bind(this, bTargetData)}
						itemClick={this.handlerBottomSelect}
					/>
				</div>
			</div>
		);
	}
}

MulTargetTransfer.defaultProps = {
	className: [],
	dataSource: [],
	showSortBtn: true,
	onChange: null,
	topTargetKeys: [],
	selectedKeys: [],
	bottomTargetKeys: [],
	titles: [ '数据源', '目标一', '目标二' ]
};
MulTargetTransfer.propTypes = {
	className: PropTypes.array,
	dataSource: PropTypes.array,
	showSortBtn: PropTypes.bool,
	onChange: PropTypes.func,
	topTargetKeys: PropTypes.array,
	selectedKeys: PropTypes.array,
	bottomTargetKeys: PropTypes.array,
	titles: PropTypes.array,
}
