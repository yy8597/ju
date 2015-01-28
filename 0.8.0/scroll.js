/**
 * @Description ju-tab
 * @Author 		YanYang
 * @Qq			175225632
 */
define(function(require, exports){
	var $ = require('jquery');
	var _ = require('underscore');
    var PageingLoop = require('ui/pager/1.0.0/paging-loop');

    exports.init = function(subPub){
    	subPub.define('base-scroll', function($obj, events, config){
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

            var DONE = [], pageingLoop;
            var $parent = parents($obj, 'div.grid'); // pptv主站以.grid作为一个模块，如果是其他环境中需要修改

            var $bn = $parent.find('.ui-next').on('click', function(e){
                e.preventDefault();
                events.trigger('onNext');
            });

            var $bp = $parent.find('.ui-pre').on('click', function(e){
                e.preventDefault();
                events.trigger('onPrev');
            });

            $obj.css({
                'position' : 'relative'
                , 'overflow' : 'hidden'
            });

            //初始化第一个tab
            var init = function(i){
                pageingLoop = PageingLoop.create({
                    $container  : $obj.children(':first')
                    // , width  : width
                    // , count  : count
                    , events : events
                    , pageSize : parseInt(config[i])
                });
            };
            // must start by publish reload
            subPub.subscribe('UI.base.scroll.reload', function(i){
                pageingLoop && pageingLoop.destory();
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