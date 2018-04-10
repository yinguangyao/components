// todo: 实现一个观察者模式来监听数据变化
const data = {
    tabs: [{
        nav: "title one",
        content: "这是选项卡一"
    }, {
        nav: "title two",
        content: "这是选项卡二"
    }, {
        nav: "title three",
        content: "这是选项卡三"
    }]
}

const render = (tpl, data, targetNode) => {
    $(targetNode).get(0).html(templateX(tpl, data))
}
$.ready(() => {
    const tpl = $("#tpl").get(0).html()
    render(tpl, data, "#tabs");
    new Tabs({
        root: "#tabs",
        defaultKey: 1,
        onSelect: function(index) {
            console.log("this is index: " + index);
        }
    })
})