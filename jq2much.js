registerModule(this,'jq2much', function(jq2much, _jq2much_){
	
	jQuery.fn.findSafe = function(selector, ignore) {
		var $nested = this.find(ignore);
		if($nested.length>0){
			return this.find(selector).not($nested.find(selector));
		} else{
			return this.find(selector);
		}
	};
	
	
});