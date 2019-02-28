/**
 * Created by wadeforever on 2017/5/5.
 */
export default class Util {
    static isUndefined (value) {
        return typeof value === 'undefined';
    }

    static isDefined (value) {
        return typeof value !== 'undefined';
    }

    static isObject (value) {
        // http://jsperf.com/isobject4
        return value !== null && typeof value === 'object';
    }

    static isString (value) {
        return typeof value === 'string';
    }

    static isNumber (value) {
        return typeof value === 'number';
    }

    static isDate (value) {
        return toString.call(value) === '[object Date]';
    }

    static isFunction (value) {
        return typeof value === 'function';
    }

    static isRegExp (value) {
        return toString.call(value) === '[object RegExp]';
    }

    static isBoolean (value) {
        return typeof value === 'boolean';
    }

    static isElement (node) {
        return !!(node &&
        (node.nodeName  // we are a direct element
        || (node.prop && node.attr && node.find)));  // we have an on and find method part of jQuery API
    }

    static isArray = Array.isArray

    /**
     * 数字转字符串
     */
    static numToString (num) {
        if (Util.isNumber(num)) {
            return num + '';
        } else {
            return num;
        }
    }

}
