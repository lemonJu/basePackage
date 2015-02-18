var addScript = function(setting, callback){
	var src = setting["src"],
		//默认60s超时
		timeout = setting["timeout"] || 60000,
		parentNode = setting["parentNode"] || document.body,
		//是否加载完成
		done = false,
		handle,
		//判断是否是老的ie
		isOldIE = !!document.attachEvent && !(window.opera && toString.call(window.opera) == '[object Opera]');
	var getRandId = function(){
		return 'as_' + parseInt(Math.random()*100);
	}

	var scriptTag = document.createElement("script");

	scriptTag.src = src;

	if( isOldIE ) {
		scriptTag.event = "onclick";
		scriptTag.id = scriptTag.htmlFor = "sc1";
	}
	
	parentNode.appendChild(scriptTag);
	 

	handle = window.setTimeout(function(){
		done = true;
		throw new Error("timeout : " + src);
		scriptTag.parentNode.removeChild(scriptTag);
	},timeout);

	scriptTag.onload = scriptTag.onreadystatechange = function() {
		if ( isOldIE && /loaded|complete/.test(scriptTag.readyState) ) {
		    try {
		    	scriptTag.onclick();
		    } catch( e ) {}
		}
		clearTimeout(handle);
		scriptTag.onload = null;
		scriptTag.onreadystatechange = null;
		//执行回调
		done = true;
		callback();
	}

	
}