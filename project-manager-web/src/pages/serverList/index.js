import React, {Component} from 'react';
import {connect} from 'dva';
import {message, Tooltip, Divider, Popconfirm} from 'antd';
import Filtrate from "../../common/Filtrate";
import MyTable from "../../common/MyTable";
import PublicTemplate from "../../services/PublicTemplate";
import Container from "../../common/Container";
import PublicModal from "../../common/PublicModal";
import request from "../../utils/request";
import config from "../../config";
import MyIcon from "../../common/MyIcon";
import PublicService from "../../services/PublicService";
import MyPagination from "../../common/MyPagination";

class ServerList extends Component {
  state = {
    publicModal: false,
    modalBtnLoading: false,
    modalTitle: '服务器管理',
    modalType: '新增',
    disabled: false,
    record: {},
    listData: [],
    delConfirm: false,
  };

  componentDidMount() {
    this.onSubmit();
  }

  modalCancel = (type) => {
    this.setState({
      [type]: false,
      record: {}
    });
  };

  //查询
  onSubmit = () => {
    let ret = this.f1.getForm().getFieldsValue();
    let params = {
      projectName: ret.projectName,
    };
    request({url: '/projectManager/serverList/searchServer', method: 'GET', params}).then(data => {
      console.log(data);
      if (data.code === 0) {
        let listData = [];
        if (data.data && data.data.length) {
          listData = data.data
        }
        this.setState({
          listData
        })
      } else {
        message.error(data.err)
      }
    });
  };

  // 模态框保存
  onSave = (val) => {
    let {record, modalType} = this.state;
    this.setState({
      modalBtnLoading: true
    });
    val.id = (record && record.id) ? record.id : '';
    let url = '/projectManager/serverList/update';
    if (modalType === '新增')
      url = '/projectManager/serverList/save';

    request({url, method: 'POST', data: {...val}}).then(data => {
      if (data.code === 0) {
        message.success("保存成功！");
        this.modalCancel('publicModal');
        this.onSubmit();
      } else {
        message.error(data.err)
      }
      this.setState({
        modalBtnLoading: false
      });
    });
  };

  // 打开模态框
  onModalShow = (modalType, record) => {
    console.log(record);
    if (record) {
      this.setState({record})
    }
    this.setState({
      publicModal: true,
      modalType
    })
  };

  onDelShow = () => {
    const {selectedRowKeys} = this.state;
    if (selectedRowKeys.length) {
      this.setState({
        delConfirm: true
      });
    } else {
      message.warning('请选择删除行', 2);
    }
  };

  deleteBtn = (id) => {
    let hide = message.loading('删除中...', 0);
    request({url: '/projectManager/serverList/delete', method: 'GET', params: {id}}).then(data => {
      if (data.code === 0) {
        message.success("删除成功！");
        this.onSubmit();
      } else {
        message.error(data.err)
      }
      hide()
    });
  };


  render() {
    const {publicModal, modalBtnLoading, modalTitle, modalType, disabled, record, delConfirm, listData} = this.state;
    const items = [
      {
        type: 'input',
        label: '项目名称',
        paramName: 'projectName',
      },
    ];
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'projectName',
        width: 100
      },
      {
        title: '内网Ip',
        dataIndex: 'IntranetIP',
        width: 100
      },
      {
        title: '外网Ip',
        dataIndex: 'networkIp',
        width: 100
      },
      {
        title: '账号',
        dataIndex: 'username',
        width: 100
      },
      {
        title: '密码',
        dataIndex: 'password',
        width: 100
      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 200,
        render: (text, record, index) => PublicTemplate.stringToEllipsis(text, 10)
      },
      {
        title: '操作',
        dataIndex: 'operator',
        width: 80,
        render: (text, record, index) => <span>
          <Tooltip title="编辑"> <MyIcon type={'icon-xiugai2'} style={{color: '#16B8BE'}}
                                       onClick={this.onModalShow.bind(this, '编辑', record)}/></Tooltip>
          <Divider type="vertical"/>
          <Popconfirm title="删除数据不可恢复，请确认是否删除?" onConfirm={this.deleteBtn.bind(this, record.id)}
                      onCancel={this.modalCancel.bind(this, 'delConfirm')} placement={'topRight'}>
            <Tooltip title="删除"> <MyIcon type={'icon-del'} style={{color: '#FF692E'}}/></Tooltip>
          </Popconfirm>
        </span>
      }
    ];

    const modalItems = [
      {
        type: 'input',
        label: '项目名称',
        paramName: 'projectName',
        rules: [{...config.reg.required}],
        initialValue: (record && record.projectName) ? record.projectName : null,
      },
      {
        type: 'input',
        label: '内网Ip',
        paramName: 'IntranetIP',
        initialValue: (record && record.IntranetIP) ? record.IntranetIP : null,
      },
      {
        type: 'input',
        label: '外网Ip',
        paramName: 'networkIp',
        initialValue: (record && record.networkIp) ? record.networkIp : null,
      },
      {
        type: 'input',
        label: '账号',
        paramName: 'username',
        initialValue: (record && record.username) ? record.username : null,
      },
      {
        type: 'input',
        label: '密码',
        paramName: 'password',
        initialValue: (record && record.password) ? record.password : null,
      },
      {
        type: 'textArea',
        label: '备注',
        paramName: 'remark',
        initialValue: (record && record.remark) ? record.remark : null,
      },
    ];
    return <div>
      <Filtrate
        items={items}
        ref={ref => this.f1 = ref}
        submit={this.onSubmit}
      />
      <Container
        addBtnShow={true}
        addBtn={this.onModalShow.bind(this, '新增', {})}
        deleteBtnShow={false}
        setDelConfirm={this.onDelShow}
        deleteBtnCancel={this.modalCancel.bind(this, 'delConfirm')}
        deleteBtn={this.deleteBtn}
        delConfirm={delConfirm}
      >
        <MyTable
          pagination={false}
          columns={columns}
          dataSource={PublicService.transformArrayData(listData, true, true)}
        />
      </Container>
      {
        publicModal &&
        <PublicModal
          items={modalItems}
          modalBtnLoading={modalBtnLoading}
          wrappedComponentRef={ref => this.myForm = ref}
          visible={publicModal}
          title={modalTitle + " > " + modalType}
          footerShow={!disabled}
          onModalSave={this.onSave}
          onCancel={this.modalCancel.bind(this, 'publicModal')}
        />
      }
    </div>
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ServerList);
