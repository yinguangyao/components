import React from 'react';
import PropTypes from 'prop-types';

const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component';
}
const noop = () => {}
const Touch = (WrappedComponent) => {
    return class HOC extends React.Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`;
        static propTypes = {
            speed: PropTypes.number,
            auto: PropTypes.number,
            isAuto: PropTypes.bool,
            children: PropTypes.node,
            onSelect: PropTypes.func,
            isCirculate: PropTypes.bool,
            activeKey: PropTypes.node
        };
        static defaultProps = {
            speed: 300,
            auto: 3000,
            isAuto: true,
            onSelect: noop,
            isCirculate: true,
            activeKey: 0
        };
        constructor(props) {
            super(props);
            this.indexMapping = [];
            this.state = {
                activeIndex: 0
            };
        }
        // 第一次进来的时候初始化，跳转到对应的tab位置
        async componentDidMount () {
            const {
                activeKey = 0,
                isAuto
            } = this.props;
            await this.initActiveIndex(activeKey);
            this.to(this.getIndexByKey(activeKey), 0);
            isAuto && this.auto();
        }
        async componentWillReceiveProps(nextProps) {
            const {
                activeIndex = 0
            } = this.state;
            if(this.indexMapping[activeIndex] !== nextProps.activeKey) {
                this.autoTimeout && clearInterval(this.autoTimeout);
                await this.to(this.getIndexByKey(nextProps.activeKey), nextProps.speed);
            }
        }
        componentWillUnmount() {
            window.removeEventListener("touchStart", this.touchStart);
            window.removeEventListener("touchMove", this.touchMove);
            window.removeEventListener("touchMove", this.touchMove);
            this.start = this.indexMapping = this.content = null
        }
        // 这里主要是对传入的key进行mapping，转化为index的形式存到state中，便于我们之后操作
        async initActiveIndex(activeKey) {
            this.indexMapping = this.getIndexMapping();
            const defaultIndex = this.getIndexByKey(activeKey);
            await this.setState({
                activeIndex: defaultIndex
            });
        }
        getRef = (r) => {
            this.content = r;
        }
        // 这里我使用一个数组来保存所有的key，每次切换tab的时候实际上是获取的数组对应key的index
        getIndexByKey(key) {
            return this.indexMapping && this.indexMapping.indexOf(key) || 0;
        }
        getIndexMapping() {
            const {
                onSelect = noop,
                children
            } = this.props;
            const mapping = [];
            React.Children.map(children, (child, i) => {
                mapping.push(child.props.currentKey);
            });
            return mapping;
        }
        // 对循环状态下的children做了一些处理
        handleChildren = () => {
            const {
                onSelect = noop,
                children,
                isCirculate = true
            } = this.props;
            const length = children.length || 0;
            // 如果不循环或者长度小于等于1
            if(!isCirculate || length <= 1) {
                return React.Children.map(children, (child, i) => {
                    return React.cloneElement(child, {
                        key: i,
                        onSelect,
                        index: i,
                    });
                })
            }
            let newChildren = React.Children.map(children, (child, i) => {
                return React.cloneElement(child, {
                    key: i,
                    onSelect,
                    index: i,
                });
            });
            newChildren = [children[length-1], ...newChildren, children[0]];
            return newChildren
        }
        auto = () => {
            const {
                auto
            } = this.props;
            this.autoTimeout && clearInterval(this.autoTimeout);
            this.autoTimeout = setInterval(() => {
                this.next();
            }, auto);
        }
        touchStart = (event) => {
            const touches = event.touches[0];
            this.start = {
                x: touches.pageX,
                y: touches.pageY
            };
            this.autoTimeout && clearInterval(this.autoTimeout);
        }
        touchMove = (event) => {
            const touches = event.touches[0];
            const {
                width,
                isCirculate,
                children
            } = this.props;
            const length = children.length || 0;
            if (event.touches.length > 1 || (event.scale && event.scale !== 1))
                return;
            this.delta = {
                x: touches.pageX - this.start.x,
                y: touches.pageY - this.start.y
            };
            const index = isCirculate ? this.state.activeIndex + 1 : this.state.activeIndex;
            const dist = this.delta.x - index * width;
            // 非循环状态下，如果滑动到两边临界点，只允许最多再滑动100px
            if(!isCirculate &&
                ((this.delta.x <= -100 && this.state.activeIndex >= length - 1) ||
                (this.delta.x >= 100 && this.state.activeIndex <= 0))
            ) {
                return;
            }
            this.translate(dist, 0);
        }
        touchEnd = async(e) => {
            const {
                speed
            } = this.props
            if(Math.abs(this.delta.x) < 100) {
                await this.to(this.state.activeIndex, speed);
                return;
            }
            this.delta.x < 0 ? this.next() : this.prev();
        }
        next = async () => {
            const {
                children,
                isCirculate,
                speed
            } = this.props;
            const length = children.length || 0;
            // 判断临界点（如果是循环）
            if(isCirculate && this.state.activeIndex >= length-1) {
                await this.to(length, speed, 0);
                setTimeout(async() => {
                    await this.to(0, 0)
                }, speed);
            // 判断临界点（如果不是循环）
            } else if(this.state.activeIndex >= length-1) {
                await this.to(length - 1, speed);
            // 如果不是临界点
            } else {
                await this.to(this.state.activeIndex + 1, speed);
            }
        }
        prev = async() => {
            const {
                children,
                isCirculate,
                speed
            } = this.props;
            const length = children.length || 0;
            // 判断临界点（如果是循环）
            if(isCirculate && this.state.activeIndex <= 0) {
                await this.to(-1, speed, length - 1);
                setTimeout(async() => {
                    await this.to(length - 1, 0);
                }, speed);
            // 判断临界点（如果不是循环）
            } else if(this.state.activeIndex <= 0){
                await this.to(0, speed);
            // 如果不是临界点
            } else {
                await this.to(this.state.activeIndex - 1, speed);
            }
        }
        // 要滑动到的index, 速度speed, 头部展示的index
        to = async (index, speed, tabIndex) => {
            const {
                width,
                isCirculate,
                children
            } = this.props;
            let availIndex = index;
            const length = children.length || 0;
            if(index < 0) {
                availIndex = length - 1;
            }
            if(index > length - 1) {
                availIndex = 0;
            }
            if(tabIndex === void 0) {
                tabIndex = availIndex;
            }
            const currentKey = this.indexMapping[this.state.activeIndex];
            const key = this.indexMapping[availIndex];
            const tabKey = this.indexMapping[tabIndex];
            // index+1是因为循环下两边会多出两个
            const dist = isCirculate ? -width * (index+1) : -width * index || 0;
            this.translate(dist, speed);
            await this.initActiveIndex(key);
            // 传给外部的前一次的key和当前的key
            if(currentKey!=tabKey) {
                this.props.onChange(currentKey, tabKey);
            }
        }
        translate = (dist = 0, speed) => {
            // debugger
            this.content.style && (this.content.style.transform = `translate(${dist}px, 0)`);
            this.content.style && (this.content.style.transitionDuration = `${speed}ms`);
            this.content.style && (this.content.style.transitionTimingFunction = `ease-out`);
        }
        render() {
            const props = {
                ...this.props,
                touchStart: this.touchStart,
                touchMove: this.touchMove,
                touchEnd: this.touchEnd,
                handleChildren: this.handleChildren,
                getRef: this.getRef
            };
            return <WrappedComponent {...props} />
        }
    }
}
export default Touch;