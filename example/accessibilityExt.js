/**
 * marked-it-cli
 *
 * Copyright (c) 2014, 2017 IBM Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var html = {};

var CAPTION = "caption";
var CAPTION_SIDE = "caption-side";

html.onImage = function(html, data) {
	var image = data.htmlToDom(html)[0];
	var captionText = image.attribs[CAPTION];
	if (!captionText) {
		return; /* nothing to do */
	}

	var captionSide = image.attribs[CAPTION_SIDE];
	delete image.attribs[CAPTION];
	delete image.attribs[CAPTION_SIDE];

	var figure;
	if ( captionSide === 'bottom' ) {
		figure = data.htmlToDom("<figure>\n" + data.domToHtml(image) + "\n<figcaption>" + captionText + "</figcaption>\n</figure>\n")[0];
	} else {
		figure = data.htmlToDom("<figure>\n<figcaption>" + captionText + "</figcaption>\n" + data.domToHtml(image) + "\n</figure>\n")[0];
	}
	return data.domToHtml(figure);
};

html.onTable = function(html, data) {
	var table = data.htmlToDom(html)[0];
	var captionText = table.attribs[CAPTION];
	if (!captionText) {
		return; /* nothing to do */
	}

	var captionSide = table.attribs[CAPTION_SIDE];
	delete table.attribs[CAPTION];
	delete table.attribs[CAPTION_SIDE];

	var caption = data.htmlToDom("<caption>" + captionText + "</caption>")[0];
	if (captionSide) {
		caption.attribs[CAPTION_SIDE] = captionSide;
	}
	
	/* the <caption> _must_ be the first child of the <table> */
	var children = data.domUtils.getChildren(table);
	data.domUtils.prepend(children[0], caption);

	return data.domToHtml(table);
};

module.exports.html = html;
module.exports.id = "accessibility";
