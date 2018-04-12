import React from 'react'
import classnames from 'classnames'
import _ from 'lodash'

import Touch from './Touch'
import './Tabs.scss'

function noop() {}
class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: this.props.activeKey || 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.defaultKey != this.props.defaultKey) {
            this.setState({
                activeKey: nextProps.defaultKey || 0
            })
        }
    }
    getDeviceWidth() {
        const rect = document.body.getBoundingClientRect();
        return rect.right - rect.left - 20
    }
    changeTab = (currentKey) => {
        const {
            onSelect = noop
        } = this.props;
        this.setState({
            activeKey: currentKey
        })
        onSelect(currentKey);
        console.log("you have selected current key: " + currentKey);
    }
    renderNav() {
        const {
            defaultKey = 0,
            onSelect = noop,
            children
        } = this.props
        return (
            <ul className="tab-nav-list">
                {
                    React.Children.map(children, (child, i) => {
                        const {
                            currentKey = i,
                            title = ""
                        } = child.props
                        return (
                            <li 
                                className={classnames("tab-nav-item", {"cur": this.state.activeKey == currentKey})}
                                key={currentKey}
                                onTouchStart={() => this.changeTab(currentKey)}
                                onTransitionEnd = {() => { console.log("end")}}
                            >{title}</li>
                        )
                    })
                }
            </ul>
        )
    }
    renderContent() {
        const {
            children,
            width = this.getDeviceWidth(),
            isCirculate,
            getRef = noop,
            handleChildren = noop,
            touchStart = noop,
            touchMove = noop,
            touchEnd = noop
        } = this.props
        const length = children.length || 0
        const wrappedWidth = isCirculate ? `${width * (length + 2)}px` : `${width * length}px`
        return (
            <div
                style={{
                    width: wrappedWidth
                }} 
                className="tab-content"
                ref={r => {
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
    render() {
        const {
            defaultKey = 0,
            onSelect = noop,
            children,
            width = this.getDeviceWidth(),
            isCirculate = true
        } = this.props
        return (
            <div className="tabs">
                <div style={{overflow: "hidden"}}>
                    {this.renderNav()}
                    {this.renderContent()}
                </div>
            </div>
        )
    }
}
export default Touch(Tabs)
