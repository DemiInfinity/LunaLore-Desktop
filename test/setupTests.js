// In setupTests.js
const { JSDOM } = require('jsdom');

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>', {
  url: 'http://localhost',
});

global.window = dom.window;
global.document = dom.window.document;
global.navigator = {
  userAgent: 'node.js',
};

global.localStorage = window.localStorage;
global.sessionStorage = window.sessionStorage;
