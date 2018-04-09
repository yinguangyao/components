(function () {
    const root = this;
    const templateX = function (tpl, obj) {
        const re = /<%([^%>]+)%>/g
        let match, index = 0, arr = []
        while (match = re.exec(tpl)) {
            const str2 = tpl.slice(index, match.index)
            index = match[0].length + match.index
            arr.push(str2, match[1])
        }
        arr.push(tpl.substr(index, tpl.length - 1))
        const arrStr = "return " + arr.join("")
        console.dir(arrStr)
        with(obj) {
            return new Function(arrStr)()
        }
    }
    root.templateX = templateX
    templateX("312312<%name%>341231", {name: "ygy"})
}.call(this))

new Function("args", "console.log(args)")