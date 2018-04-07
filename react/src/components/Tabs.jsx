import React from 'react'
import classnames from 'classnames'
import './Tabs.scss'
function noop() {}
class Tabs extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: this.props.defaultKey || 0
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.defaultKey != this.props.defaultKey) {
            this.setState({
                activeKey: nextProps.defaultKey || 0
            })
        }
    }
    handleNavChild(currentKey) {
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
                                onClick={() => this.handleNavChild(currentKey)}
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
            onSelect = noop,
            children
        } = this.props
        return (
            <div className="tab-content">
                {
                    React.Children.map(children, (child, i) => {
                        return React.cloneElement(child, {
                            key: i,
                            onSelect,
                            activeKey: this.state.activeKey
                        })
                    })
                }
            </div>
        )
    }
    render() {
        const {
            defaultKey = 1,
            onSelect = noop,
            children
        } = this.props
        // if(children.length < 1) return null
        return (
            <div className="tabs">
                {this.renderNav()}
                {this.renderContent()}
            </div>
        )
    }
}
export default Tabs