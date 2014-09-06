function getdata() {
    		var req1, req2, res1, res2, lat1, lon1;
    		var currentTime = new Date()
    		var hours = currentTime.getHours();
    		var minutes = currentTime.getMinutes();
    		var sunrisehour
			var sunriseminute
    		var sunsethour
    		var sunsetminute
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
		
		req2.onreadystatechange = function () {
			var state2 = req2.readyState;
			if (state2 !== 4) { // while the status event is not Done we continue
				return;
			}
            
			res2 = req2.responseText;
			dawnstart = res2.indexOf("</civil>");
			duskstart = res2.lastIndexOf("</civil>");
            sunrise = res2.indexOf("</sunrise>");
            sunset = res2.indexOf("</sunset>");
            twiciv1 = "Dawn: " + res2.substr(dawnstart-8,8);
            twiciv2 = "Dusk: " + res2.substr(duskstart-8,8);
            sunup = "Sunrise: " + res2.substr(sunrise-8,8);
            sundown = "Sunset: " + res2.substr(sunset-8,8);
			document.getElementById("startScreen_mobiletextarea_3").value = (sunup);
			document.getElementById("startScreen_mobiletextarea_4").value = (sundown);
            document.getElementById("details_sunrisetextarea").value = (twiciv1);
            document.getElementById("details_sunsettextarea").value = (twiciv2);
			sunrisehour = res2.substr(sunrise-8,2);
            sunriseminute = res2.substr(sunrise-5,2);
            sunsetminute = res2.substr(sunset-5,2);
            sunsethour = res2.substr(sunset-8,2);
            
            var currentseconds = currentTime.getSeconds() + (60 * currentTime.getMinutes()) + (60 * 60 * currentTime.getHours());
            
            var sunriseseconds = (60 * sunriseminute) + (60 * 60 * sunrisehour);
            
            var sunsetseconds = (60 * sunsetminute) + (60 * 60 * sunsethour);

            if (currentseconds > sunriseseconds && currentseconds < sunsetseconds){
                itisday();
            }
                else{
                itisnight();
            }
            

            
		};
		
		req1.open('GET','http://206.196.111.56:8080/json/');
		req1.send();

		function suntime(parm1, parm2) {
			var d = new Date();
			day = d.getDate();
			month = d.getMonth()+1;
			req2.open('GET','http://www.corsproxy.com/www.earthtools.org/sun/'+parm1+'/'+parm2+'/'+day+'/'+month+'/99/1');
			req2.send();
		}
    
    	document.getElementById("startScreen_mobileheader_3").innerHTML= "Time: " + hours + ":" + minutes;
    
    	function itisday(){
        	document.getElementById("startScreen_mobileheader_2").innerHTML = "It is day!";
    	}
    
        function itisnight(){
            document.getElementById("startScreen_mobileheader_2").innerHTML = "It is night!";
        }
            
         
            
           
        
		
    	document.getElementById("details_header").innerHTML = "Details Page";
}