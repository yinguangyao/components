/* 一个简单的模板引擎，你可以在script里面编写模板，用法如下：
* 如果是一个变量，<%name%>
* 如果是JS语句，<%if(true) { alert("hello, world"}%>
* 调用方式，templateX(tpl, data); 
* tpl指模板字符串，data是传入的对象
* 具体使用方式请参考tab.html
* todo: 由于正则解析的问题，目前不支持类似{# #}的语法
*/
(function () {
    const root = this;
    let match, index = 0, code = "const arr = [];"
    let evaluate = /<%([\s\S]+?)%>/g, reJs = /^( )?(for|if|switch|case|else|break|{|})(.*)/g
    const escapes = {
        "'": "'",
        '"': '"',
        '\\': '\\',
        '\r': 'r',  
        '\n': 'n',
        '\u2028': 'u2028', 
        '\u2029': 'u2029' 
      };
    const escapeChar = (escape) => {
        return '\\' + escapes[escape];
    }
    const escaper = /\\|'|"|\r|\n|\u2028|\u2029/g;
    const add = (str, bool) => {
        code += bool? str.match(reJs) ? str : 'arr.push(' + str + ');' : 'arr.push("' + str.replace(escaper, escapeChar) + '");\n'
        return add;
    }
    const templateX = function (tpl, obj, newEvaluate) {
        if(newEvaluate)  evaluate = newEvaluate
        while (match = evaluate.exec(tpl)) {
            add(tpl.slice(index, match.index))(match[1], true)
            index = match[0].length + match.index
        }
        add(tpl.slice(index, tpl.length))
        code = "with(obj) {\n" + code + 'return arr.join(\"\")' + "\n}";
        return new Function("obj", code)(obj);
    }
    root.templateX = templateX
}.call(this))