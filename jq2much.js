!(function (root) {
    root.jq2much = root.jq2much || {};
    var jQuery = root.jQuery;

    jQuery.fn.findSafe = function (selector, ignore) {
        var $nested = this.find(ignore);
        if ($nested.length > 0) {
            return this.find(selector).not($nested.find(selector));
        } else {
            return this.find(selector);
        }
    };

    if ('querySelector' in document) {
        jQuery.getFirst = function (selector, $c) {
            if ($c) {
                if ($c[0]) return jQuery($c[0].querySelector(selector));
                return jQuery();
            }
            return jQuery(document.querySelector(selector));
        };
    } else {
        jQuery.getFirst = function (selector, $c) {
            return jQuery(selector, $c).first();
        };
    }

    jQuery.whenAll = function (firstParam) {
        var args = arguments,
            sliceDeferred = [].slice,
            i = 0,
            length = args.length,
            count = length,
            rejected,
            deferred = length <= 1 && firstParam && jQuery.isFunction(firstParam.promise)
                ? firstParam
                : jQuery.Deferred();

        function resolveFunc(i, reject) {
            return function (value) {
                rejected |= reject;
                args[i] = arguments.length > 1 ? sliceDeferred.call(arguments, 0) : value;
                if (!( --count )) {
                    // Strange bug in FF4:
                    // Values changed onto the arguments object sometimes end up as undefined values
                    // outside the $.when method. Cloning the object into a fresh array solves the issue
                    var fn = rejected ? deferred.rejectWith : deferred.resolveWith;
                    fn.call(deferred, deferred, sliceDeferred.call(args, 0));
                }
            };
        }

        if (length > 1) {
            for (; i < length; i++) {
                if (args[i] && jQuery.isFunction(args[i].promise)) {
                    args[i].promise().then(resolveFunc(i), resolveFunc(i, true));
                } else {
                    --count;
                }
            }
            if (!count) {
                deferred.resolveWith(deferred, args);
            }
        } else if (deferred !== firstParam) {
            deferred.resolveWith(deferred, length ? [firstParam] : []);
        }
        return deferred.promise();
    };
    
    
    
   var pipe = function (condition) {
        this.list = [];
        this.deff = $.Deferred();
        this.condition = condition || this.condition;
    };

    pipe.prototype = {
        condition : function(){
            return true;
        },
        done : function (callback) {
            return this.deff.promise().done(callback)
        },
        add : function (prom) {
            var pipe = this;
            var list = this.list;
            list.push(prom)
            prom.always(function (resp) {
                list.pop();
                if (pipe.list.length == 0 && pipe.condition(resp)) {
                    window.setTimeout(function () {
                        if (list.length == 0) {
                            pipe.deff.resolve();
                        }
                    }, 500);
                }
            })
            return this;
        }
    };
    
    jQuery.dQ = function(a,b,c,d){
        return new pipe(a,b,c,d);
    };

})(this);
