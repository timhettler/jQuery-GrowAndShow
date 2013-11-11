(function ( $, window, document, undefined ) {

    var pluginName = 'growAndShow',

        GrowAndShow = function (element, settings) {
            console.log('test');
            this.$el = $(element);
            this.$el.children()
                .addClass('is-hidden is-transparent')

            this._defaults = $.fn[pluginName].defaultSettings;
            this._name = pluginName;

            this.init(settings);
        };

    GrowAndShow.prototype = {

        init: function (settings) {

            this.settings = $.extend({}, $.fn[pluginName].defaultSettings, settings || {});

            this[this.settings.action]();

        },

        open: function () {

            var _self = this,
                target = _self.settings.selector;

            if(!_self.$el.children(target).length) { return false; }

            if(_self.$el.children(target).is('.is-hidden')) {
                _self.$el
                    .removeClass('is-hidden')
                    .height(_self.$el.height())
                    .children()
                        .not(target)
                            .fadeTo(_self.settings.speed, 0, function (){
                                $(this)
                                    .removeClass('is-active')
                                    .addClass('is-hidden is-transparent')
                                    .css({
                                        display : '',
                                        opacity : ''
                                    });
                            })
                        .end()
                    .end()
                    .delay(_self.settings.speed)
                    .animate({ height : _self.$el.children(target).outerHeight() }, _self.settings.speed, function () {
                        _self.$el
                            .addClass('is-active')
                            .css('height', '')
                            .children(target)
                                .css('opacity', 0)
                                .removeClass('is-hidden is-transparent')
                                .addClass('is-active')
                                .fadeTo(_self.settings.speed, 1, function () {
                                    $(this)
                                        .css({
                                            display : '',
                                            opacity : ''
                                        });

                                    _self.settings.callback.apply(_self.$el);
                                });
                    });

            }

        },

        close: function () {

            var _self = this;

            _self.$el
                .height(_self.$el.height())
                .children()
                    .fadeTo(_self.settings.speed, 0, function (){
                        $(this)
                            .removeClass('is-active')
                            .addClass('is-hidden is-transparent')
                            .css({
                                display : '',
                                opacity : ''
                            });
                    })
                .end()
                .delay(_self.settings.speed)
                .animate({ height : 0 }, _self.settings.speed,function () {
                    _self.$el
                        .removeClass( 'is-active' )
                        .addClass('is-hidden')
                        .css('height', '');

                    _self.settings.callback.apply(_self);
                });

        },

        toggle: function () {

            var _self = this,
                target = _self.settings.selector;

            _self.$el
                .stop()
                .children()
                    .stop();

            if(_self.$el.children(target).is('.is-active')) {

                _self.close(target);

            } else {

                _self.open(target);

            }
        }
    };

    $.fn[pluginName] = function (settings) {
        var args = arguments;

        if (settings === undefined || typeof settings === 'object') {

            return this.each(function () {

                var instance = $.data(this, 'plugin_' + pluginName);

                if (!instance) {

                    $.data(this, 'plugin_' + pluginName, new GrowAndShow( this, settings ));

                } else if (instance instanceof GrowAndShow) {

                    instance.init.apply( instance, Array.prototype.slice.call( args ) );

                }

            });

        } else if (typeof settings === 'string' && settings[0] !== '_' && settings !== 'init') {
            return this.each(function () {

                var instance = $.data(this, 'plugin_' + pluginName);

                if (instance instanceof GrowAndShow && typeof instance[settings] === 'function') {
                    instance[settings].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

            });
        }

    };

    $.fn[pluginName].defaultSettings = {
        selector : ':first-child',
        speed : 200,
        action : 'toggle',
        callback : function () {}
    };

}( jQuery, window, document ));