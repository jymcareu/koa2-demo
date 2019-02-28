/**
 * Created by GYL on  Description: 项目列表
 */
import React, {Component} from 'react';
import {message, Card, Icon, Avatar, Row, Col, Tooltip, Menu, Dropdown, Divider, Popconfirm} from 'antd';
import {connect} from 'dva';
import request from '../../utils/request';
import Filtrate from '../../common/Filtrate';
import Container from '../../common/Container';
import PublicModal from '../../common/PublicModal';
import config from '../../config';
import MyIcon from "../../common/MyIcon";
import LH from '../../assets/icon/LH.ico';
import gitLab from '../../assets/icon/gitLab.ico';
import Rap from '../../assets/icon/Rap.ico';
import iconFont from '../../assets/icon/iconfont.ico';
import jenkins from '../../assets/icon/jenkins.ico';
import styles from './index.less';

const {Meta} = Card;

class ProjectList extends Component {
  state = {
    pageIndex: 1,
    pageSize: 10,
    total: 10,
    listData: [],
    tableLoading: false,
    modalBtnLoading: false,
    publicModal: false,
    modalTitle: '项目列表',
    modalType: '',
    record: {},
  };

  componentDidMount() {
    let t = this;
    t.onSubmit();
  };

  // 查询
  onSubmit = () => {
    let ret = this.f1.getForm().getFieldsValue();
    let params = {
      projectName: ret.projectName
    }
    request({url: '/projectManager/projectList/searchProject',method:'GET',params}).then(data =>{
      if (data.code === 0){
        let listData = [];
        if (data.data && data.data.length){
          listData = data.data
        }
        this.setState({
          listData
        })
      }else {
        message.error(data.err)
      }
    });
  };
  // 打开模态框
  onModalShow = (modalType, record) => {
    if (record) {
      this.setState({record})
    }
    this.setState({
      publicModal: true,
      modalType
    })
  };
  // 关闭模态框
  modalCancel = (type) => {
    this.setState({
      [type]: false,
      record: {}
    });
  };
  // 模态框保存
  onSave = (val) => {
    let {record, modalType} = this.state;
    this.setState({
      modalBtnLoading: true
    });
    val.id = (record && record.id) ? record.id : '';
    let url = '/projectManager/projectList/update';
    if (modalType === '新增')
      url = '/projectManager/projectList/save';

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
  // 删除事件
  onDelete = (id) => {
    let hide = message.loading('删除中...', 0);
    request({url: '/projectManager/projectList/delete', method: 'GET', params: {id}}).then(data => {
      if (data.code === 0) {
        message.success("删除成功！");
        this.onSubmit();
      } else {
        message.error(data.err)
      }
      hide()
    });
  };
  getMoreMenu = (items) => {
    let t = this;
    let listData = [
      {url: items.rapAddress, icon: Rap, text: '接口文档'},
      {url: items.lhAddress, icon: LH, text: '蓝湖'},
      {url: items.iconFontAddress, icon: gitLab, text: 'GitLab'},
      {url: items.gitLabAddress, icon: iconFont, text: '图标库'},
      {url: items.jenkinsFormalAddress, icon: jenkins, text: 'jenkins正'},
      {url: items.jenkinsTestAddress, icon: jenkins, text: 'jenkins测'},
    ];
    return (<Menu>
      {
        listData.map((item, index) => {
          if (item.url) {
            return (
              <Menu.Item key={index}>
                <div style={{display: 'flex', alignItems: 'center'}} onClick={t.onJump.bind(t, item.text,item.url)}>
                  <img src={item.icon} style={{width: 20, height: 20, marginRight: 6}} alt=""/>
                  <a>{item.text}</a>
                </div>
              </Menu.Item>
            )
          }
        })
      }
    </Menu>)
  };
  // 路由跳转
  onJump = (type, url) => {
    if (!url)
      return message.error(`${type} 地址暂无`);
    window.open(url,'modal');
  };
  render() {
    let t = this;
    let {record, listData, modalBtnLoading, publicModal, modalTitle, modalType} = t.state;
    // 查询条件配置项
    const items = [
      {
        type: 'input',
        label: '项目名称',
        paramName: 'projectName'
      },
    ];
    let disabled = modalType === "查看" ? true : false;
    // 模态框配置项
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
        label: '正式地址',
        paramName: 'formalAddress',
        initialValue: (record && record.formalAddress) ? record.formalAddress : null,
      },
      {
        type: 'input',
        label: '测试地址',
        paramName: 'testAddress',
        initialValue: (record && record.testAddress) ? record.testAddress : null,
      },
      {
        type: 'input',
        label: '接口文档',
        paramName: 'rapAddress',
        initialValue: (record && record.rapAddress) ? record.rapAddress : null,
      },
      {
        type: 'input',
        label: '蓝湖',
        paramName: 'lhAddress',
        initialValue: (record && record.lhAddress) ? record.lhAddress : null,
      },
      {
        type: 'input',
        label: 'GitLab',
        paramName: 'iconFontAddress',
        initialValue: (record && record.iconFontAddress) ? record.iconFontAddress : null,
      },
      {
        type: 'input',
        label: '图标库',
        paramName: 'gitLabAddress',
        initialValue: (record && record.gitLabAddress) ? record.gitLabAddress : null,
      },
      {
        type: 'input',
        label: 'jenkins(正)',
        paramName: 'jenkinsFormalAddress',
        initialValue: (record && record.jenkinsFormalAddress) ? record.jenkinsFormalAddress : null,
      },
      {
        type: 'input',
        label: 'jenkins(测)',
        paramName: 'jenkinsTestAddress',
        initialValue: (record && record.jenkinsTestAddress) ? record.jenkinsTestAddress : null,
      },
    ];
    return (
      <div>
        <Filtrate
          items={items}
          clearBtn={'hide'}
          ref={ref => this.f1 = ref}
          submit={t.onSubmit.bind(t, 1, 10)}
        />
        <Container
          addBtnShow={true}
          addBtn={t.onModalShow.bind(t, "新增", false)}>
          <div className={styles.container}>
            <Row gutter={12}>
              {
                listData && listData.length > 0 &&
                listData.map((item, index) => (
                    <Col span={4} key={index} className={styles.warp}>
                      <Card
                        hoverable={true}
                        actions={[
                          <Tooltip title="正式环境">
                            <span onClick={t.onJump.bind(t,"正式环境",item.formalAddress)}><MyIcon type={'icon-official-edition'}/> 正式</span>
                          </Tooltip>,
                          <Tooltip title="测试环境">
                            <span onClick={t.onJump.bind(t,"正式环境",item.testAddress)}><MyIcon type={'icon-ceshi'}/> 测试</span>
                          </Tooltip>,
                          <Tooltip title="更多">
                            <Dropdown overlay={this.getMoreMenu(item)} trigger={['click']} placement="bottomCenter">
                              <span><Icon type="ellipsis"/></span>
                            </Dropdown>
                          </Tooltip>]}
                      >
                        <Meta
                          avatar={<Avatar shape="square" size={'large'} src={item.testAddress ? item.testAddress + 'favicon.png': ''}/>}
                          title={<span style={{fontSize: '0.9vw'}}>{item.projectName}</span>}
                        />
                        <div className={styles.content}>
                          <Tooltip title="编辑">
                            <span onClick={t.onModalShow.bind(t, "编辑", item)}><MyIcon type={'icon-xiugai2'} style={{color: '#34bff9',fontSize:20}}/></span>
                          </Tooltip>
                          <Divider type="vertical" style={{margin:'0 4px'}}/>
                          <Tooltip title="删除">
                            <Popconfirm title="确认删除此项目？" onConfirm={t.onDelete.bind(t,item.id)}  placement="bottomRight" okText="Yes" cancelText="No">
                              <span><MyIcon type={'icon-quxiao'} style={{color: '#ff4916',fontSize:18}}/></span>
                            </Popconfirm>
                          </Tooltip>
                        </div>
                      </Card>
                    </Col>
                  )
                )
              }
            </Row>
          </div>

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
            onModalSave={t.onSave}
            onCancel={t.modalCancel.bind(t, 'publicModal')}
          />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ProjectList);
