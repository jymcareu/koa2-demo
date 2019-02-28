/**
 * Created by wupeng on 2017//9.
 */
import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'dva/router';
import {connect} from 'dva';
import MyIcon from '../common/MyIcon';
import styles from './LeftNav.less';
const SubMenu = Menu.SubMenu;
let navSettings = [
  {
    title: '项目列表',
    url: 'projectList',
    key: '1',
    icon: 'icon-function',
  },
  {
    title: '服务器列表',
    url: 'serverList',
    key: '2',
    icon: 'icon-jichushijianfenlei',
  },
];

class LeftNav extends Component {
  state = {
    current: '1',
    openKeys: [],
    setNavTop: '' // 导航样式
  };

  componentDidMount () {
    let t = this;
    t.getAddress();
  }

  // 获取路由
  getAddress = () => {
    let address = window.location.href.substring(window.location.href.lastIndexOf('/')+1, window.location.href.length);
    let current = '';
    let openKeys = [];
    navSettings.map((item, index) => {
      if (item.url&&(item.url === address)){
        current = item.key;
        openKeys.push(item.key)
      }
      item.sub&&item.sub.map((itemSub, index) => {
        if (itemSub.url&&(itemSub.url === address)){
          current = itemSub.key;
          openKeys.push(item.key,itemSub.key)
        }
        itemSub.sub&&itemSub.sub.map((itemSubSub, index) => {
          if (itemSubSub.url&&(itemSubSub.url === address)){
            current = itemSubSub.key;
            openKeys.push(item.key,itemSub.key,itemSubSub.key)
          }
        })
      })
    });
    this.setState({
      current,
      openKeys
    });
  };

  // 控制左边导航栏只展示一个父节点
  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (latestOpenKey && latestOpenKey.length > 2) {
      let [firstKey, ...all] = this.state.openKeys;
      let nextKeys = openKeys.pop();
      this.setState({
        openKeys: [firstKey, nextKeys]
      });
    } else {
      let rootSubmenuKeys = [];
      navSettings.map((item, index) => {
        rootSubmenuKeys.push(item.key);
      });
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.setState({openKeys});
      } else {
        this.setState({
          openKeys: latestOpenKey ? [latestOpenKey] : [],
        });
      }
    }
  };
  handleClick = (e) => {
    this.setState({current: e.key});
  };
  onChangeLink = (url) => {
    window.open(`${url}`)
  };

  render () {
    let t = this;
    let {collapsed} = this.props;
    return (
      <div className={styles.nav}>
        {
          collapsed &&
          <Menu
            theme="dark"
            mode={'vertical'}
            selectedKeys={[this.state.current]}
            onClick={this.handleClick.bind(t)}
          >
            {
              navSettings.map((item, index1) => {
                if (!item.sub) {
                  return (
                    <Menu.Item key={item.key}>
                      {
                        item.url ?
                          <Link to={item.url}>
                            <MyIcon className={styles.navItem} type={item.icon}/>
                            <span className="wp-nav-font">{item.title}</span>
                          </Link>
                          :
                          <span onClick={item.aLink ? t.onChangeLink.bind(t, item.aLink) : null}>
                            <MyIcon className={styles.navItem} type={item.icon}/>
                            <span className="wp-nav-font">{item.title}</span>
                          </span>
                      }
                    </Menu.Item>
                  )
                } else {
                  return (
                    <SubMenu
                      key={item.key}
                      title=
                        {
                          item.url ?
                            <Link to={item.url}>
                        <span>
                          <MyIcon type={item.icon} className={styles.navItem}/>
                          <span className="wp-nav-font">{item.title}</span>
                        </span>
                            </Link>
                            :
                            <span>
                              <MyIcon type={item.icon} className={styles.navItem}/>
                          <span className="wp-nav-font">{item.title}</span>
                        </span>
                        }
                    >
                      {
                        item.sub &&
                        item.sub.map((subItem, index2) => {
                          if (!subItem.sub) {
                            return (
                              <Menu.Item key={subItem.key}>
                                <Link to={subItem.url}>
                                  <MyIcon className={styles.subNavItem} type={subItem.icon}/>
                                  {subItem.title}
                                </Link>
                              </Menu.Item>
                            )
                          } else {
                            return (
                              <SubMenu key={subItem.key}
                                       title={<span>
                                         <MyIcon className={styles.subNavItem} type={subItem.icon}/>
                                         <span>{subItem.title}</span></span>}>
                                {
                                  subItem.sub &&
                                  subItem.sub.map((subItem2, index3) => {
                                    return (
                                      <Menu.Item key={subItem2.key} id={subItem2.key}>
                                        <Link to={subItem2.url}> {subItem2.title} </Link>
                                      </Menu.Item>
                                    );
                                  })
                                }
                              </SubMenu>
                            )
                          }
                        })
                      }
                    </SubMenu>
                  )
                }
              })
            }
          </Menu>
        }
        {
          !collapsed &&
          <Menu
            theme="dark"
            mode={'inline'}
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            selectedKeys={[this.state.current]}
            onClick={this.handleClick.bind(t)}
          >
            {
              navSettings.map((item) => {
                if (!item.sub) {
                  return (
                    <Menu.Item key={item.key}>
                      {
                        item.url ?
                          <Link to={item.url}>
                            <MyIcon className={styles.navItem} type={item.icon}/>
                            <span className="wp-nav-font">{item.title}</span>
                          </Link>
                          :
                          <span onClick={item.aLink ? t.onChangeLink.bind(t, item.aLink) : null}>
                            <MyIcon className={styles.navItem} type={item.icon}/>
                            <span className="wp-nav-font">{item.title}</span>
                          </span>
                      }
                    </Menu.Item>
                  )
                } else {
                  return (
                    <SubMenu
                      key={item.key}
                      title=
                        {
                          item.url ?
                            <Link to={item.url}>
                        <span>
                          <Icon type='user'/>
                          <span className="wp-nav-font">{item.title}</span>
                        </span>
                            </Link>
                            :
                            <span>
                              <MyIcon className={styles.navItem} type={item.icon}/>
                          <span className="wp-nav-font">{item.title}</span>
                        </span>
                        }
                    >
                      {
                        item.sub &&
                        item.sub.map((subItem) => {
                          if (!subItem.sub) {
                            return (
                              <Menu.Item key={subItem.key}>
                                <Link to={subItem.url}>
                                  <MyIcon className={styles.subNavItem} type={subItem.icon}/>
                                  {subItem.title}
                                </Link>
                              </Menu.Item>
                            )
                          } else {
                            return (
                              <SubMenu key={subItem.key}
                                       title={<span>
                                         <MyIcon className={styles.subNavItem} type={subItem.icon}/>
                                         <span>{subItem.title}</span></span>}>
                                {
                                  subItem.sub &&
                                  subItem.sub.map((subItem2, index3) => {
                                    return (
                                      <Menu.Item key={subItem2.key} id={subItem2.key}>
                                        <Link to={subItem2.url}> {subItem2.title} </Link>
                                      </Menu.Item>
                                    );
                                  })
                                }
                              </SubMenu>
                            )
                          }
                        })
                      }
                    </SubMenu>
                  )
                }
              })
            }
          </Menu>
        }
      </div>

    );
  }
}

function mapStateToProps (state) {
  return {
    // user: state.login.user
  };
}

export default connect(mapStateToProps)(LeftNav);
