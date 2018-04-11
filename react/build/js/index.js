webpackJsonp([0],{

/***/ 16:
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

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(29);


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(11);

var _TabPage = __webpack_require__(40);

var _TabPage2 = _interopRequireDefault(_TabPage);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _reactDom.render)(_react2.default.createElement(_TabPage2.default, null), document.getElementById("app"));

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _Tabs = __webpack_require__(41);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabPane = __webpack_require__(44);

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

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _TabContent = __webpack_require__(42);

var _TabContent2 = _interopRequireDefault(_TabContent);

var _classnames = __webpack_require__(16);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(43);

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
            return rect.right - rect.left;
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
                width = _props3$width === undefined ? this.getDeviceWidth() - 20 : _props3$width;
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
                            changeTab: this.changeTab
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

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TabContent = function (_React$PureComponent) {
    _inherits(TabContent, _React$PureComponent);

    function TabContent(props) {
        _classCallCheck(this, TabContent);

        var _this = _possibleConstructorReturn(this, (TabContent.__proto__ || Object.getPrototypeOf(TabContent)).call(this, props));

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
            _this.content.style && (_this.content.style.transform = "translate(" + (_this.delta.x - (_this.state.activeKey + 1) * width) + "px, 0)");
            _this.content.style && (_this.content.style.transitionDuration = "0ms");
            _this.content.style && (_this.content.style.transitionTimingFunction = "ease-out");
        };

        _this.touchEnd = function (e) {
            var _this$props = _this.props,
                _this$props$changeTab = _this$props.changeTab,
                changeTab = _this$props$changeTab === undefined ? noop : _this$props$changeTab,
                children = _this$props.children;

            var length = children.length || 0;
            var nextIndex = 0,
                speed = 300;
            if (Math.abs(_this.delta.x) < 100) {
                _this.translate(_this.state.activeKey, 300);
                return;
            }
            if (_this.delta.x < 0) {
                if (_this.state.activeKey >= length - 1) {
                    _this.translate(length, speed);
                    _this.props.changeTab(0);
                    setTimeout(function () {
                        nextIndex = 0;
                        speed = 0;
                        // this.props.changeTab(nextIndex)
                        _this.translate(nextIndex, speed);
                    }, speed - 10);
                    return;
                } else {
                    nextIndex = _this.state.activeKey + 1;
                }
            } else {
                if (_this.state.activeKey <= 0) {
                    _this.translate(-1, speed);
                    _this.props.changeTab(length - 1);
                    setTimeout(function () {
                        nextIndex = length - 1;
                        speed = 0;
                        _this.translate(nextIndex, speed);
                    }, speed - 10);
                    return;
                } else {
                    nextIndex = _this.state.activeKey - 1;
                }
            }
            _this.props.changeTab(nextIndex);
            _this.translate(nextIndex, speed);
        };

        _this.translate = function (index, speed) {
            var width = _this.props.width;

            _this.content.style && (_this.content.style.transform = "translate(" + -width * (index + 1) + "px, 0)");
            _this.content.style && (_this.content.style.transitionDuration = speed + "ms");
            _this.content.style && (_this.content.style.transitionTimingFunction = "ease-out");
        };

        _this.state = {
            activeKey: +_this.props.activeKey
        };
        return _this;
    }

    _createClass(TabContent, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.translate(this.props.activeKey);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (this.props.activeKey !== nextProps.activeKey) {
                this.setState({
                    activeKey: nextProps.activeKey
                });
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                _props$activeKey = _props.activeKey,
                activeKey = _props$activeKey === undefined ? 1 : _props$activeKey,
                _props$onSelect = _props.onSelect,
                onSelect = _props$onSelect === undefined ? noop : _props$onSelect,
                children = _props.children,
                width = _props.width;

            var length = children.length || 0;
            return _react2.default.createElement(
                "div",
                {
                    style: {
                        width: width * (length + 2) + "px"
                    },
                    className: "tab-content",
                    ref: function ref(r) {
                        return _this2.content = r;
                    },
                    onTouchStart: this.touchStart,
                    onTouchMove: this.touchMove,
                    onTouchEnd: this.touchEnd
                },
                children[length - 1],
                _react2.default.Children.map(children, function (child, i) {
                    return _react2.default.cloneElement(child, {
                        key: i,
                        onSelect: onSelect,
                        index: i
                    });
                }),
                children[0]
            );
        }
    }]);

    return TabContent;
}(_react2.default.PureComponent);

exports.default = TabContent;

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(16);

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

/***/ 45:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[28]);