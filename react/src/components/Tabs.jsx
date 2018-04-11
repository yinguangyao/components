import React from 'react'
import TabContent from './TabContent'
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
    // 这里对currentKey做了mapping，便于以后计算
    getIndexMapping() {
        const {
            defaultKey = 0,
            onSelect = noop,
            children
        } = this.props
        const mapping = {
            activeIndex: "",
            keys: []
        }
        React.Children.map(children, (child, i) => {
            if(i == this.state.activeKey) {
                mapping.activeIndex = i
            }
            mapping.keys.push(child.props && child.props.currentKey);
        })
        return mapping;
    }
    getDeviceWidth() {
        const rect = document.body.getBoundingClientRect();
        return rect.right - rect.left
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
    render() {
        const {
            defaultKey = 1,
            onSelect = noop,
            children,
            width = this.getDeviceWidth() - 20
        } = this.props
        // if(children.length < 1) return null
        return (
            <div className="tabs">
                <div style={{overflow: "hidden"}}>
                    {this.renderNav()}
                    <TabContent 
                        activeKey={this.state.activeKey}
                        onSelect={onSelect}
                        width={width}
                        changeTab={this.changeTab}
                    >
                        {children}
                    </TabContent>
                </div>
            </div>
        )
    }
}
export default Tabs
