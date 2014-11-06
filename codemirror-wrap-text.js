module.exports = codemirrorWrapText;

function insertAfter(ref, add) {
  var next = ref.nextSibling;
  if (next) {
    ref.parentNode.insertBefore(add, next);
  } else {
    ref.parentNode.appendChild(add);
  }
}

function codemirrorWrapText(line, start, length, el) {
  var nodes = line.childNodes;
  var l = nodes.length;
  var c = 0;
  for (var i = 0; i<l; i++) {
    var node = nodes.item(i);
    var text = node.textContent;
    var offset = 0;

    if (c >= start) {
      offset = c - start;
    } else if (text.length + c >= start) {
      offset = start - c;
    } else {
      c += text.length;
      continue;
    }

    if (offset + length > text.length) {
      throw new Error('wtf are you doing?')
    }

    // offset starts at 0 -> length
    if (!offset) {
      if (length === text.length) {
        line.replaceChild(el, node);
        el.appendChild(node);
      } else {
        line.insertBefore(el, node)
        el.textContent = text.substring(0, length);
        node.textContent = text.substring(length);
      }
    // offset starts at offset -> offset + length
    } else {
      node.textContent = text.substring(0, offset);
      insertAfter(node, el);

      if (offset + length < text.length) {
        el.textContent = text.substring(offset, offset+length);
        var clone = node.cloneNode(true);
        clone.textContent = text.substring(offset+length);
        insertAfter(el, clone);
      } else {
        el.textContent = text.substring(offset);
      }
    }
  }

  return el;
}
