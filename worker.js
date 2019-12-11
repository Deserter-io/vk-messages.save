"use strict";

const worker = {
	
	init: function() {
		
		// generate random callback name
		this.callbackName = 'cb' + Math.random().toString(36).substr(2, 5);
		
		// expose callback
		self[this.callbackName] = function(r) {
			
			console.log("callback called", r);
			postMessage(r);
			
		}
		
		self.addEventListener("message", e => {
			if( e.data.method && e.data.params) {
				const method = e.data.method;
				const params = e.data.params;
				
				params.callback = this.callbackName;
				if (!params.hasOwnProperty('v')) params.v = '5.85';

				// jsonp call to VK API
				const url = 'https://api.vk.com/method/' + method;
				
			  const queryString = Object.keys(params)
			  	.map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
			  	.join('&')
			  ;
			  
			  importScripts(url + '?' + queryString);
				
			}
		});
	}
	
	,callbackName: 'callback'
	
	
}


worker.init();
