(function() {
    const root = this;
    function noop() {}
    class Tabs {
        constructor(options = {}) {
            const defaultOptions = {
                root: "#tabs",
                defaultKey: 0,
                onSelect: noop
            }
            options = Object.assign({}, defaultOptions, options);
            Object.keys(options).map((key) => {
                this[key] = options[key]
            })
            this._init(options)
        }
        _init(options = {}) {
            // 初始化
            this.changeTab(options.defaultKey);
            this.handleClick()
        }
        changeTab(index) {
            $("#tabs .tab-pane").get(index).uniqueNotClass("hide");
            $("#tabs .tab-nav-item").get(index).uniqueClass("cur");
        }
        handleClick() {
            $(this.root).on("click", ".tab-nav-item", (event) => {
                const $this = $(event.target)
                const index = $this.getAttr("data-index")
                this.onSelect(index);
                this.changeTab(index);
            })
        }
    }
    root.Tabs = Tabs
}.call(this))