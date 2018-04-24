(function() {
    var root = this;
    // html实体字符编码
    var escapeConvert = (function() {
        var escapeMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '`': '&#x60;'
        };
        var escaper = function (match) {
            return escapeMap[match];
        };
        var escape = function(string) {
            var source = "(" + Object.keys(escapeMap).join("|") + ")";
            var regexp = RegExp(source);
            var regexpAll = RegExp(source, "g");
            return regexp.test(string) ? string.replace(regexpAll, escaper) : string;
        }
        return escape;
    }())
    // 转义字符
    var escapes = {
        '"': '"',
        "'": "'",
        "\\": "\\",
        '\n': 'n',
        '\r': 'r',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    }
    var escaper = RegExp(Object.keys(escapes).join("|"), "g");
    var convertEscapes = function(match) {
        return "\\" + escapes[match];
    }
    // 这里先后顺序很重要，一定要保证evaluate在最后
    var templateSettings = {
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g,
        evaluate: /<%([\s\S]+?)%>/g,
    }
    var matcher = RegExp(Object.keys(templateSettings).map(function(key) {
        return templateSettings[key].source
    }).join("|")+"|$", "g")
    var template = function(tpl, data, regexpSetting, settings) {
        var source = "", index = 0
        tpl.replace(matcher, function(match, evaluate, interpolate, escape, offset) {
            source += "__p += " + tpl.slice(index, offset).replace(escaper, convertEscapes) + ";\n"
            index = offset + match.length;
            if(evaluate) {
                source += "__p += " + evaluate + ";\n"
            } else if(interpolate) {
                source += "__p += (" + interpolate + ") == null ? '' : "+interpolate+";\n"
            } else if(escape) {
                source += "__p += (" + escape + ") == null ? '' : "+escapeConvert(escape)+";\n"
            }
            return match;
        })
        source = "var __p = '';" + source + 'return __p'
        if(!(settings && settings.variable)) source = "with(obj||{}) {\n" + source + "}\n"
        return new Function("obj", source)(data);
    }
    root.templateY = template
}.call(this))