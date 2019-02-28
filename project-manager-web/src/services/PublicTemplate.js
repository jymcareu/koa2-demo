/**
 * Created by win7 on 2017/11/22.
 */
import moment from 'moment';
export default class PublicTemplate {

  /**
   * 文本内容超出部分省略号显示
   * @param text 文本内容
   * @param lens 要省略文本长度(不传默认为10)
   */
  static stringToEllipsis = (text, lens) => {
    let textCopy = text;
    let len = lens ? lens : 10;
    text = text ? (text.length > len ? text.substr(0, len - 1) + '...' : text) : '--';
    return (
      <span title={textCopy}> {text} </span>
    )
  }
  /**
   * 文本内容超出部分省略号显示
   * @param text 时间戳
   * @param type 转换格式(默认为YYYY-MM-DD)
   */
  static setTime = (text, type) => {
    if (text) {
      let len = type ? type : 'YYYY-MM-DD';
      return (
        <span> {moment(text).format(len)} </span>
      )
    } else {
      return <span>--</span>
    }

  }

}
