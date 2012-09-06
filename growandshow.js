/*! growAndShow
* https://github.com/timhettler/jQuery-growAndShow
* Copyright (c) 2012 Tim Hettler; Licensed MIT License, GPL */

(function ( $, window, document, undefined ) {

    var pluginName = 'growAndShow',
        GrowAndShow = function (element, settings) {

        this.$el = $(element);
        this.settings = $.extend({}, $.fn.growAndShow.defaultSettings, settings || {});

        this[this.settings.action]();

    };

    GrowAndShow.prototype = {

        open: function (selector) {

            var _self = this,
                target = selector || _self.settings.selector;

            if(!_self.$el.children(target).length) { return false; }

            if(_self.$el.children(target).is('.is-hidden')) {

                _self.$el.addClass('is-active').show().height(_self.$el.height()).children()
                    .not(target)
                        .fadeTo(_self.settings.speed, 0, function(){
                            $(this).removeClass('is-active').addClass('is-hidden').css({
                                'display' : '',
                                'opacity' : ''
                            });
                        }).delay(_self.settings.speed).end().filter(target).removeClass('is-hidden').hide()
                    .end()
                .end().animate({'height':_self.$el.children(target).outerHeight()}, _self.settings.speed, function () {
                    _self.$el.css('height', 'auto').children(target).addClass('is-active').fadeTo(_self.settings.speed, 1, function () {
                        $(this).css({
                            'display' : '',
                            'opacity' : ''
                        });
                    });
                    _self.settings.callback.apply(_self.$el);
                });

            }

        },

        close: function (selector) {

            var _self = this,
                target = selector || _self.settings.selector;

            _self.$el.height(_self.$el.height()).children()
                .fadeTo(_self.settings.speed, 0,function(){
                    $(this).removeClass('is-active').addClass('is-hidden').css({
                        'display' : '',
                        'opacity' : ''
                    });
                })
            .end().delay(_self.settings.speed).animate({'height':0}, _self.settings.speed,function () {
                $(this).css('height', '').removeClass( 'is-active' );
                _self.settings.callback.apply(_self);
            });

        },

        toggle: function (selector) {

            var _self = this,
                target = selector || _self.settings.selector;

            _self.$el.stop().children().stop();

            if(_self.$el.children(target).is('.is-hidden')) {

                _self.open(target);

            } else {

                _self.close(target);

            }
        }
    };

    $.fn[pluginName] = function (settings) {
        var args = arguments;

        if (settings === undefined || typeof settings === 'object') {

            return this.each(function () {

                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new GrowAndShow( this, settings ));
                }

            });

        } else if (typeof settings === 'string') {

            return this.each(function () {

                var instance = $.data(this, 'plugin_' + pluginName);

                if (instance instanceof GrowAndShow && typeof instance[settings] === 'function') {
                    instance[settings].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

            });
        }

    };

    $.fn.growAndShow.defaultSettings = {
        selector : ':first-child',
        speed : 200,
        action : 'toggle',
        callback : function () {
        }
    };

}( jQuery, window, document ));