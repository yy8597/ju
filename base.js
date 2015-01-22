/**
 * @Description ju
 * @Author 		YanYang
 * @Qq			175225632
 */
define(function(require, exports){
	var $ = require('jquery');
	var _ = require('underscore');
	var Events = require('util/event/event-aggregator');

    function Ju($container, subPub){
        if(subPub === undefined){
            subPub = new Events();
        }

        this.subPub = subPub;
        this.$container = $container;

        _.extend(this, subPub);
    }
    _.extend(Ju.prototype, {
        start : function() {
            !window.juConfig && (window.juConfig = {
                _configs : {}
                , set    : function(name, config){
                    this._configs[name] = config;
                }
                , get    : function(name){
                    this._configs[name] === undefined && (this._configs[name] = {});
                    return this._configs[name];
                }
            });

            var $container = this.$container;
            var subPub = this.subPub;

            if(!$container){
                $container = $('body');
            }
            $container.find('.ju-base').each(function(){
                var events = new Events();
                var t = $(this);
                var configName;

                var config = $(this).attr('ju-config') || $(this).attr('data-ju-config');

                if(config === undefined){
                    configName = $(this).attr('ju-config-name') || $(this).attr('data-ju-config-name');
                    config = juConfig.get(configName);
                }

                $.data(this, {
                    config: config
                });

                var className = $(this).attr('class');
                _.each(className.split(' '), function(n){
                    if(/ju-/.test(n) && n !=='ju-base'){
                        if(n == 'ju-base'){
                            return;
                        }
                        
                        if(/ju-base/.test(n)){
                            require.async('./' + n.slice(3), function(ui){
                                ui.init(subPub);
                                n = n.slice(3).replace(/-/g,'.');
                                subPub.publish('init.UI.' + n, t, events, config);
                                subPub.publish('done.UI.' + n, t, events);
                            });
                        }else{
                            n = n.slice(3).replace(/-/g,'.');
                            subPub.publish('init.UI.' + n, t, events, config);
                            subPub.publish('done.UI.' + n, t, events);
                        }
                    }
                });
            });
        }
    })


	return Ju;
});