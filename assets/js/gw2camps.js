var apiUrl = 'http://agile-dusk-2349.herokuapp.com/api/v1/'


function setKey(newKey){
	window.localStorage.getItem("key", newKey)
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

