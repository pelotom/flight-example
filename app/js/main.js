'use strict';

requirejs.config({
  baseUrl: '',
  paths: {
    'flight': 'bower_components/flight',
    'ui': 'js/component/ui',
    'data': 'js/component/data',
    'mixins': 'js/mixins',
    'page': 'js/page'
  }
});

define(function (require) {
  var compose = require('flight/lib/compose');
  var registry = require('flight/lib/registry');
  var advice = require('flight/lib/advice');
  var withLogging = require('flight/lib/logger');
  var debug = require('flight/lib/debug');

  debug.events.logAll();
  debug.enable(true);
  compose.mixin(registry, [advice.withAdvice, withLogging]);

  require(['page/default'], function(initializeDefault) {
    initializeDefault();
  });
});
