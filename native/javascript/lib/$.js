// 一个简单的类jQuery库
(function () {
    const root = this;
    const previous$ = root.$
    const ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        nativeKeys = Object.keys,
        assign = Object.assign
    const extend = (...args) => {
        return assign.apply(null, args)
    }
    const bind = (fn, context) => {
        return (...args) => {
            return fn.apply(context, args);
        }
    }
    // 判断是否为类数组
    const isArrayLike = (obj) => {
        const length = obj.length
        if (!obj) return false
        if (length && typeof length === "number" && length > 0 && (length - 1) in obj) {
            return true
        }
        return false
    }
    // 遍历方法
    const each = (obj, fn, context) => {
        if (context) fn = bind(fn, context);
        const keys = !isArrayLike(obj) && nativeKeys(obj),
            length = (keys || obj).length
        for (let i = 0; i < length; i++) {
            const index = keys[i] || i
            fn(obj[index], index, obj);
        }
    }
    const map = (obj, fn, context) => {
        if (context) fn = bind(fn, context);
        const keys = !isArrayLike(obj) && nativeKeys(obj),
            length = (keys || obj).length,
            result = new Array(length);
        for (let i = 0; i < length; i++) {
            const index = keys[i] || i
            result[index] = fn(obj[index], index, obj);
        }
        return result;
    }
    const get = (obj, attrArr) => {
        return attrArr.reduce((result, attr) => {
            return result && result[attr] ? result[attr] : null
        }, obj)
    }
    const ready = (fn) => {
        document.addEventListener("DOMContentLoaded", (e) => {
            fn.call(fn, e);
        })
    }
    // jQuery构造函数
    const $ = jQuery = (dom) => {
        return new $.fn._init(dom)
    }
    $.fn = $.prototype = {
        constructor: $,
        _init: function (dom) {
            if(typeof dom == "object" && dom === window) {
                this.element = dom;
                return this;
            }
            if (this.isDOM(dom)) {
                this.element = dom;
            } else {
                this.element = document.querySelectorAll(dom);
            }
            return this;
        },
        _getQueryType: function (queryString) {
            let type = ""
            switch (queryString.slice(0, 1)) {
                case "#":
                    type = "id";
                    break;
                case ".":
                    type = "className";
                    break;
                default:
                    type = "nodeName"
            }
            return type;
        },
        contains: function (str1, str2) {
            if (str1.indexOf(str2) < 0) {
                return false
            }
            return true
        },
        get: function (index) {
            const length = this.element.length;
            if (length === undefined) {
                return this.element
            }
            index = index < 0 ? 0 : index > length - 1 ? length - 1 : index;
            this.element = this.element[index];
            return this
        },
        getAttr: function (attr) {
            return this.element.getAttribute(attr)
        },
        isFunction: function (obj) {
            if (typeof obj === "function") {
                return true
            }
            return false
        },
        isDOM: function (obj) {
            if (!obj) {
                return false
            }
            // 如果是querySelector和getElementById获取到的dom
            if (!obj.length) {
                return obj instanceof HTMLElement;
            }
            // 如果是DOM List（这里只判断了第一个是不是HTMLElement）
            return obj[0] instanceof HTMLElement;
        },
        on: function (eventType, delegateDOM, fn) {
            const domType = this._getQueryType(delegateDOM);
            let domArr;
            if (this.isFunction(delegateDOM)) {
                fn = delegateDOM
                delegateDOM = null
            }
            if (!this.element.length) {
                domArr = [this.element];
            } else {
                domArr = ArrayProto.slice.call(this.element, 0);
            }
            domArr.forEach((dom, i) => {
                dom.addEventListener && dom.addEventListener(eventType, (event) => {
                    if (!delegateDOM) {
                        fn.call(dom, event);
                        return;
                    }
                    if (domType === "className" && this.contains(event.target[domType], delegateDOM.substr(1))) {
                        fn.call(dom, event);
                        return;
                    }
                    if (domType === "id" && event.target[domType] === delegateDOM.substr(1)) {
                        fn.call(dom, event);
                        return;
                    }
                    if (event.target[domType] === delegateDOM) {
                        fn.call(dom, event);
                        return;
                    }
                })
            })
            return this;
        },
        _baseClassFunc: function (sign) {
            return (...args) => {
                const classList = this.element && this.element.classList;
                each(args, (className) => {
                    if (sign > 0 && !classList.contains(className)) {
                        classList.add(className);
                    }
                    if (sign < 0 && classList.contains(className)) {
                        classList.remove(className);
                    }
                })
                return this;
            };
        },
        addClass: function () {
            return this._baseClassFunc(1).apply(this, arguments)
        },
        removeClass: function () {
            return this._baseClassFunc(-1).apply(this, arguments)
        },
        uniqueClass: function (className) {
            if (!this.element) return;
            const children = this.element.parentNode && this.element.parentNode.children
            each(children, (childNode) => {
                $(childNode).removeClass(className);
            })
            $(this.element).addClass(className);
        }
    }
    extend($, {
        get: get,
        ready: ready,
        extend: extend,
        bind: bind,
        isArrayLike: isArrayLike,
        each: each,
        map: map,
        noConflict: function() {
            root.$ = previous$
            return this;
        }
    })
    $.fn._init.prototype = $.fn
    root.$ = $
}.call(this))
