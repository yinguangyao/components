import React from 'react'
// import Touch from './Touch'
import classnames from 'classnames'
function noop() {}
class TabPane extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            activeKey: this.props.activeKey
        }
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.activeKey !== nextProps.activeKey) {
            this.setState({
                activeKey: nextProps.activeKey
            })
        }
    }
    render() {
        const {
            children,
            activeKey = 0,
            currentKey = 0,
        } = this.props
        return (
            <div className="tab-pane">
                {children}
            </div>
        )
    }
}

export default TabPane