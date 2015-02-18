var util = {};
util._j = function(type) {
    return function(element) {
        return Object.prototype.toString.call(element) === "[object " + type + "]"
    }
}
util.overRide = function(older, newer) {
    var n;
    for (n in newer) {
        older[n] = newer[n]
    }
}
util.isString = util._j("String");
util.isArray = util._j("Array");
util.isFunction = util._j("Function");
util.getLabel = function(node) {
    var nodeLabel = node.getAttribute("bslb");
    if (!nodeLabel) {
        nodeLabel = "bl" + label++;
        node.setAttribute("bslb", nodeLabel);
    }
    return nodeLabel
}
util.isObject = util._j("Object");
util.each = function(src, callback) {
    var i;
    for (i in src) callback(i, src[i])
}