import React from 'react'
import classnames from 'classnames'
function noop() {}
const TabPane = props => {
    const {
        children,
        activeKey = 0,
        currentKey = 0
    } = props
    return (
        <div className={classnames("tab-pane", {
            "hide": activeKey != currentKey
        })}>
            {children}
        </div>
    )
}
export default TabPane