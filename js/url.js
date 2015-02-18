var host = function(doc) {
    //没有考虑hash
    var loc = doc.location,
        href = loc.href,
        host = loc.host,
        port = loc.port,
        hash = loc.hash,
        protocol = loc.protocol,
        origin = loc.origin || protocol + "//" + host,
        params = {};
    (function() {
        //得到params
        var query = href.match(/\?.+/);
        var queryTillHash = href.match(/\?.+?#/);

        if (query && query.length) {
            var param;
            if (queryTillHash)
                param = queryTillHash[0].substring(1, queryTillHash[0].length - 1);
            else
                param = query[0].substring(1, query[0].length);

            var paramStr = param.split("&");
            for (var i in paramStr) {
                var opParam = paramStr[i].split("=");
                params[opParam[0]] = opParam[1];
            }
        }

    })();

    return {
        href: href,
        host: host,
        port: port,
        hash: hash,
        protocol: protocol,
        origin: origin,
        params: params
    }

}(document);
