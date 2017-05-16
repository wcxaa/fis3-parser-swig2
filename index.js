/* @file: fis3-parser-swig2
 * @auther: WangChengXi
 */

'use strict';

var swig = require('swig-templates');

var confForce = {
	cache: false
};
var conf;

module.exports = function(content, file, options) {
	if (!conf) {
		conf = Object.assign({}, options || {}, confForce);
		swig.setDefaults(conf);
	}

	return swig.compile(content, {
		filename: file.realpath
	})(options.globalStatics || {});

}