registerModule(this,'jq2much', function(jq2much, _jq2much_){
	
	jQuery.fn.findSafe = function(selector, ignore) {
		return this.find(selector).not(this.find(ignore).find(selector));
	};
	
	
});