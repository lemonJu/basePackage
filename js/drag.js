! function(window) {
    /**
     * 依赖于bind.js、util.js、selector.js
     */
    var drag = {},
        bind = dom.on,
        $class = dom.$class,
        index = 0;

    drag.nodes = [];
    drag.cNode; //当前拖动的dom元素
    drag.config = {
        dragComplete: function(srcNode, posi, curIndex) {},
        dragMoving: function(srcNode, posi, curIndex) {
            srcNode.style["left"] = posi["x"] + "px";
            srcNode.style["top"] = posi["y"] + "px"
        }
    };
	drag.bind = function() {
        var position = {};
        var _this = this;

        //事件绑定
        bind(document, "mousedown", function(e) {
            var cNode = e.target || e.srcElement;

            if (!cNode in _this.nodes) return
            _this.cNode = cNode;
            _this.cNode.style["zIndex"] = ++index;
            position["x"] = e.offsetX || e.layerX;
            position["y"] = e.offsetY || e.layerY;
        })

        bind(document, "mousemove", function(e) {
            //得到位置
            if (_this.cNode) {
                var x = e.pageX || e.clientX + document.body.scrollLeft,
                    y = e.pageY || e.clientY + document.body.scrollTop;
                var posi = {};
                posi["x"] = x - position["x"];
                posi["y"] = y - position["y"];
                drag.config.dragMoving(_this.cNode, posi, index);
            }
        })

        bind(document, "mouseup", function(e) {
            var cNode = e.target || e.srcElement;

            if (_this.cNode) {
                var x = e.pageX || e.clientX + document.body.scrollLeft,
                    y = e.pageY || e.clientY + document.body.scrollTop,
                    posi = {};
                posi["x"] = x - position["x"];
                posi["y"] = y - position["y"];

                //$('#console')[0].innerText = "12121212121";
                _this.config.dragComplete(_this.cNode, posi, index);
                _this.cNode = null;
            }

        })
    };
    drag.init = function(config) {
        //得到所有可以拖动的元素
        this.nodes = $class("canDrag");
        //继承自定义方法
        util.overRide(config, config);
        drag.bind();
    }

    window.drag = drag
}(window)
