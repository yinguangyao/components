function noop() {}
class Tabs {
    constructor(options = {}) {
        this.init(options)
    }
    init(options = {}) {
        const defaultOptions = {
            root: "#tabs",
            activeKey: 0,
            onSelect: function() {}
        }
        options = Object.assign({}, defaultOptions, options);
        $("#tabs .tab-nav-item").get(0).addClass("cur");
        Object.keys(options).map((key) => {
            this[key] = options[key]
        })
        this.handleClick()
    }
    handleClick() {
        $(this.root).on("click", ".tab-nav-item", (event) => {
            const $this = $(event.target)
            $this.uniqueClass("cur");
            this.onSelect($this.getAttr("data-index"));
        })
    }
}
