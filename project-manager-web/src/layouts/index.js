import React, {Component}from 'react';
import {Layout, LocaleProvider, Icon} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import styles from './index.less';
import LeftNav from './LeftNav';
import PublicService from "../services/PublicService";
const logoB = require('../assets/logoB.png');
const logoS = require('../assets/logoS.png');
const {Header, Sider, Content} = Layout;

class App extends Component {

  state = {
    collapsed: false
  };

  componentDidMount() {
    let electron = PublicService.getQueryString('electron');
    if (electron){
      this.setState({
        collapsed: true
      })
    }
  };

  componentWillReceiveProps(nextProps) {
  }



  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Layout>
          <Sider
            width="224"
            className={styles.sider}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className={styles.logo}>
              {
                this.state.collapsed ? <img src={logoS} style={{width: '90%',height: "90%",marginLeft: '15%'}}/> : <img src={logoB} style={{width: '100%',height: "90%"}}/>
              }
            </div>
            <LeftNav collapsed={this.state.collapsed}/>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <div className={styles.trigger} onClick={this.toggle}>
                <Icon
                  style={{color: '#46DAFF', fontSize: 18}}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                />
              </div>
            </Header>
            <Content>
              <div className={styles.content}>
                {this.props.children || <h1>此处为你的组件</h1>}
              </div>
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>
    );
  }
}
export default App;
