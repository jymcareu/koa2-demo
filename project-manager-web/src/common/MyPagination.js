/***
 * Pagination组件 只封装了样式
 */
import React, {Component}from 'react';
import {Pagination} from 'antd';
import styles from './MyPagination.less'

class MyPagination extends Component {

  componentDidMount () {

  }

  render () {

    return (
      <div className={styles.myPage}>
        <Pagination hideOnSinglePage={this.props.showPage ? false : true} {...this.props} size="small"/>
      </div>
    )
  }
}

export default MyPagination;
