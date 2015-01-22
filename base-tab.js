/**
 * @Description ju-tab
 * @Author 		YanYang
 * @Qq			175225632
 */
define(function(require, exports){
    var tab = require('ui/tab/tab');
    var delayload = require('util/delayload');

    exports.init = function(subPub){
    	subPub.subscribe('init.UI.base.tab', function($obj, events){
            tab($obj, {
                onSwitch: function(i, $cont){
                    delayload.update();

                    events.trigger('onTab', i, $cont);
                }
            });
        });

        exports.init = function(){};
    }
});