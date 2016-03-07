chrome.runtime.onMessage.addListener(function(message){
	$("#BPM").text(message)
})