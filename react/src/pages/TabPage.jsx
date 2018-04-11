import React from 'react'
import Tabs from '../components/Tabs'
import TabPane from '../components/TabPane'
// todo: 增加选项卡删除、增加等功能，兼容移动端触摸事件
const TabPage = () => {
    return (
        <Tabs defaultKey={1} isCirculate={false}>
            <TabPane currentKey={0} title="选项卡1">
                <div className="pane-content">
                    这是选项卡1
                </div>
            </TabPane>
            <TabPane currentKey={1} title="选项卡2">
                <div className="pane-content">
                    这是选项卡2
                </div>
            </TabPane>
            <TabPane currentKey={2} title="选项卡3">
                <div className="pane-content">
                    这是选项卡3
                </div>
            </TabPane>
        </Tabs>
    )
}
export default TabPage