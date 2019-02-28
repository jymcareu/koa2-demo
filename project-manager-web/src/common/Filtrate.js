/**
 * 表格上方筛选条件
 * input 输入框, select 下拉选, rangePicker 时间筛选框
 */
import {Form, Input, Select, Button, DatePicker, Row, Col, TreeSelect, Checkbox, Radio} from 'antd';
import React, {Component} from 'react';
import moment from 'moment';
import config from '../config';
import Util from '../utils/Util';
import styles from './Filtrate.less';
import MyIcon from '../common/MyIcon';
const {RangePicker, MonthPicker} = DatePicker;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

function disabledDate(current) {
  // 当天以后时间禁选,组件传值   disabledDate:true
  return current && current.valueOf() > Date.now();
}

class Filtrate extends Component {
  state = {
    myRangePickerValue: null,
    myRangePickerParamName: '',
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  componentDidMount() {
    let t = this;
    t.setState({
      params: t.props.form.getFieldsValue()
    });
  }

  submit() {
    let t = this;
    // Form 组件参数
    let params = t.props.form.getFieldsValue();
    if (this.state.myRangePickerValue && this.state.myRangePickerParamName)
      params[this.state.myRangePickerParamName] = this.state.myRangePickerValue;
    let {submit} = t.props;
    submit(params);
  }

  // 清空 Form 组件输入的内容
  clearForm() {
    let t = this;
    if (t.props.isMyClear === true) {
      let {myClearBtn} = t.props;
      t.props.form.resetFields();
      myClearBtn();
    } else {
      t.props.form.resetFields();
    }

  }

  //设置错误事件
  showError=(name)=>{
    const {setFields,getFieldValue,setFieldsValue} = this.props.form;
    console.log(getFieldValue(name));
    setFieldsValue({[name]:[moment().add(-1, 'weeks'),moment()]});
    setFields({
      [name]:{
        value:[moment().add(-1, 'weeks'),moment()],
        errors:[new Error('时间跨度请不要超过1周')]
      }
    });
  };
  // 额外按钮点击事件
  extraBtnClick(btnIndex) {
    let t = this;
    let funNameStr = t.props.extraBtn[btnIndex].funName;
    t.props[funNameStr]();
  }

  // 搜索下方按钮点击事件
  underBtnClick(btnIndex, funName) {
    let t = this;
    if (funName)
      t.props[funName]();
  }

  selectedChange(fun, nextParams, paramName, value) {
    let t = this;
    let params = {};
    params[paramName] = value;
    if (paramName) {
      t.setState({params});
    }
    if (typeof fun === "function") {
      fun(value);
      if (nextParams)
        t.props.form.setFieldsValue({
          [nextParams]: ''
        })
    }
  }
  // 月份选择
  onChangeMonth = (paramName,type) => {
    let t = this;
    let oldDate = t.props.form.getFieldValue(paramName);
    let date;
    if (type === 'up'){
      date = moment(oldDate).subtract(1, 'months');
    }else {
      date = moment(oldDate).add(1, 'months');
    }
    t.props.form.setFieldsValue({
      [paramName]: date
    })
  };
  // 筛选条件组件change事件
  getChangeValue(value, e) {
    let t = this;
    let params = {};
    params[value] = e.target.value;
    t.setState({params});
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = (value) => {
    this.onChange('startValue', value);
  };

  onEndChange = (value) => {
    this.onChange('endValue', value);
  };
  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  };

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  };
  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  //获取自定义rangePicker值
  getMyRangePickerValue = (paramName, value) => {
    this.setState({
      myRangePickerValue: value,
      myRangePickerParamName: paramName,
    })
  };
  resetSelectValue = (name) => {
    this.props.form.resetFields(name)
  };

  render() {
    let t = this;
    let {items, underItems} = t.props;
    let extraBtn = t.props.extraBtn || [];
    let {getFieldDecorator} = t.props.form;
    // 是否显示清空按钮 默认显示
    let clearBtnShow = true;
    if (t.props.clearBtn === 'hide') {
      clearBtnShow = false;
    }
    // 是否显示查询按钮 默认显示
    let submitBtnShow = true;
    if (t.props.submitBtn === 'hide') {
      submitBtnShow = false;
    }
    return (
      <Row gutter={10} className={this.props.className}>
        <Col span={this.props.sub ? 20 : 24}>
          <div className={styles.base}>
            {/*<div className={`${styles.base} ${underItems ? styles.hashUnderBtn : ''}`}>*/}
            <Form layout="inline" key="myForm">
              {
                items && items.map((item, index) => {
                  if (item.type === 'input') {
                    return (<FormItem label={item.label} key={index} className={item.className}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: item.initialValue ? item.initialValue : '',
                          rules: item.rules || null
                        })(
                          <Input onChange={t.getChangeValue.bind(t, item.paramName)} size={config.size}
                                 placeholder={item.placeholder} disabled={item.disabled}/>
                        )
                      }
                    </FormItem>)
                  }else if (item.type === 'radio') {
                    return (
                      <FormItem label={item.label} key={index} className={item.className}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: item.initialValue ? item.initialValue : '',
                          rules: item.rules || null
                        })(
                          <RadioGroup>
                            {
                              item.options.map((option, index) => {
                                return (
                                  <Radio key={index} value={Util.numToString(option.value)}
                                  >
                                    {option.text}
                                  </Radio>

                                )
                              })
                            }
                          </RadioGroup>
                        )
                      }
                    </FormItem>)
                  } else if (item.type === 'select') {
                    return (<FormItem label={item.label} key={index} className={item.className}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: item.initialValue || (item.options[0] ? Util.numToString(item.options[0].value) : item.options[0]),
                        })(
                          <Select
                            size={config.size}
                            labelInValue={item.labelInValue}
                            showSearch
                            mode={item.mode}
                            style={item.style ? {width: '200px'} : {}}
                            optionFilterProp="children"
                            dropdownMatchSelectWidth={t.props.dropdownMatchSelectWidth}
                            onChange={t.selectedChange.bind(t, item.selectChange, item.nextParamName || false, item.paramName)}
                            disabled={item.disabled}
                          >
                            {
                              item.options.map((option, index) => {
                                return (
                                  <Select.Option key={index}
                                                 value={Util.numToString(option.value)}
                                  >
                                    {option.text}
                                  </Select.Option>

                                )
                              })
                            }
                          </Select>
                        )
                      }
                    </FormItem>)
                  } else if (item.type === 'treeSelect') {
                    return (
                      <FormItem key={item.paramName} label={item.label} colon={item.colon}>
                        {
                          getFieldDecorator(item.paramName, {
                            initialValue: item.initialValue || '',
                            rules: item.rules || []
                          })(
                            <TreeSelect
                              size={config.size}
                              onChange={item.onChange}
                              disabled={item.disabled}
                              treeData={item.options}
                              treeCheckable={item.treeCheckable}
                              onSelect={item.onSelect}
                            />
                          )}
                      </FormItem>
                    )
                  } else if (item.type === 'rangePicker') {

                    let disabled = item.disabledDate ? disabledDate : null;

                    return (<FormItem className={styles['range-picker']} label={item.label}
                                      key={index}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: item.initialValue === null ? null : (item.initialValue && item.initialValue.length === 2 ? [moment(item.initialValue[0]), moment(item.initialValue[1])] : [moment().add(-1, 'months'), moment()]),
                          rules: item.rules
                        })(
                          <RangePicker
                            showTime={item.showTime}
                            style={{width: item.width}}
                            format={item.format}
                            size={config.size}
                            onChange={item.onChange}
                            disabledDate={item.disabledDate}
                            disabled={item.disabled}
                            ranges={item.ranges}
                          >
                          </RangePicker>
                        )
                      }
                    </FormItem>)
                  } else if (item.type === 'datePicker') {
                    let disabled = item.disabledDate ? disabledDate : null;
                    return (<FormItem className={styles.datePicker} label={item.label}
                                      key={index}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: item.initialValue ? item.initialValue : null
                        })(
                          <div>
                            {item.hasOpen ?
                              <DatePicker size={config.size}
                                          showTime={item.showTime}
                                          onChange={item.onChange}
                                          format={item.format}
                                          open={item.open}
                                          onOpenChange={item.onOpenChange}
                                          disabledDate={item.disabledDate}
                                          disabledTime={item.disabledTime}
                                          disabled={item.disabled}/> :
                              <DatePicker size={config.size}
                                          showTime={item.showTime}
                                          onChange={item.onChange}
                                          format={item.format}
                                          onOpenChange={item.onOpenChange}
                                          disabledDate={item.disabledDate}
                                          disabledTime={item.disabledTime}
                                          disabled={item.disabled}/>}
                          </div>
                        )
                      }
                    </FormItem>)
                  } else if (item.type === 'monthPicker') {
                    return (
                      <span key={index} style={{lineHeight:2.6}}>
                        <FormItem label={<span>{item.label} : <MyIcon title={'上一个月'} type={'icon-xiangshang'} style={{cursor:'pointer',color:'#1890ff',fontSize:15}} onClick={t.onChangeMonth.bind(t,item.paramName,'up')} /></span>}
                                  colon={false}>
                          {
                            getFieldDecorator(item.paramName, {
                              initialValue: item.initialValue ? item.initialValue : moment()
                            })(
                              <MonthPicker
                                size={config.size}
                                allowClear={item.allowClear}
                                onChange={t.selectedChange.bind(t, item.selectChange)}
                              />
                            )
                          }
                        </FormItem>
                        <MyIcon title={'下一个月'} type={'icon-xiangxia'} style={{cursor:'pointer',color:'#1890ff',fontSize:15,paddingLeft:6}} onClick={t.onChangeMonth.bind(t,item.paramName,'down')} />
                      </span>
                    )
                  } else if (item.type === 'monthRang') {
                    return (
                      <FormItem label={item.label}
                                key={index}>
                        {
                          getFieldDecorator(item.paramName, {
                            initialValue: item.initialValue || moment().add(-1, 'months')
                          })(
                            <MonthPicker
                              allowClear={false}
                              format="YYYY-MM"
                              disabledDate={this.disabledStartDate}
                              value={this.state.startValue}
                              onChange={this.onStartChange.bind(this)}
                              onOpenChange={this.handleStartOpenChange.bind(this)}
                              size={config.size}>
                            </MonthPicker>
                          )
                        }
                        {
                          getFieldDecorator(item.paramName2, {
                            initialValue: item.initialValue || moment()
                          })(
                            <MonthPicker
                              format="YYYY-MM"
                              disabledDate={this.disabledEndDate}
                              onChange={this.onEndChange.bind(this)}
                              open={this.state.endOpen}
                              value={this.state.endValue}
                              onOpenChange={this.handleEndOpenChange.bind(this)}
                              size={config.size}>
                            </MonthPicker>
                          )
                        }
                      </FormItem>
                    )
                  } else if (item.type === 'selectMultiple') {
                    return (<FormItem label={item.label} key={index} className={item.className}>
                      {
                        getFieldDecorator(item.paramName, {
                          initialValue: [],
                        })(
                          <Select
                            size={config.size}
                            showSearch
                            mode="multiple"
                            optionFilterProp="children"
                          >
                            {
                              item.options.map((option, index) => {
                                return (
                                  <Select.Option key={index}
                                                 value={Util.numToString(option.value)}
                                  >
                                    {option.text}
                                  </Select.Option>

                                )
                              })
                            }
                          </Select>
                        )
                      }
                    </FormItem>)
                  }

                })
              }
              {(submitBtnShow || clearBtnShow) && <FormItem>
                { submitBtnShow &&
                <Button size={config.size}
                        type="primary"
                        onClick={t.submit.bind(t)}
                        className={styles.button}
                >
                  查询
                </Button>
                }
                {
                  clearBtnShow &&
                  <Button size={config.size}
                          style={{marginLeft: 20}}
                          type="primary"
                          className={styles.button}
                          onClick={t.clearForm.bind(t)}
                  >
                    重置
                  </Button>
                }
              </FormItem>}

              {
                extraBtn.map((btn, btnIndex) => {
                  return (
                    <FormItem key={btnIndex}>
                      <Button size={config.size}
                              type="primary"
                              onClick={t.extraBtnClick.bind(t, btnIndex, btn.funName)}
                      >
                        {btn.name}
                      </Button>
                    </FormItem>
                  )
                })
              }
              {
                underItems &&
                <div className={styles.underBtn}>
                  {
                    underItems.map((btn, btnIndex) => {
                      if (btn.type === 'button') {
                        return (
                          <FormItem key={btnIndex}>
                            {
                              btn.label ? `${btn.label} :` : ''
                            }
                            {
                              btn.btnList.map((btns, btnsIndex) => {
                                return (
                                  <Button key={btnsIndex}
                                          size={config.size}
                                          style={{marginLeft: 20, ...btns.style}}
                                          onClick={t.underBtnClick.bind(t, btnsIndex, btns.funName)}
                                  >
                                    {btns.name}
                                  </Button>
                                )
                              })
                            }
                          </FormItem>
                        )
                      } else if (btn.type === 'rangePicker') {

                        let disabled = btn.disabledDate ? disabledDate : null;

                        return (<FormItem className={`${styles['range-picker']} ${btn.className}`} label={btn.label}
                                          key={btnIndex}>
                          {
                            getFieldDecorator(btn.paramName, {
                              initialValue: btn.initialValue === null ? null : [moment().add(-1, 'months'), moment()]
                            })(
                              <RangePicker
                                showTime={btn.showTime}
                                format={btn.format}
                                size={config.size} disabledDate={disabled}>
                              </RangePicker>
                            )
                          }
                        </FormItem>)
                      } else if (btn.type === 'treeSelect') {
                        return (
                          <FormItem colon={btn.colon} key={btnIndex} label={btn.label} className={btn.className}>
                            {
                              getFieldDecorator(btn.paramName, {
                                initialValue: btn.initialValue || '',
                                rules: btn.rules || []
                              })(
                                <TreeSelect
                                  size={config.size}
                                  onChange={btn.onChange}
                                  disabled={btn.disabled}
                                  treeData={btn.options}
                                  style={btn.styles || {}}
                                  treeCheckable={btn.treeCheckable}
                                  onSelect={btn.onSelect}
                                />
                              )}
                          </FormItem>
                        )
                      } else if (btn.type === 'span') {
                        return (
                          <span className={styles.afterspan}>{btn.content}</span>
                        );
                      } else if (btn.type === 'input') {
                        return (<FormItem label={btn.label} key={btnIndex} className={btn.className}>
                          {
                            getFieldDecorator(btn.paramName, {
                              initialValue: btn.initialValue ? btn.initialValue : '',
                              rules: btn.rules || null
                            })(
                              <Input onChange={t.getChangeValue.bind(t, btn.paramName)} size={config.size}
                                     placeholder={btn.placeholder}/>
                            )
                          }
                        </FormItem>)
                      } else if (btn.type === 'select') {
                        return (<FormItem label={btn.label} key={btnIndex} style={{width: 300}}>
                          {
                            getFieldDecorator(btn.paramName, {
                              initialValue: btn.initialValue ? btn.initialValue : (btn.options[0] ? Util.numToString(btn.options[0].value) : btn.options[0]),
                            })(
                              <Select
                                size={config.size}
                                showSearch
                                mode={btn.mode}
                                style={btn.style}
                                optionFilterProp="children"
                                dropdownMatchSelectWidth={t.props.dropdownMatchSelectWidth}
                                dropdownStyle={btn.styles}
                                onChange={t.selectedChange.bind(t, btn.selectChange, btn.nextParamName || false, btn.paramName)}
                              >
                                {
                                  btn.options.map((option, index) => {
                                    return (
                                      <Select.Option key={index}
                                                     value={Util.numToString(option.value)}
                                      >
                                        {option.text}
                                      </Select.Option>

                                    )
                                  })
                                }
                              </Select>
                            )
                          }
                        </FormItem>)
                      } else if (btn.type === 'checkbox') {
                        return (<FormItem label={btn.label} key={btnIndex} className={btn.className}>
                          {
                            getFieldDecorator(btn.paramName, {
                              initialValue: btn.initialValue || [],
                              rules: btn.rules || null
                            })(
                              <Checkbox.Group
                                className={styles.checkbox}
                                options={btn.options}
                              />
                            )
                          }
                        </FormItem>)
                      } else if (btn.type === 'datePicker') {
                        let disabled = btn.disabledDate ? disabledDate : null;
                        return (<FormItem className={btn.className} label={btn.label}
                                          key={btnIndex}>
                          {
                            getFieldDecorator(btn.paramName, {
                              initialValue: btn.initialValue ? btn.initialValue : null
                            })(
                              <DatePicker size={config.size} disabledDate={disabled}/>
                            )
                          }
                        </FormItem>)
                      }

                    })
                  }
                </div>
              }
            </Form>
          </div>
        </Col>
      </Row>

    )
  }
}

export default  Form.create()(Filtrate);
