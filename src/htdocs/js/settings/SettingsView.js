'use strict';

var CheckboxOptionsView = require('settings/CheckboxOptionsView'),
    Config = require('latesteqs/Config'),
    RadioOptionsView = require('settings/RadioOptionsView'),
    Util = require('util/Util'),
    View = require('mvc/View');

var _DEFAULTS = {};


var SettingsView = function (options) {
  var _this,
      _initialize,

      _autoUpdateEl,
      _feedsEl,
      _filterMapEl,
      _listFormatEl,
      _listSortEl,
      _mapLayersEl,
      _mapOverlaysEl,
      _timezoneEl;


  _this = View(options);
  options = Util.extend({}, _DEFAULTS, options);


  _initialize = function (/*options*/) {
    // initialize the view
    _this.createSkeleton();
  };

  _this.createSkeleton = function () {
    _this.el.innerHTML =
        '<section class="settings-header"></section>' +
        '<section class="settings-content"></section>' +
        '<section class="settings-footer"></section>';

    _this.header = _this.el.querySelector('.settings-header');
    _this.content = _this.el.querySelector('.settings-content');
    _this.footer = _this.el.querySelector('.settings-footer');

    // create sections
    _autoUpdateEl = document.createElement('section');
    _feedsEl = document.createElement('section');
    _filterMapEl = document.createElement('section');
    _listFormatEl = document.createElement('section');
    _listSortEl = document.createElement('section');
    _mapLayersEl = document.createElement('section');
    _mapOverlaysEl = document.createElement('section');
    _timezoneEl = document.createElement('section');

    // append sections to _this.content
    _this.content.appendChild(_autoUpdateEl);
    _this.content.appendChild(_feedsEl);
    _this.content.appendChild(_listFormatEl);
    _this.content.appendChild(_listSortEl);
    _this.content.appendChild(_filterMapEl);
    _this.content.appendChild(_mapLayersEl);
    _this.content.appendChild(_mapOverlaysEl);
    _this.content.appendChild(_timezoneEl);
  };

  /**
   * Frees resources associated with this view.
   */
  _this.destroy = Util.compose(function () {
    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * Renders the view, called on model change
   */
  _this.render = function () {
    _this.renderHeader();
    _this.renderContent();
    _this.renderFooter();
  };

  _this.renderContent = function () {
    var autoUpdateView,
        feedsView,
        filterMapView,
        listFormatView,
        listSortView,
        mapLayersView,
        mapOverlaysView,
        timezoneView;

    // Auto Update
    autoUpdateView = CheckboxOptionsView({
      el: _autoUpdateEl,
      collection: Config().options.autoUpdate,
      model: _this.model,
      title: 'Earthquakes',
      watchProperty: 'autoUpdate'
    });
    autoUpdateView.render();

    // Earthquake Feeds
    feedsView = RadioOptionsView({
      el: _feedsEl,
      collection: Config().options.feed,
      model: _this.model,
      watchProperty: 'feeds'
    });
    feedsView.render();

    // Filter results to Map
    filterMapView = CheckboxOptionsView({
      el: _filterMapEl,
      collection: Config().options.filterMap,
      model: _this.model,
      watchProperty: 'filterMap'
    });
    filterMapView.render();

    // List Formats
    listFormatView = RadioOptionsView({
      el: _listFormatEl,
      collection: Config().options.listFormat,
      model: _this.model,
      title: 'List Format',
      watchProperty: 'listFormats'
    });
    listFormatView.render();

    // List Sort
    listSortView = RadioOptionsView({
      el: _listSortEl,
      collection: Config().options.sort,
      model: _this.model,
      title: 'List Sort Order',
      watchProperty: 'sorts'
    });
    listSortView.render();

    // Map Layers
    mapLayersView = RadioOptionsView({
      el: _mapLayersEl,
      collection: Config().options.basemap,
      model: _this.model,
      title: 'Map Layers',
      watchProperty: 'basemaps'
    });
    mapLayersView.render();

    // Map Overlays
    mapOverlaysView = CheckboxOptionsView({
      el: _mapOverlaysEl,
      collection: Config().options.overlays,
      model: _this.model,
      watchProperty: 'overlays'
    });
    mapOverlaysView.render();

    // Time Zone
    timezoneView = RadioOptionsView({
      el: _timezoneEl,
      collection: Config().options.timezone,
      model: _this.model,
      title: 'Time Zone',
      watchProperty: 'timezone'
    });
    timezoneView.render();
  };

  _this.renderFooter = function () {
    // TODO, anything??
  };

  _this.renderHeader = function () {
    _this.header.innerHTML = '<h2>Settings</h2>' +
        '<small>Bookmark to return to map/list with the same settings</small>';
  };

  _initialize(options);
  options = null;
  return _this;
};

module.exports = SettingsView;
