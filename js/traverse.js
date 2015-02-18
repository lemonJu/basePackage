var nodeIntor = function(){
	var _this,//保存this指针
		nodes = [],//保存所有符合条件的node
	callback = function(node) {
		//过滤text
		if(_this.filter(node) && node.nodeType == 1) {
			nodes[nodes.length] = node;
		}
	},
	//遍历node
	processElements = function(node, isOuter) {
		var children = node.hasChildNodes()?node.childNodes:[];
		for(var i = 0;i < children.length;i++) {
			//递归遍历
			if( children[i].hasChildNodes() ) {
				processElements(children[i]);
			}
			callback.call( this, children[i] );
		}
		if(isOuter)
			callback.call( this, node );
	},
	//初始化函数
	init = function(selector, filter){
		this.root = Choose(selector)[0];  // || document
		this.filter = filter;
		_this = this;
		processElements(this.root,true);
	};
	return {
		traverse : init,
		nodes : nodes
	}
}()