/*
 *  Project: jQuery-GrowAndShow
 *  Description: A jQuery plug-in that opens a container then fades in a selected element.
 *  Author: Tim Hettler
 */

(function ( $, window, document, undefined ) {

    GrowAndShow = function (settings) {

        this.growAndShow = null;
        this.settings = settings;

        return this;

    };

    GrowAndShow.prototype = {

        open: function ($elem) {

            var $self = this;

            if(!$elem.children($self.settings.selector).length) { return false; }

            if($elem.children($self.settings.selector).is('.is-hidden')) {

                $elem.addClass('is-active').show().height($elem.height()).children()
                    .not($self.settings.selector)
                        .fadeTo($self.settings.speed, 0, function(){
                            $(this).removeClass('is-active').addClass('is-hidden').css({
                                'display' : '',
                                'opacity' : ''
                            });
                        }).delay($self.settings.speed).end().filter($self.settings.selector).removeClass('is-hidden').hide()
                    .end()
                .end().animate({'height':$elem.children($self.settings.selector).outerHeight()}, $self.settings.speed, function () {
                    $elem.css('height', 'auto').children($self.settings.selector).addClass('is-active').fadeTo($self.settings.speed, 1, function () {
                        $(this).css({
                            'display' : '',
                            'opacity' : ''
                        });
                    });
                    $self.settings.callback.apply($elem);
                });

            }

        },

        close: function ($elem) {

            var $self = this;

            $elem.height($elem.height()).children()
                .fadeTo($self.settings.speed, 0,function(){
                    $(this).removeClass('is-active').addClass('is-hidden').css({
                        'display' : '',
                        'opacity' : ''
                    });
                })
            .end().delay($self.settings.speed).animate({'height':0}, $self.settings.speed,function () {
                $(this).css('height', '').removeClass( 'is-active' );
                $self.settings.callback.apply($self);
            });

        },

        toggle: function ($elem) {

            var $self = this;

            $elem.stop().children().stop();

            if($elem.children($self.settings.selector).is('.is-hidden')) {

                $self.open($elem);

            } else {

                $self.close($elem);

            }
        }
    };

    $.fn.growAndShow = function (selector, action, speed, callback) {

        var settings = {};

        if(typeof selector === 'object') {

            settings = selector;

        } else if(typeof selector === 'string')  {

            if ( $( this ).find( selector ) ) {

                settings.selector = selector;

            } else {

                settings.action = selector;

            }

            if ( typeof action === 'string' ) {

                settings.action = action;

            } else if ( typeof action === 'number' ) {

                settings.speed = action;

            } else if ( typeof action === 'function' ) {

                settings.callback = action;

            }

            if ( typeof speed === 'number' ) {

                settings.speed = speed;

            } else if ( typeof speed === 'function' ) {

                settings.callback = speed;

            }

            if ( !settings.callback ) {

                settings.callback = callback;

            }

        }

        settings = $.extend({}, $.fn.growAndShow.defaultSettings, settings || {});

        return this.each(function () {

            var $elem = $(this),
                $settings = $.extend(true, {}, settings),
                growAndShow = new GrowAndShow($settings);

            growAndShow[$settings.action]($elem);

        });

    };

    $.fn.growAndShow.defaultSettings = {
        selector : ':first-child',
        speed : 200,
        action : 'toggle',
        callback : function () {
        }
    };

})( jQuery, window, document );