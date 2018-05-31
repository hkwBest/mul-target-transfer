import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MulTargetTransfer from './mulTargetTransfer/index';
import registerServiceWorker from './registerServiceWorker';

class TestDemo extends Component {
	constructor() {
		super();
		this.state = {
			dataSource: [
				{ key: '1', title: '北京', description: '首都' },
				{ key: '2', title: '上海', description: '上海滩' },
				{ key: '3', title: '成都', description: '大熊猫' },
				{ key: '4', title: '杭州', description: '西湖' },
				{ key: '5', title: '郑州', description: '福塔' },
				{ key: '6', title: '西安', description: '肉夹馍' }
			],
			topTargetKeys: [ '1', '3', '6' ],
			bottomTargetKeys: [ '2', '4' ]
		};
	}
	render() {
		let { dataSource, topTargetKeys, bottomTargetKeys } = this.state;
		return (
			<div>
				<MulTargetTransfer
					className={'test'}
					showSortBtn={true}
					titles={[ 'aaa', 'bb', 'ccc' ]}
					dataSource={dataSource}
					topTargetKeys={topTargetKeys}
					bottomTargetKeys={bottomTargetKeys}
				/>
			</div>
		);
	}
}

ReactDOM.render(<TestDemo />, document.getElementById('root'));
registerServiceWorker();
