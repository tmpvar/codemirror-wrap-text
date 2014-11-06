var test = require('tape');
var jsdom = require('jsdom');
var wrap = require('./codemirror-wrap-text')

test('single', function(t) {

  var dom = jsdom.jsdom('!');
  var line = dom.body;

  wrap(line, 0, 1, dom.createElement('span'));
  t.equal(line.childNodes.length, 1);
  t.equal(line.childNodes.item(0).tagName, 'SPAN');
  t.equal(line.childNodes.item(0).textContent, '!');

  t.end();
});

test('prefixed', function(t) {

  var dom = jsdom.jsdom('! a b c');
  var line = dom.body;

  wrap(line, 0, 1, dom.createElement('span'));
  t.equal(line.childNodes.length, 2);
  t.equal(line.childNodes.item(0).tagName, 'SPAN');
  t.equal(line.childNodes.item(0).textContent, '!');

  t.equal(line.childNodes.item(1).nodeType, dom.TEXT_NODE);
  t.equal(line.childNodes.item(1).textContent, ' a b c');

  t.end();
});

test('postfixed', function(t) {

  var dom = jsdom.jsdom('a b c !');
  var line = dom.body;

  wrap(line, 6, 1, dom.createElement('span'));
  t.equal(line.childNodes.length, 2);

  t.equal(line.childNodes.item(0).nodeType, dom.TEXT_NODE);
  t.equal(line.childNodes.item(0).textContent, 'a b c ');

  t.equal(line.childNodes.item(1).tagName, 'SPAN');
  t.equal(line.childNodes.item(1).textContent, '!');

  t.end();
});

test('centered', function(t) {

  var dom = jsdom.jsdom('a ! c');
  var line = dom.body;

  wrap(line, 2, 1, dom.createElement('span'));
  t.equal(line.childNodes.length, 3);

  t.equal(line.childNodes.item(0).nodeType, dom.TEXT_NODE);
  t.equal(line.childNodes.item(0).textContent, 'a ');

  t.equal(line.childNodes.item(1).tagName, 'SPAN');
  t.equal(line.childNodes.item(1).textContent, '!');

  t.equal(line.childNodes.item(2).nodeType, dom.TEXT_NODE);
  t.equal(line.childNodes.item(2).textContent, ' c');


  t.end();
});
