! function(window) {
    var css = {};

    function pfx(style) {
        //得到符合的前缀
        var s = "Webkit,Moz,O,ms,Khtml",
            pre = s.split(","),
            tNode = document.createElement("div");
        for (var i = 0; i < pre.length; i++) {
            //重新组装style
            var reStyle = pre[i] + style.charAt(0).toUpperCase() + style.substr(1);

            if (tNode.style[reStyle] != undefined) {
                return reStyle;
            }
        }
        return style
    }

    css.setCss = function(node, styles) {
        if (util.isArray(node)) {
            util.each(node, function(k, v) {
                util.each(styles, function(style, value) {
                    v.style[pfx(style)] = value;
                });
            });
        } else if (typeof styles === 'object') {
            util.each(styles, function(style, value) {
                node.style[pfx(style)] = value;
            });
        }
    };
    css.getCss = function(node, style) {
        //兼容ie ff
        var styles = window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle;
        return styles[pfx(style)];
    }

    window.css = css
}(window)
