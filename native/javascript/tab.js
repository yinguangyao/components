function noop() {}
class Tabs {
    constructor(options = {}) {
        this.init(options)
    }
    init(options = {}) {
        const defaultOptions = {
            root: "#tabs",
            defaultKey: 0,
            onSelect: noop
        }
        options = Object.assign({}, defaultOptions, options);
        $("#tabs .tab-nav-item").get(options.defaultKey).uniqueClass("cur");
        $("#tabs .tab-pane").get(options.defaultKey).uniqueNotClass("hide");
        Object.keys(options).map((key) => {
            this[key] = options[key]
        })
        this.handleClick()
    }
    handleClick() {
        $(this.root).on("click", ".tab-nav-item", (event) => {
            const $this = $(event.target)
            const index = $this.getAttr("data-index")
            $this.uniqueClass("cur");
            this.onSelect(index);
            $(".tab-pane").get(index).uniqueNotClass("hide");
        })
    }
}
