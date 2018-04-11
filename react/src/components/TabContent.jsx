import React from 'react'
import _ from 'lodash'

class TabContent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: +this.props.activeKey
        }
    }
    componentDidMount() {
        this.to(this.props.activeKey, 0);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.activeKey !== nextProps.activeKey) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
    }
    handleChildren = () => {
        const {
            activeKey = 1,
            onSelect = noop,
            children,
            width,
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
            width
        } = this.props
        if (event.touches.length > 1 || (event.scale && event.scale !== 1))
            return
        this.delta = {
            x: touches.pageX - this.start.x,
            y: touches.pageY - this.start.y
        }
        const dist = this.delta.x - (this.state.activeKey + 1) * width
        this.translate(dist, 0)
    }
    touchEnd = (e) => {
        if(Math.abs(this.delta.x) < 100) {
            this.to(this.state.activeKey, 300)
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
        if(isCirculate && this.state.activeKey >= length-1) {
            this.to(length, speed, 0);
            setTimeout(() => {
                this.to(0, 0)
            }, speed)
        // 判断临界点（如果不是循环）
        } else if(this.state.activeKey >= length-1) {
            this.to(length - 1, speed);
        // 如果不是临界点
        } else {
            this.to(this.state.activeKey + 1);
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
        if(isCirculate && this.state.activeKey <= 0) {
            this.to(-1, speed, length - 1);
            setTimeout(() => {
                this.to(length - 1, 0)
            }, speed)
        // 判断临界点（如果不是循环）
        } else if(this.state.activeKey <= 0){
            this.to(0, speed);
        // 如果不是临界点
        } else {
            this.to(this.state.activeKey - 1, speed);
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
        // index+1是因为循环下两边会多出两个
        const dist = isCirculate ? -width * (index+1) : -width * index || 0
        this.translate(dist, speed);
        this.props.changeTab(tabIndex);
    }
    translate = (dist = 0, speed = 300) => {
        this.content.style && (this.content.style.transform = `translate(${dist}px, 0)`)
        this.content.style && (this.content.style.transitionDuration = `${speed}ms`)
        this.content.style && (this.content.style.transitionTimingFunction = `ease-out`)
    }
    render() {
        const {
            activeKey = 1,
            onSelect = noop,
            children,
            width
        } = this.props
        const length = children.length || 0
        return (
            <div
                style={{
                    width: width*(length+2)+"px"
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