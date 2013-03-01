var apiUrl = 'http://agile-dusk-2349.herokuapp.com/api/v1/'


	


function setKey(newKey){
	window.localStorage.setItem("key", newKey)
}

function getKey(){
	return window.localStorage.getItem("key")
}

function isLoggedIn(){
	return(window.localStorage.getItem("key") != null)
}

function createNewSession(key, red, green, blue){
	var data = JSON.stringify({
		'key': key,
		'red': red,
		'green': green,
		'blue': blue
	})

	sendAjax(data, $('#ajaxMessage'), successCreate, 'session', 'POST', false)
}

function successCreate(data, messageTarget){
	setKey(data.key)
	window.location = 'allcamps.php'
}

function getSession(key, messageTarget, successFunc){
	setKey(key)
	sendAjax(null, messageTarget, successFunc, 'session', 'GET', true)
}

function redirectExisting(data, messageTarget){
	if(data.meta.total_count > 0){
		window.location = 'allcamps.php'
	}else{
		messageTarget.html('Session not found')
	}
	
}

function updateSession(data, messageTarget){
	if(data.meta.total_count < 1){
		messageTarget.html('Session not found')
	}else{
		for(var i = 0; i < data.objects[0].borderlands.length; i++){
			updateBorderland(data.objects[0].borderlands[i])
		}
		setChangeListeners()
	}
}

function updateBorderland(data){
	var html = '<b><p>'+data.server+'</p></b>'
	html += '<table class="table">\n'
	html+= '<th><td>Colour</td><td>Since last Flip</td><td>Last Update</td><td>Flip</td>\n'
	for(var i = 0; i < data.camps.length; i++){
		html+= '<tr>\n'
		html+= '<td>'+data.camps[i].name +'</td>'
		html+= '<td id="img-'+data.camps[i].id+'"><img src="assets/img/camp_'+data.camps[i].color + '.png"/></td>'
		html+= '<td id="flip-'+data.camps[i].id+'">'+timeSpentSince(processDate(data.camps[i].lastChanged))+ '</td>'
		html+= '<td id="update-'+data.camps[i].id+'">'+timeSpentSince(processDate(data.camps[i].lastUpdate)) + '</td>'
		html+= '<td id="submit-'+data.camps[i].id+'">'+genSelectBox() + '</td>'
		
	}

	$('#bl-'+data.name).html(html)
	for(var i = 0; i < data.camps.length; i++){
		startCount($('#flip-'+data.camps[i].id))
		startCount($('#update-'+data.camps[i].id))
	}

	
}

function genSelectBox(){
	var html = '<select>\n'
	html += '<option value="blank">&nbsp;</option>\n'
	html += '<option class="opt-red" value="red">Red</option>\n'
	html += '<option class="opt-green" value="green">Green</option>\n'
	html += '<option class="opt-blue" value="blue">Blue</option>\n'
	html += '<option class="opt-grey" value="grey">Grey</option>\n'
	html += '</select>'
	return html
}

function setChangeListeners(){
	$('.border-info select').on('change', function(){
		if(this.value != 'blank'){
			updateCamp($(this).parent().attr('id').split('-')[1], this.value)
		}
		
	})
}

function updateCamp(id, color){
	var data = JSON.stringify({
		"id": id,
		"color": color
	})

	sendAjax(data, $('#sessionUpdateError'), successUpdateCamp, 'updatecamp', 'POST', true)
	
	
}

function successUpdateCamp(data, messageTarget){
	$('#img-'+data.id).html('<img src="assets/img/camp_'+data.color + '.png"/>')
	$('#flip-'+data.id).html(timeSpentSince(processDate(data.lastChanged)))
	$('#update-'+data.id).html(timeSpentSince(processDate(data.lastUpdate)))
}

function processDate(dateString){
	//datestrings come in y m d h m s
	var str = dateString.split(' ')
	return new Date(str[0], str[1]-1, str[2], str[3], str[4], str[5])
}

function timeSpentSince(infoDate){
	var localTime = new Date()
	console.log(localTime)
	console.log(toUTCTime(localTime))
	var delta = (toUTCTime(localTime)-infoDate) / 1000 // seconds
	

	var diffHrs = Math.floor(delta / 3600) % 24;
	var diffMins = Math.floor(delta / 60) % 60;
	var diffSecs = Math.floor(delta)% 60;
	return doubleDigits(diffHrs) + ':' + doubleDigits(diffMins) + ':' + doubleDigits(diffSecs)


}

function toUTCTime(now){
	return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function doubleDigits(num){
	if(num < 10){
		return '0'+num
	}else{
		return num
	}
}




function validateField(field, fieldName, messageTarget, rule, required, min, max){
	if(messageTarget != null){
		messageTarget.html('&nbsp;')
	}
	var text = field.val().trim()
	if(required){
		if (text==null || text==''){
			messageTarget.html(fieldName + ' is required')
			return false
		}
	}
	if(min){
		if(text.length < min && required){
			messageTarget.html(fieldName + ' must be min ' + min + ' characters')
			return false
		}
	}
	if(max){
		if(required || text.length > 0){
			if(text.length > max){
				messageTarget.html(fieldName + ' must be max ' + max + ' characters')
				return false
			}
		}
	}

	if(rule){
		if(required || text.length > 0){
			if(!testInputRule(rule, text)){
				messageTarget.html(fieldName + ' contains invalid characters')
				return false
			}
		}
		
	}

	return true
}

function testInputRule(rule, text){
	if(rule == 'alphanum'){
		var reg = /^([a-zA-Z0-9 _-]*)$/
		return reg.test(text)
	}else if(rule == 'email'){
		var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return reg.test(text)
	}else if(rule == 'password'){
		var reg = /^[\w!@#%&/(){}[\]=?+*^~\-_ .:,;]*$/
		return reg.test(text)
	}else if(rule == 'num'){
		var reg = /^[0-9]*$/
		return reg.test(text)
	}
	return false
}


function sendAjax(data, messageTarget, successFunc, apiLocation, reqType, useAuth){
//	showAjaxLoad(true)
	if(messageTarget != null){
		messageTarget.html('&nbsp;')
	}
	
	var auth=''
	if(useAuth){
		user = window.localStorage.getItem("key")
		auth = '&user=' + user
	}

	$.ajax({
		url: apiUrl + apiLocation + '/?format=json' + auth,
		type: reqType,
		contentType: 'application/json',
		data: data,
		dataType: 'json',
		crossDomain: true,
		processData: false,
		success: function(data, status, jqXHR) {
	//		showAjaxLoad(false)
			if(successFunc != null){
				successFunc(data, messageTarget)
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
	//		showAjaxLoad(false)
			if(messageTarget != null){
				messageTarget.html(jQuery.parseJSON(jqXHR.responseText).error_message)
			}
		}
	})

}



var timers = []
function startCount(element)
{
	timers.push(setInterval(function(){
						count(element)
						},1000));
}


function count(elem)
{
	//console.log('count')
	var time_shown = elem.text()
        var time_chunks = time_shown.split(":");
        var hour, mins, secs;
 
        hour=Number(time_chunks[0]);
        mins=Number(time_chunks[1]);
        secs=Number(time_chunks[2]);
        secs++;
            if (secs==60){
                secs = 0;
                mins=mins + 1;
               } 
              if (mins==60){
                mins=0;
                hour=hour + 1;
              }
              if (hour==13){
                hour=1;
              }
 		
        elem.html(plz(hour) +":" + plz(mins) + ":" + plz(secs));
 
}
 
function plz(digit){
 
    var zpad = digit + '';
    if (digit < 10) {
        zpad = "0" + zpad;
    }
    return zpad;
}