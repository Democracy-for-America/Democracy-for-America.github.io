var xhrCaller=function(){return window.XMLHttpRequest?new XMLHttpRequest:window.ActiveXObject?activeXCaller():null},activeXCaller=function(){var a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","MSXML2.XMLHTTP.3.0"];for(var b=0;b<a.length;b++)try{return new ActiveXObject(activexmodes[b])}catch(c){}return null};