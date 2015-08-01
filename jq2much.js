registerModule(this,'jq2much', function(jq2much, _jq2much_){
	
	jQuery.fn.findSafe = function(selector, ignore) {
		var $nested = this.find(ignore);
		if($nested.length>0){
			return this.find(selector).not($nested.find(selector));
		} else{
			return this.find(selector);
		}
	};
	
    if ('querySelector' in document){
    	jQuery.getFirst= function(selector,$c) { 
            if($c){
            	if($c[0]) return jQuery($c[0].querySelector(selector))
            	return jQuery();
            } return jQuery(document.querySelector(selector))
        }
    } else {
    	jQuery.getFirst= function(selector,$c) {  
            return jQuery(selector,$c).first();
        }
    }
	
});