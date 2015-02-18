/**
 * 依赖于util.js
 */

var dom = {};
dom.$$ = function(context, selector) {
    context = context || document;
    if(document.querySelectorAll) 
        return document.querySelectorAll(selector)
}
dom.on = function(node, type, callback){
    var addEvent = document.addEventListener ? node.addEventListener : node.attachEvent,
        type = document.addEventListener ? type : 'on' + type;
    addEvent.apply(node,[type, callback ,false])
}

dom.$class = function(className, context) {
    var nodes = dom.$$(context, "." + className);
    var result = [];
    if(nodes) {
        return nodes
    }else{
        nodes = document.getElementsByTagName("*");
        util.each(nodes, function(key, value) {
            if(value && value.nodeType && value.className == className) 
                result.push(value)
        })
        return result
    }
}

dom.$id = function(id) {
    return document.getElementById(id)
}