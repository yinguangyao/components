webpackJsonp([0],{

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(30);


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(12);

var _TabPage = __webpack_require__(41);

var _TabPage2 = _interopRequireDefault(_TabPage);

__webpack_require__(47);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_TabPage2.default, null), document.getElementById("app"));

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Tabs = __webpack_require__(42);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabPane = __webpack_require__(46);

var _TabPane2 = _interopRequireDefault(_TabPane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo: 增加选项卡删除、增加等功能，兼容移动端触摸事件
var TabPage = function TabPage() {
    return _react2.default.createElement(
        _Tabs2.default,
        { defaultKey: 1 },
        _react2.default.createElement(
            _TabPane2.default,
            { currentKey: 0, title: '\u9009\u9879\u53611' },
            _react2.default.createElement(
                'div',
                { className: 'pane-content' },
                '\u8FD9\u662F\u9009\u9879\u53611'
            )
        ),
        _react2.default.createElement(
            _TabPane2.default,
            { currentKey: 1, title: '\u9009\u9879\u53612' },
            _react2.default.createElement(
                'div',
                { className: 'pane-content' },
                '\u8FD9\u662F\u9009\u9879\u53612'
            )
        ),
        _react2.default.createElement(
            _TabPane2.default,
            { currentKey: 2, title: '\u9009\u9879\u53613' },
            _react2.default.createElement(
                'div',
                { className: 'pane-content' },
                '\u8FD9\u662F\u9009\u9879\u53613'
            )
        )
    );
};
exports.default = TabPage;

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _TabContent = __webpack_require__(43);

var _TabContent2 = _interopRequireDefault(_TabContent);

var _classnames = __webpack_require__(18);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function noop() {}

var Tabs = function (_React$PureComponent) {
    _inherits(Tabs, _React$PureComponent);

    function Tabs(props) {
        _classCallCheck(this, Tabs);

        var _this = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, props));

        _this.changeTab = function (currentKey) {
            var _this$props$onSelect = _this.props.onSelect,
                onSelect = _this$props$onSelect === undefined ? noop : _this$props$onSelect;

            _this.setState({
                activeKey: currentKey
            });
            onSelect(currentKey);
            console.log("you have selected current key: " + currentKey);
        };

        _this.state = {
            activeKey: _this.props.defaultKey || 0
        };
        return _this;
    }

    _createClass(Tabs, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.defaultKey != this.props.defaultKey) {
                this.setState({
                    activeKey: nextProps.defaultKey || 0
                });
            }
        }
        // 这里对currentKey做了mapping，便于以后计算

    }, {
        key: 'getIndexMapping',
        value: function getIndexMapping() {
            var _this2 = this;

            var _props = this.props,
                _props$defaultKey = _props.defaultKey,
                defaultKey = _props$defaultKey === undefined ? 0 : _props$defaultKey,
                _props$onSelect = _props.onSelect,
                onSelect = _props$onSelect === undefined ? noop : _props$onSelect,
                children = _props.children;

            var mapping = {
                activeIndex: "",
                keys: []
            };
            _react2.default.Children.map(children, function (child, i) {
                if (i == _this2.state.activeKey) {
                    mapping.activeIndex = i;
                }
                mapping.keys.push(child.props && child.props.currentKey);
            });
            return mapping;
        }
    }, {
        key: 'getDeviceWidth',
        value: function getDeviceWidth() {
            var rect = document.body.getBoundingClientRect();
            return rect.right - rect.left - 20;
        }
    }, {
        key: 'renderNav',
        value: function renderNav() {
            var _this3 = this;

            var _props2 = this.props,
                _props2$defaultKey = _props2.defaultKey,
                defaultKey = _props2$defaultKey === undefined ? 0 : _props2$defaultKey,
                _props2$onSelect = _props2.onSelect,
                onSelect = _props2$onSelect === undefined ? noop : _props2$onSelect,
                children = _props2.children;

            return _react2.default.createElement(
                'ul',
                { className: 'tab-nav-list' },
                _react2.default.Children.map(children, function (child, i) {
                    var _child$props = child.props,
                        _child$props$currentK = _child$props.currentKey,
                        currentKey = _child$props$currentK === undefined ? i : _child$props$currentK,
                        _child$props$title = _child$props.title,
                        title = _child$props$title === undefined ? "" : _child$props$title;

                    return _react2.default.createElement(
                        'li',
                        {
                            className: (0, _classnames2.default)("tab-nav-item", { "cur": _this3.state.activeKey == currentKey }),
                            key: currentKey,
                            onTouchStart: function onTouchStart() {
                                return _this3.changeTab(currentKey);
                            },
                            onTransitionEnd: function onTransitionEnd() {
                                console.log("end");
                            }
                        },
                        title
                    );
                })
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                _props3$defaultKey = _props3.defaultKey,
                defaultKey = _props3$defaultKey === undefined ? 1 : _props3$defaultKey,
                _props3$onSelect = _props3.onSelect,
                onSelect = _props3$onSelect === undefined ? noop : _props3$onSelect,
                children = _props3.children,
                _props3$width = _props3.width,
                width = _props3$width === undefined ? this.getDeviceWidth() : _props3$width,
                _props3$isCirculate = _props3.isCirculate,
                isCirculate = _props3$isCirculate === undefined ? true : _props3$isCirculate;
            // if(children.length < 1) return null

            return _react2.default.createElement(
                'div',
                { className: 'tabs' },
                _react2.default.createElement(
                    'div',
                    { style: { overflow: "hidden" } },
                    this.renderNav(),
                    _react2.default.createElement(
                        _TabContent2.default,
                        {
                            activeKey: this.state.activeKey,
                            onSelect: onSelect,
                            width: width,
                            changeTab: this.changeTab,
                            isCirculate: isCirculate
                        },
                        children
                    )
                )
            );
        }
    }]);

    return Tabs;
}(_react2.default.PureComponent);

exports.default = Tabs;

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _lodash = __webpack_require__(17);

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabContent = function (_React$PureComponent) {
    _inherits(TabContent, _React$PureComponent);

    function TabContent(props) {
        _classCallCheck(this, TabContent);

        var _this = _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

        _this.handleChildren = function () {
            var _this$props = _this.props,
                _this$props$activeKey = _this$props.activeKey,
                activeKey = _this$props$activeKey === undefined ? 1 : _this$props$activeKey,
                _this$props$onSelect = _this$props.onSelect,
                onSelect = _this$props$onSelect === undefined ? noop : _this$props$onSelect,
                children = _this$props.children,
                width = _this$props.width,
                _this$props$isCircula = _this$props.isCirculate,
                isCirculate = _this$props$isCircula === undefined ? true : _this$props$isCircula;

            var length = children.length || 0;
            // 如果不循环或者长度小于等于1
            if (!isCirculate || length <= 1) {
                return _react2.default.Children.map(children, function (child, i) {
                    return _react2.default.cloneElement(child, {
                        key: i,
                        onSelect: onSelect,
                        index: i
                    });
                });
            }
            var newChildren = _react2.default.Children.map(children, function (child, i) {
                return _react2.default.cloneElement(child, {
                    key: i,
                    onSelect: onSelect,
                    index: i
                });
            });
            newChildren = [children[0]].concat(_toConsumableArray(newChildren), [children[length - 1]]);
            return newChildren;
        };

        _this.touchStart = function (event) {
            var touches = event.touches[0];
            _this.start = {
                x: touches.pageX,
                y: touches.pageY
            };
        };

        _this.touchMove = function (event) {
            var touches = event.touches[0];
            var width = _this.props.width;

            if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
            _this.delta = {
                x: touches.pageX - _this.start.x,
                y: touches.pageY - _this.start.y
            };
            var dist = _this.delta.x - (_this.state.activeKey + 1) * width;
            _this.translate(dist, 0);
        };

        _this.touchEnd = function (e) {
            if (Math.abs(_this.delta.x) < 100) {
                _this.to(_this.state.activeKey, 300);
                return;
            }
            _this.delta.x < 0 ? _this.next() : _this.prev();
        };

        _this.to = function (index, speed, tabIndex) {
            var _this$props2 = _this.props,
                width = _this$props2.width,
                isCirculate = _this$props2.isCirculate;

            if (tabIndex === void 0) {
                tabIndex = index;
            }
            // index+1是因为循环下两边会多出两个
            var dist = isCirculate ? -width * (index + 1) : -width * index || 0;
            _this.translate(dist, speed);
            _this.props.changeTab(tabIndex);
        };

        _this.translate = function () {
            var dist = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var speed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

            _this.content.style && (_this.content.style.transform = 'translate(' + dist + 'px, 0)');
            _this.content.style && (_this.content.style.transitionDuration = speed + 'ms');
            _this.content.style && (_this.content.style.transitionTimingFunction = 'ease-out');
        };

        _this.state = {
            activeKey: +_this.props.activeKey
        };
        return _this;
    }

    _createClass(TabContent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.to(this.props.activeKey, 0);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.activeKey !== nextProps.activeKey) {
                this.setState({
                    activeKey: nextProps.activeKey
                });
            }
        }
    }, {
        key: 'next',
        value: function next() {
            var _this2 = this;

            var _props = this.props,
                _props$changeTab = _props.changeTab,
                changeTab = _props$changeTab === undefined ? noop : _props$changeTab,
                children = _props.children,
                isCirculate = _props.isCirculate;

            var length = children.length || 0;
            var speed = 300;
            // 判断临界点（如果是循环）
            if (isCirculate && this.state.activeKey >= length - 1) {
                this.to(length, speed, 0);
                setTimeout(function () {
                    _this2.to(0, 0);
                }, speed);
                // 判断临界点（如果不是循环）
            } else if (this.state.activeKey >= length - 1) {
                this.to(length - 1, speed);
                // 如果不是临界点
            } else {
                this.to(this.state.activeKey + 1);
            }
        }
    }, {
        key: 'prev',
        value: function prev() {
            var _this3 = this;

            var _props2 = this.props,
                _props2$changeTab = _props2.changeTab,
                changeTab = _props2$changeTab === undefined ? noop : _props2$changeTab,
                children = _props2.children,
                isCirculate = _props2.isCirculate;

            var length = children.length || 0;
            var speed = 300;
            // 判断临界点（如果是循环）
            if (isCirculate && this.state.activeKey <= 0) {
                this.to(-1, speed, length - 1);
                setTimeout(function () {
                    _this3.to(length - 1, 0);
                }, speed);
                // 判断临界点（如果不是循环）
            } else if (this.state.activeKey <= 0) {
                this.to(0, speed);
                // 如果不是临界点
            } else {
                this.to(this.state.activeKey - 1, speed);
            }
        }
        // 要滑动到的index, 速度speed, 展示的index

    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props3 = this.props,
                _props3$activeKey = _props3.activeKey,
                activeKey = _props3$activeKey === undefined ? 1 : _props3$activeKey,
                _props3$onSelect = _props3.onSelect,
                onSelect = _props3$onSelect === undefined ? noop : _props3$onSelect,
                children = _props3.children,
                width = _props3.width;

            var length = children.length || 0;
            return _react2.default.createElement(
                'div',
                {
                    style: {
                        width: width * (length + 2) + "px"
                    },
                    className: 'tab-content',
                    ref: function ref(r) {
                        return _this4.content = r;
                    },
                    onTouchStart: this.touchStart,
                    onTouchMove: function onTouchMove(event) {
                        return _lodash2.default.throttle(_this4.touchMove, 50)(event);
                    },
                    onTouchEnd: this.touchEnd
                },
                this.handleChildren()
            );
        }
    }]);

    return TabContent;
}(_react2.default.PureComponent);

exports.default = TabContent;

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(18);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Touch from './Touch'


function noop() {}

var TabPane = function (_React$PureComponent) {
    _inherits(TabPane, _React$PureComponent);

    function TabPane(props) {
        _classCallCheck(this, TabPane);

        var _this = _possibleConstructorReturn(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).call(this, props));

        _this.state = {
            activeKey: _this.props.activeKey
        };
        return _this;
    }

    _createClass(TabPane, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.activeKey !== nextProps.activeKey) {
                this.setState({
                    activeKey: nextProps.activeKey
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                _props$activeKey = _props.activeKey,
                activeKey = _props$activeKey === undefined ? 0 : _props$activeKey,
                _props$currentKey = _props.currentKey,
                currentKey = _props$currentKey === undefined ? 0 : _props$currentKey;

            return _react2.default.createElement(
                'div',
                { className: 'tab-pane' },
                children
            );
        }
    }]);

    return TabPane;
}(_react2.default.PureComponent);

exports.default = TabPane;

/***/ }),

/***/ 47:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[29]);