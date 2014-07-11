function getdata() {
    		var req1, req2, res1, res2, lat1, lon1;

		req1 = new XMLHttpRequest();
		req2 = new XMLHttpRequest();
		
		req1.onreadystatechange = function() {
			var state = req1.readyState;
			if (state !== 4) { // while the status event is not Done we continue
			return;
			}
			res1 = JSON.parse(req1.responseText);
			lat1 = res1.latitude;
			lon1 = res1.longitude;
			suntime(lat1,lon1);			
		};
		
		req2.onreadystatechange = function() {
			var state2 = req2.readyState;
			if (state2 !== 4) { // while the status event is not Done we continue
			return;
		}
			res2 = req2.responseText;
			dawnstart = res2.indexOf("</civil>");
			duskstart = res2.lastIndexOf("</civil>");
            twiciv1 = "Dawn: " + res2.substr(dawnstart-8,8);
            twiciv2 = "Dusk: " + res2.substr(duskstart-8,8);
			document.getElementById("startScreen_mobiletextarea_3").value = (twiciv1);
			document.getElementById("startScreen_mobiletextarea_4").value = (twiciv2);

		};
		
		req1.open('GET','https://freegeoip.net/json/');
		req1.send();

		function suntime(parm1, parm2) {
			var d = new Date();
			day = d.getDate();
			month = d.getMonth()+1;
			req2.open('GET','http://www.corsproxy.com/www.earthtools.org/sun/'+parm1+'/'+parm2+'/'+day+'/'+month+'/99/1');
			req2.send();
		}

    	document.getElementById("startScreen_mobiletextarea_1").innerHTML = "I don't know.";
}