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

test('html centered', function(t) {

  var dom = jsdom.jsdom('<span class="cm-variable">$aa$b</span>');
  var line = dom.body;

  wrap(line, 0, 5, dom.createElement('span'));
  t.equal(line.childNodes.length, 1);
  t.equal(line.childNodes.item(0).childNodes.length, 1);
  t.equal(line.childNodes.item(0).childNodes.item(0).textContent, '$aa$b');

  t.end();
});

test('html centered second', function(t) {

  var dom = jsdom.jsdom('<a>hello</a><span class="cm-variable">$aa$b</span>');
  var line = dom.body;

  wrap(line, 5, 5, dom.createElement('span'));
  t.equal(line.childNodes.length, 2);
  t.equal(line.childNodes.item(1).childNodes.length, 1);
  t.equal(line.childNodes.item(1).childNodes.item(0).textContent, '$aa$b');

  t.end();
});

test('html centered second (seen in the wild)', function(t) {

  var dom = jsdom.jsdom('<span class="cm-keyword">v&gt;ar</span> <span class="cm-variable">vec2</span> = <span class="cm-variable">require</span>(<span class="cm-string">"vec2"</span>);');
  var line = dom.body;
  var wrapper = dom.createElement('span');
  wrap(line, 5, 1, wrapper);

  t.equal(line.childNodes.length, 9);
  t.equal(line.childNodes.item(2).childNodes.length, 1);
  t.equal(line.childNodes.item(2), wrapper);


  t.end();
});
