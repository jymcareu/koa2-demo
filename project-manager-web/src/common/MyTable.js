/***
 * table组件 定制了表头样式
 */
import React, {Component}from 'react';
import {Table} from 'antd';
import styles from './MyTable.less';

class MyTable extends Component {

  componentDidMount () {

  }

  render () {
    if (this.props.columns && this.props.columns.length !== 0) {
      for (let i = 0; i < this.props.columns.length; i++) {
        this.props.columns[i].className =
          this.props.columns[i].className ? this.props.columns[i].className + ' wpColumn' : 'wpColumn';
      }
    } else {
      console.log('MyTable: columns 值为 ' + this.props.columns)
    }
    return (
      <div className={styles.myTable}>
        <Table  {...this.props} size={this.props.size || 'middle'}/>
      </div>
    )
  }
}

export default MyTable;
