import React from 'react'
import _ from 'lodash'

class TabContent extends React.PureComponent {
    constructor(props) {
        super(props);
    }
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
    // 要滑动到的index, 速度speed, 展示的index
    to = (index, speed, tabIndex) => {
        const {
            width,
            isCirculate
        } = this.props
        if(tabIndex === void 0) {
            tabIndex = index
        }
        const tabKey = this.indexMapping[tabIndex];
        debugger
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
        const {
            activeIndex = 1,
            onSelect = noop,
            children,
            width,
            isCirculate
        } = this.props
        const length = children.length || 0
        return (
            <div
                style={{
                    width: isCirculate ? width*(length+2)+"px" : width*length+"px"
                }} 
                className="tab-content"
                ref={r => this.content = r}
                onTouchStart={this.touchStart}
                onTouchMove={(event) => _.throttle(this.touchMove, 50)(event)}
                onTouchEnd={this.touchEnd}
            >
                {this.handleChildren()}
            </div>
        )
    }
}
export default TabContent