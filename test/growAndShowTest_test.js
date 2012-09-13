/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery Plugin basics', {
    setup: function() {
      this.pluginName = 'growAndShow';
      this.$el = $('.growAndShow');
      jQuery.fn[this.pluginName].defaultSettings.speed = 0;
    }
  });

  test('is chainable', function() {
    deepEqual(this.$el[this.pluginName](), this.$el, 'should be chaninable');
  });

  test('saves reference to object', function() {
    ok(this.$el[this.pluginName]().data('plugin_'+this.pluginName), 'should be an instance of the plugin');
  });

  test('inherits default settings', function() {
    deepEqual(this.$el[this.pluginName]().data('plugin_'+this.pluginName).settings, jQuery.fn[this.pluginName].defaultSettings, 'should inherit default settings');
  });

  test('overwrites default settings', function() {
    var key = Object.keys(jQuery.fn['growAndShow'].defaultSettings)[0],
        obj = {};
        obj[key] = 'qunittestvalue';

    this.$el[this.pluginName](obj);

    deepEqual(this.$el.data('plugin_'+this.pluginName).settings[key], 'qunittestvalue', 'should overwrite default settings');
  });

  test('allows public functions to be called', 1, function() {
    this.$el[this.pluginName]();
    var obj = this.$el.data('plugin_'+this.pluginName);

    obj.qunitTestFunction = function () {
      ok( true, 'function was called' );
    };

    this.$el[this.pluginName]('qunitTestFunction');
  });

  module('Plugin functionality', {
    setup: function() {
      this.pluginName = 'growAndShow';
      this.$el = $('.growAndShow');
      jQuery.fn[this.pluginName].defaultSettings.speed = 0;
    }
  });

  asyncTest('calls callback', 1, function () {
    this.$el[this.pluginName]({
      callback : function () {
        ok( true, 'callback was called' );
        start();
      }
    });
  });

  asyncTest('opens child', 2, function () {
    var $child = this.$el.children(jQuery.fn[this.pluginName].defaultSettings.selector).addClass('is-hidden');

    this.$el[this.pluginName]({
      action : 'open',
      callback : function () {
        ok($child.hasClass('is-active'), 'child is active' );
        ok(!$child.hasClass('is-hidden'), 'child is not hidden' );
        start();
      }
    });
  });

  asyncTest('closes child', 2, function () {
    var $child = this.$el.children(jQuery.fn[this.pluginName].defaultSettings.selector).addClass('is-active');

    this.$el[this.pluginName]({
      action : 'close',
      callback : function () {
        ok(!$child.hasClass('is-active'), 'child is not active' );
        ok($child.hasClass('is-hidden'), 'child is hidden' );
        start();
      }
    });
  });

  asyncTest('toggle opens closed child', 1, function () {
    var $child = this.$el.children(jQuery.fn[this.pluginName].defaultSettings.selector).addClass('is-hidden');

    this.$el[this.pluginName]({
      callback : function () {
        ok(!$child.hasClass('is-hidden') && $child.hasClass('is-active'), 'should open child when it is closed' );
        start();
      }
    });
  });

  asyncTest('toggle closes open child', 1, function () {
    var $child = this.$el.children(jQuery.fn[this.pluginName].defaultSettings.selector).removeClass('is-hidden').addClass('is-active');

    this.$el[this.pluginName]({
      callback : function () {
        ok($child.hasClass('is-hidden') && !$child.hasClass('is-active'), 'should close child when child is open' );
        start();
      }
    });
  });

}(jQuery));
