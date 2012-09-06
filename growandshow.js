/*! growAndShow
* https://github.com/timhettler/jQuery-growAndShow
* Copyright (c) 2012 Tim Hettler; Licensed MIT License, GPL */

(function ( $, window, document, undefined ) {

    var pluginName = 'growAndShow',
        GrowAndShow = function (element, settings) {

        this.$el = $(element);
        this.settings = $.extend({}, $.fn.growAndShow.defaultSettings, settings || {});

        this[$settings.action]();

    };

    GrowAndShow.prototype = {

        open: function () {

            var _self = this;

            if(!_self.$el.children(_self.settings.selector).length) { return false; }

            if(_self.$el.children(_self.settings.selector).is('.is-hidden')) {

                _self.$el.addClass('is-active').show().height(_self.$el.height()).children()
                    .not(_self.settings.selector)
                        .fadeTo(_self.settings.speed, 0, function(){
                            $(this).removeClass('is-active').addClass('is-hidden').css({
                                'display' : '',
                                'opacity' : ''
                            });
                        }).delay(_self.settings.speed).end().filter(_self.settings.selector).removeClass('is-hidden').hide()
                    .end()
                .end().animate({'height':_self.$el.children(_self.settings.selector).outerHeight()}, _self.settings.speed, function () {
                    _self.$el.css('height', 'auto').children(_self.settings.selector).addClass('is-active').fadeTo(_self.settings.speed, 1, function () {
                        $(this).css({
                            'display' : '',
                            'opacity' : ''
                        });
                    });
                    _self.settings.callback.apply(_self.$el);
                });

            }

        },

        close: function () {

            var _self = this;

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

        toggle: function () {

            var _self = this;

            _self.$el.stop().children().stop();

            if(_self.$el.children(_self.settings.selector).is('.is-hidden')) {

                _self.open(_self.$el);

            } else {

                _self.close(_self.$el);

            }
        }
    };

    $.fn[pluginName] = function (settings) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {

                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new GrowAndShow( this, settings ));
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