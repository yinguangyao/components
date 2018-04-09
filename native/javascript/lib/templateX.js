(function () {
    const root = this;
    let match, index = 0, code = "const arr = [];"
    const re = /<%([^%>]+)%>/g,
            reJs = /^( )?(for|if|switch|case|else|break|{|})(.*)/g
    const add = (str, bool) => {
        code += bool? str.match(reJs) ? str : 'arr.push(' + str + ');' : 'arr.push("' + str.replace(/"/g, '\\"').replace(/[\r\n]/g, '') + '");\n'
        return add;
    }
    const templateX = function (tpl, obj) {
        while (match = re.exec(tpl)) {
            add(tpl.slice(index, match.index))(match[1], true)
            index = match[0].length + match.index
        }
        add(tpl.slice(index, tpl.length))
        code = "with(obj) {\n" + code + 'return arr.join(\"\")' + "\n}";
        return new Function("obj", code)(obj);
    }
    root.templateX = templateX
}.call(this))