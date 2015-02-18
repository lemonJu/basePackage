! function(window) {
    var get = function() {
        var xmlHttp;
        if (window.ActiveXObject) xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        else xmlHttp = new XMLHttpRequest();
        return xmlHttp
    };
    /**
     * part = ajax
     */

    var ajax = {};
    ajax.xhr = get();
    ajax.config = {
        method: "get",
        params: "",
        asnyc: true,
        url: "",
        success: function() {},
        error: function() {},
        beforeSend: function() {}
    }
    ajax.sender = function(setting) {
        var xhr = this.xhr,
            config = this.config;
        util.overRide(config, setting);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                config.callback.call(this, xhr.responseText)
            } else if (xhr.readyState == 1) {
                config.beforeSend.call(this, xhr)
            }
        }
        if (xhr.onerror === null) xhr.onerror = config.error;

        xhr.open(config.method.toUpperCase(), config.url, config.asnyc);
        if (config.method == "post")
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        xhr.send(config.params)
    }

    ajax.get = function(url, params, callback) {
        ajax.sender({
            method: "get",
            url: url,
            params: params,
            success: callback
        })
    }

    ajax.post = function(url, params, callback) {
        ajax.sender({
            method: "post",
            url: url,
            params: params,
            success: callback
        })
    }

    ajax.getJSON = function(url, params, callback) {
        ajax.sender({
            method: "post",
            url: url,
            params: params,
            success: function(text) {
                callback.call(this, eval("(" + text + ")"))
            }
        })
    }

    window.ajax = ajax
}(window)
