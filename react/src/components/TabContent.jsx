import React from 'react'
class TabContent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: +this.props.activeKey
        }
    }
    componentDidMount() {
        this.translate(this.props.activeKey);
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.activeKey !== nextProps.activeKey) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
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
        this.content.style && (this.content.style.transform = `translate(${this.delta.x-this.state.activeKey*width}px, 0)`)
        this.content.style && (this.content.style.transitionDuration = `0ms`)
        this.content.style && (this.content.style.transitionTimingFunction = `ease-out`)
    }
    touchEnd = (e) => {
        const {
            changeTab = noop,
            children
        } = this.props
        const length = children.length || 0
        let nextIndex = 0
        if(Math.abs(this.delta.x) < 100) {
            this.translate(this.state.activeKey, 300)
            return
        }
        if(this.delta.x < 0) {
            if(this.state.activeKey >= length-1) {
                nextIndex = length-1
            } else {
                nextIndex = this.state.activeKey + 1
            }
        } else {
            if(this.state.activeKey <= 0) {
                nextIndex = 0
            } else {
                nextIndex = this.state.activeKey - 1
            }
        }
        this.props.changeTab(nextIndex)
        this.translate(nextIndex, 300)
    }
    translate = (index, speed) => {
        const {
            width
        } = this.props
        this.content.style && (this.content.style.transform = `translate(${-width*index}px, 0)`)
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
        return (
            <div
                style={{
                    width: width*3+"px"
                }} 
                className="tab-content"
                ref={r => this.content = r}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
            >
                {
                    React.Children.map(children, (child, i) => {
                        return React.cloneElement(child, {
                            key: i,
                            onSelect,
                            index: i,
                        })
                    })
                }
            </div>
        )
    }
}
export default TabContent