/**
 * 公共弹框组件
 */
import React, {Component} from 'react';
import {connect} from 'dva';
import {Modal, Button} from 'antd';
import styles from './Mymodal.less'

class MyModal extends Component {
  state = {};

  componentDidMount() {
    let t = this;
  };
  setFooter() {
    let t = this;
    let {footerShow,footerTitle} = t.props;
    if (footerShow) {
      return (
        <div className={styles.showCenter}>
          <Button loading={t.props.modalBtnLoading || false}
                  className={styles.saveBtn}
                  onClick={t.props.onModalSave}>{footerTitle||'保存'}</Button>
        </div>
      )
    } else {
      return null;
    }
  }
  render() {
    let t = this;

    return (
      <div>
        <Modal
          {...t.props}
          id={'commonModal'}
          maskClosable={false}
          className={styles.commonModal+" "+t.props.className}
          footer={t.setFooter()}>
          {t.props.children}
        </Modal>
      </div>

    )
  }
}
function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(MyModal);
