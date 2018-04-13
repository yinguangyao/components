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
                            >{title}</li>
                        )
                    })
                }
            </ul>
        )
    }
    render() {
        const {
            defaultKey = 0,
            onSelect = noop,
            children,
            width = this.getDeviceWidth(),
            isCirculate = true,
            speed = 300,
            auto = 2000
        } = this.props
        return (
            <div className="tabs">
                <div style={{overflow: "hidden"}}>
                    {this.renderNav()}
                    <TabContent 
                        activeKey={this.state.activeKey}
                        width={width}
                        onChange={
                            (prevKey, currentKey) => {
                                this.changeTab(currentKey)
                            }
                        }
                        speed={speed}
                        auto={auto}
                        isCirculate={isCirculate}
                    >
                        {children}
                    </TabContent>
                </div>
            </div>
        )
    }
}
export default Tabs
