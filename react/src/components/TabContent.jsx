import React from 'react'
import Touch from './Touch'
import _ from 'lodash'
function noop() {}
class TabContent extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            activeIndex = 1,
            onSelect = noop,
            children,
            width,
            isCirculate,
            getRef = noop,
            handleChildren = noop,
            touchStart = noop,
            touchMove = noop,
            touchEnd = noop
        } = this.props
        const length = children.length || 0
        const wrappedWidth = isCirculate ? `${width * (length + 2)}px` : `${width * length}"px`
        return (
            <div
                style={{
                    width: wrappedWidth
                }} 
                className="tab-content"
                ref={r => {
                    {/* debugger */}
                    getRef(r)
                }}
                onTouchStart={touchStart}
                onTouchMove={event => _.throttle(touchMove, 50)(event)}
                onTouchEnd={touchEnd}
            >
                {handleChildren()}
            </div>
        )
    }
}
export default Touch(TabContent)