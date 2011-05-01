var http = require('http');
http.createServer(function (req, res) {
try{
	getPage(req.url,req.method,function(page,type,num,override){
		if(override)
		{
			res.writeHead(301,{'Location':'http://www.webos-internals.org'+req.url})
			res.end()
		}
		else
		{
			if(page&& page!="null")
			{
				res.writeHead(num||200,{'Content-Type': type["content-type"]});
				res.end(page);	
			}
			else
			{
				res.writeHead(404)
				res.end(404)
			}
		}
	})
}catch(e)
{
	console.log(e)
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('You broke it.  You Monster.\n');
}
}).listen(process.env.VMC_APP_PORT);
function getPage(path,method,callback)
{
	try{
		var data=null;
		var type=null;
		var options = {
		  host: 'www.webos-internals.org',
		  port: 80,
		  path: path,
		  method: method
		};
		var req = http.request(options, function(res) {
	//	  console.log('STATUS: ' + res.statusCode);
	//	  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  res.on("error",function(e){
			console.log(e)
		})
		if(res.statusCode==301)
		{
			getPage(res.headers.location.replace("http://www.webos-internals.org",""),method,callback);
		}
		else
		{
			if(res.headers["content-type"]=="text/html; charset=utf-8")
			res.setEncoding("utf8")
			//else
		//	res.setEncoding("binary")
		  res.on('data', function (chunk) {
		    //console.log('BODY: ' + chunk);
			if(data)
				data+=chunk
			else
				data=chunk
		  });
		res.on("end",function(){
			if(res.headers["content-type"]=="text/html; charset=utf-8")
			{
				callback(data.replace(/(.*)webos(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m)&& /\"/.test(m))){return m+"webos"+m2}else{return m+"webaws"+m2}}).replace(/(.*)webOS(.*)/g,function(key,m,m2){return m+"webAWS"+m2}).replace(/(.*)webOS(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"webOS"+m2}else{return m+"webAWS"+m2}}).replace(/(.*)WebOS(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"WebOS"+m2}else{return m+"WebAWS"+m2}}).replace(/(.*)Webos(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"Webos"+m2}else{return m+"Webaws"+m2}}).replace(/(.*)Linux(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"Windows 95"+m2}else{return m+"Windows 95"+m2}}).replace(/(.*)AT&T(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"AT&T&T&T&T"+m2}else{return m+"AT&T&T&T&T"+m2}}).replace(/(.*)GB(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"GeeBees"+m2}else{return m+"GeeBees"+m2}}).replace(/(.*)2.1.0(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"Two Dot One Dot Zero"+m2}else{return m+"Two Dot One Dot Zero"+m2}}).replace(/(.*)2.1(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){if(/0/.test(m2)){return m+key+m2}else{return m+"Two Dot One"+m2}}else{return m+"Two Dot One"+m2}}).replace(/(.*)2.x(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"Two Dot Ex"+m2}else{return m+"Two Dot Ex"+m2}}).replace(/(.*)1.4.5(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"One Dot Four Dot Five"+m2}else{return m+"One Dot Four Dot Five"+m2}}).replace(/(.*)1.4.0(.*)/g,function(key,m,m2){if((/http\:\/\//.test(m) && /(.*)>(.*)/.test(m)) || (/\//.test(m) && /\"/.test(m))){return m+"One Dot Four Dot Zero"+m2}else{return m+"One Dot Four Dot Zero"+m2}}).replace(/<!DOCTYPE html(.*)>/,"<!DOCTYPE html>").replace(/<!-- start content -->/g,"<!-- start content --><div style=\"background-color:#F8DAF8;padding:10px;border:1px solid #AAAAAA;margin-bottom:10px;text-align:center;\"><b>Warning:</b> This page is meant as a parody only.  For the real wiki, Go <a href=\"http://www.webos-internals.org\">Here</a>.  The Code is <a href=\"https://github.com/halfhalo/wosi-parody\">Here</a></div>"),res.headers,res.statusCode)
			}
			else
			{
				callback(null, null, null,{})
			}
		})	
		}
		});
		req.end();
	}catch(e)
	{
		console.log(e)
		callback("","")
	}
}