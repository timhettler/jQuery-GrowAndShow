/*
 *  Project: jQuery-GrowAndShow
 *  Description: A jQuery plug-in that opens a container then fades in a selected element.
 *  Author: Tim Hettler
 */

(function ($) {

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
				
				$elem.show().height($elem.height()).children()
					.not($self.settings.selector)
						.fadeTo($self.settings.speed, 0, function(){
							$(this).removeClass('is-active').addClass('is-hidden').hide();
						}).delay($self.settings.speed).end().filter($self.settings.selector).removeClass('is-hidden').hide()
					.end()
				.end().animate({'height':$elem.children($self.settings.selector).outerHeight()}, $self.settings.speed, function () {
					$elem.css('height', 'auto').children($self.settings.selector).addClass('is-active').fadeTo($self.settings.speed, 1);
					$self.settings.callback.apply($elem);
				});
			
			}
		
		},
		
		close: function ($elem) {
		
			var $self = this;
			
			$elem.height($elem.height()).children()
				.fadeTo($self.settings.speed, 0,function(){
					$(this).removeClass('is-active').addClass('is-hidden').hide();
				})
			.end().delay($self.settings.speed).animate({'height':0}, $self.settings.speed,function () {
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

	$.fn.growAndShow = function (selector, speed, callback) {
	
		var settings = {};
	
		if(typeof selector === 'object') {
		
			settings = selector;
			
		} else if(typeof selector === 'string')  {
		
			settings.selector = selector;
			
			if(typeof speed === 'number') {
			
				settings.speed = speed;
				
			} else if(typeof speed === 'function') {
				
				settings.callback = speed;
				
			}
			
			if(!settings.callback) {
			
				settings.callback = callback;
			
			}
			
		} else { return false; }
		
		settings = $.extend({}, $.fn.growAndShow.defaultSettings, settings || {});
		
		return this.each(function () {
			
			var $elem = $(this),
				$settings = $.extend(true, {}, settings),
				growAndShow = new GrowAndShow($settings);
			
			growAndShow.toggle($elem);
		
		});
		
	};
	
	$.fn.growAndShow.defaultSettings = {
		'speed'  : 200,
		callback: function () {}
	};
})(jQuery);