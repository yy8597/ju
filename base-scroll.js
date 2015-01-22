/**
 * @Description ju-tab
 * @Author 		YanYang
 * @Qq			175225632
 */
define(function(require, exports){
	var $ = require('jquery');
	var _ = require('underscore');
    var PageingScroller = require('ui/scroller/pageing-scroller');

    exports.init = function(subPub){
    	subPub.subscribe('init.UI.base.scroll', function($obj, events, config){
            var sizeArr;
             if(config === undefined){
                config = defaultConfig;
            }
            if(typeof config == 'string'){
                sizeArr = config.split(',');
                if(sizeArr.length !== 3){
                    throw('[ju-scroll] config ' + config + ' error!');
                }
                config = sizeArr;
            }else{
                throw('[ju-scroll] config ' + config + ' error!');
            }

            var DONE = [], pageingScroller;
            var $parent = parents($obj, 'div.grid');

            var $bn = $parent.find('.ui-next').on('click', function(e){
                e.preventDefault();
                events.trigger('onNext');
            });

            var $bp = $parent.find('.ui-pre').on('click', function(e){
                e.preventDefault();
                events.trigger('onPrev');
            });

            var width = $obj.find('li, dl').outerWidth(true);
            var count = $obj.find('li, dl').length;

            //初始化第一个tab
            var init = function(i){
                pageingScroller = new PageingScroller({
                    $cont    : $obj
                    , width  : width
                    , count  : count
                    , events : events
                    , pageSize : config[i]
                });
            };
            // must start by publish reload
            subPub.subscribe('UI.base.scroll.reload', function(i){
                pageingScroller && pageingScroller.destory();
                init(i);
            });
        });

        exports.init = $.noop;
    };

    function parents($dom, selector){
        while(($dom = $dom.parent()) && $dom.length) {
            if($dom.is(selector)) {return $dom;}
        }
        return $();
    }
});