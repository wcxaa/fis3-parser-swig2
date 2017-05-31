/* @file: fis3-parser-swig2
 * @auther: WangChengXi
 */

'use strict';

var swig = require('swig-templates');
var path = require('path');

var fisLoader = {
	resolve: function(to, from) {

		if (fis.util.exists(to)) {
			return to;
		}

		var file = fis.uri(to, path.dirname(from)).file;
		if (!file) {
			throw Error("find no file: " + to);
		}
		return file.realpath;

	},
	load: function(identifier) {
		var file = fis.file(identifier);
		file.useCache = false;
		file.parser = false;
		fis.compile(file);
		return file.getContent();
	}
};

var confForce = {
	cache: false,
	loader: fisLoader
};
var conf;

module.exports = function(content, file, options) {
	if (!conf) {
		conf = Object.assign({}, options || {}, confForce);
		swig.setDefaults(conf);
	}
	file.useCache = false;
	return swig.render(content, {
		filename: file.realpath
	});

}