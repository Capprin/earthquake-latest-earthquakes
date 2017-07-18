'use strict';

var config = require('./config');


var ALL_CLASSES,
    CWD,
    JS,
    NODE_MODULES;

CWD = '.';
JS = CWD + '/' + config.src + '/htdocs/js';
NODE_MODULES = CWD + '/node_modules';


/**
 * Function to build aliases for browserify.
 *
 * @param basePath {String}
 *     directory containing classes.
 * @param classes {Array<String>}
 *     array of class names.
 * @return {Array<String>}
 *     alias map for browserify.
 */
var getAliases = function (basePath, classes) {
  return classes.map(function (c) {
    return basePath + '/' + c + '.js:' + c;
  });
};


ALL_CLASSES = getAliases(JS, [
  'about/AboutView',

  'core/Config',
  'core/MapUtil',
  'core/Formatter',
  'core/GenericCollectionView',
  'core/UrlManager',

  'latesteqs/Catalog',
  'latesteqs/FeedWarningView',
  'latesteqs/LatestEarthquakes',
  'latesteqs/LatestEarthquakesConfig',
  'latesteqs/LatestEarthquakesUrlManager',
  'latesteqs/ScenariosConfig',

  'list/DefaultListFormat',
  'list/DownloadView',
  'list/DyfiListFormat',
  'list/ListView',
  'list/MetadataView',

  'list/PagerListFormat',
  'list/ShakeMapListFormat',

  'map/EarthquakeLayer',
  'map/LegendControl',
  'map/MapView',
  'map/ScenarioLegendControl',

  'modes/ModesView',

  'settings/CheckboxOptionsView',
  'settings/RadioOptionsView',
  'settings/SettingsView',

  'summary/EventSummaryFormat',
  'summary/EventSummaryView'
]).concat(getAliases(NODE_MODULES + '/hazdev-webutils/src', [
  'mvc/Collection',
  'mvc/CollectionView',
  'mvc/Model',

  'util/Events',
  'util/Util',
  'util/Xhr'
])).concat(getAliases(NODE_MODULES + '/hazdev-leaflet/src', [
  'leaflet/control/ZoomToControl',
  'leaflet/layer/Grayscale',
  'leaflet/layer/Satellite',
  'leaflet/layer/Street',
  'leaflet/layer/TectonicPlates',
  'leaflet/layer/Terrain',
  'leaflet/layer/UsFault'
])).concat(getAliases(NODE_MODULES + '/hazdev-accordion/src', [
  'accordion/Accordion'
]));


var browserify = {
  options: {
    browserifyOptions: {
      debug: true,
      paths: [
        JS,
        NODE_MODULES + '/hazdev-leaflet/src',
        NODE_MODULES + '/hazdev-webutils/src',
        NODE_MODULES + '/hazdev-accordion/src'
      ]
    }
  },

  bundle: {
    src: [],
    dest: config.build + '/' + config.src + '/htdocs/js/bundle.js',
    options: {
      alias: ALL_CLASSES
    }
  },

  index: {
    src: [JS + '/index.js'],
    dest: config.build + '/' + JS + '/index.js',
    options: {
    }
  },

  test: {
    src: [config.test + '/test.js'],
    dest: config.build + '/' + config.test + '/test.js',
    options: {
      external: ALL_CLASSES
    }
  }
};


module.exports = browserify;
