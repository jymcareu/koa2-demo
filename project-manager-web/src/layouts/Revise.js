/*修改密码模块*/
import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Input} from 'antd';
import MyModal from '../common/MyModal';
import styles from './revise.less';

const FormItem = Form.Item;

class Revise extends Component {
  state = {inputType: "password"};

  componentDidMount() {

  };

  //Modal保存按钮
  onModalSave = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        let params = this.props.form.getFieldsValue();
        console.log("params:", params);
        this.props.onModalSave(params);
      }
    });
  };
//关闭弹框
  ModalCancel = (text) => {
    let t = this;
    t.setState({
      [text]: false,
    })
  };

  render() {
    let t = this;
    const {} = t.state;
    let {getFieldDecorator} = t.props.form;
    return (
      <MyModal
        {...t.props}
        className={styles.jlModal}
        width={320}
        footerShow={true}
        onModalSave={t.onModalSave}
      >
        <Form>
          <FormItem label="原始密码">
            {
              getFieldDecorator('oldPsw', {
                initialValue: "",
              })(
                <Input type={this.state.inputType}/>
              )
            }
          </FormItem>
          <FormItem label="新密码">
            {
              getFieldDecorator('newPsw', {
                initialValue: "",
              })(
                <Input type={this.state.inputType}/>
              )
            }
          </FormItem>
          <FormItem label="确认密码">
            {
              getFieldDecorator('afterpassword', {
                initialValue: "",
              })(
                <Input type={this.state.inputType}/>
              )
            }
          </FormItem>
        </Form>

      </MyModal>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Form.create()(Revise));
