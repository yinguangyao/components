import React from 'react'
const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'
}
const noop = () => {}
const Touch = (WrappedComponent) => {
    return class HOC extends React.Component {
        static displayName = `HOC(${getDisplayName(WrappedComponent)})`
        constructor(props) {
            super(props);
        }
        // 第一次进来的时候初始化，跳转到对应的tab位置
        async componentDidMount () {
            const {
                activeKey = 0
            } = this.props
            await this.initActiveIndex(activeKey);
            this.to(this.getIndexByKey(activeKey), 0);
        }
        async componentWillReceiveProps(nextProps) {
            if(this.props.activeKey !== nextProps.activeKey) {
                await this.initActiveIndex(nextProps.activeKey);
            }
        }
        // 这里主要是对传入的key进行mapping，转化为index的形式存到state中，便于我们之后操作
        async initActiveIndex(activeKey) {
            this.indexMapping = this.getIndexMapping();
            const defaultIndex = this.getIndexByKey(activeKey);
            await this.setState({
                activeIndex: defaultIndex
            })
        }
        getRef = (r) => {
            this.content = r;
        }
        // 这里我使用一个数组来保存所有的key，每次切换tab的时候实际上是获取的数组对应key的index
        getIndexByKey(key) {
            return this.indexMapping && this.indexMapping.indexOf(key) || 0
        }
        getIndexMapping() {
            const {
                onSelect = noop,
                children
            } = this.props
            const mapping = []
            React.Children.map(children, (child, i) => {
                mapping.push(child.props.currentKey);
            })
            return mapping;
        }
        // 对循环状态下的children做了一些处理
        handleChildren = () => {
            const {
                onSelect = noop,
                children,
                isCirculate = true
            } = this.props
            const length = children.length || 0
            // 如果不循环或者长度小于等于1
            if(!isCirculate || length <= 1) {
                return React.Children.map(children, (child, i) => {
                    return React.cloneElement(child, {
                        key: i,
                        onSelect,
                        index: i,
                    })
                })
            }
            let newChildren = React.Children.map(children, (child, i) => {
                return React.cloneElement(child, {
                    key: i,
                    onSelect,
                    index: i,
                })
            });
            newChildren = [children[length-1], ...newChildren, children[0]];
            return newChildren
        }
        touchStart = (event) => {
            const touches = event.touches[0]
            this.start = {
                x: touches.pageX,
                y: touches.pageY
            }
        }
        touchMove = (event) => {
            const touches = event.touches[0]
            const {
                width,
                isCirculate,
                children
            } = this.props
            const length = children.length || 0
            if (event.touches.length > 1 || (event.scale && event.scale !== 1))
                return
            this.delta = {
                x: touches.pageX - this.start.x,
                y: touches.pageY - this.start.y
            }
            const index = isCirculate ? this.state.activeIndex + 1 : this.state.activeIndex
            const dist = this.delta.x - index * width
            // 非循环状态下，如果滑动到两边临界点，只允许最多再滑动100px
            if(!isCirculate &&
                ((this.delta.x <= -100 && this.state.activeIndex >= length - 1) ||
                (this.delta.x >= 100 && this.state.activeIndex <= 0))
            ) {
                return
            }
            this.translate(dist, 0)
        }
        touchEnd = (e) => {
            if(Math.abs(this.delta.x) < 100) {
                this.to(this.state.activeIndex, 300)
                return
            }
            this.delta.x < 0 ? this.next() : this.prev();
        }
        next() {
            const {
                changeTab = noop,
                children,
                isCirculate
            } = this.props
            const length = children.length || 0
            const speed = 300
            // 判断临界点（如果是循环）
            if(isCirculate && this.state.activeIndex >= length-1) {
                this.to(length, speed, 0);
                setTimeout(() => {
                    this.to(0, 0)
                }, speed)
            // 判断临界点（如果不是循环）
            } else if(this.state.activeIndex >= length-1) {
                this.to(length - 1, speed);
            // 如果不是临界点
            } else {
                this.to(this.state.activeIndex + 1);
            }
        }
        prev() {
            const {
                changeTab = noop,
                children,
                isCirculate
            } = this.props
            const length = children.length || 0
            const speed = 300
            // 判断临界点（如果是循环）
            if(isCirculate && this.state.activeIndex <= 0) {
                this.to(-1, speed, length - 1);
                setTimeout(() => {
                    this.to(length - 1, 0)
                }, speed)
            // 判断临界点（如果不是循环）
            } else if(this.state.activeIndex <= 0){
                this.to(0, speed);
            // 如果不是临界点
            } else {
                this.to(this.state.activeIndex - 1, speed);
            }
        }
        // 要滑动到的index, 速度speed, 头部展示的index
        to = (index, speed, tabIndex) => {
            const {
                width,
                isCirculate
            } = this.props
            if(tabIndex === void 0) {
                tabIndex = index
            }
            const tabKey = this.indexMapping[tabIndex];
            // index+1是因为循环下两边会多出两个
            const dist = isCirculate ? -width * (index+1) : -width * index || 0
            this.translate(dist, speed);
            this.props.changeTab(tabKey);
        }
        translate = (dist = 0, speed = 300) => {
            this.content.style && (this.content.style.transform = `translate(${dist}px, 0)`)
            this.content.style && (this.content.style.transitionDuration = `${speed}ms`)
            this.content.style && (this.content.style.transitionTimingFunction = `ease-out`)
        }
        render() {
            const props = {
                ...this.props,
                touchStart: this.touchStart,
                touchMove: this.touchMove,
                touchEnd: this.touchEnd,
                handleChildren: this.handleChildren,
                getRef: this.getRef
            }
            return <WrappedComponent {...props} />
        }
    }
}
export default Touch