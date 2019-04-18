# demos #
这里会用react和原生js两种方式来实现不同的组件，原生JS实现PC端的组件，react实现移动端组件。
为了更好的操作DOM和渲染页面，这里我还实现了一个简单的jQuery和模板引擎。
参考我另一个wheels项目。
## 基于react的Tab组件 ##
Tab组件接受defaultKey和onSelect两个参数。<br>
defaultKey是指默认的指定key值，用于第一次渲染的时候激活指定的tab。onSelect是一个函数，参数是当前激活状态tab的key值。<br>
TabPane组件作为Tab组件的插槽使用，接受currentKey和title两个参数。<br>
currentKey是指当前tab的key，title则是当前tab头部的名称。<br>
TabPane组件还会接受用户自定义的插槽，这个会当做tab的主体内容进行渲染，用户可以传入字符串或者自定义的DOM结构。<br>
使用方式如下：
```javascript
const TabPage = () => {
    return (
        <Tabs 
            defaultKey={"b"} 
            isCirculate={true}
            auto={2000}
            speed={300}
        >
            <TabPane currentKey={"a"} title="选项卡1">
                <div className="pane-content">
                    这是选项卡1
                </div>
            </TabPane>
            <TabPane currentKey={"b"} title="选项卡2">
                <div className="pane-content">
                    这是选项卡2
                </div>
            </TabPane>
            <TabPane currentKey={"c"} title="选项卡3">
                <div className="pane-content">
                    这是选项卡3
                </div>
            </TabPane>
        </Tabs>
    )
}
```
