# fis3-parser-swig2


[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

a plugin for fis3, use swig to parse page

Fis3-parser-swig2 can write header,footer and so on into templates.More powerful, it can set global variable to parse pages, which can be used like a sitemap while building period.
Demos can be seen below.

## Installation

```
npm install --save-dev fis3-spriter-fontmin
```

## Use

	parser: fis.plugin('swig2'[,options]); // options type(object)

options can set anything in [swig](http://node-swig.github.io/swig-templates/docs/api/#SwigOpts), except cache, which is forced to be false.
One more, options.globalStatics is an Object containing global constants, used to parse pages by swig.

## Demo

### layout.tpl
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="main.css">
  {% endblock %}
</head>
<body>
  <a href="{{ pageUrl }}"></a>
  {% block content %}{% endblock %}
</body>
</html>
```

### index.tpl
```html
{% extends 'layout.tpl' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="custom.css">
{% endblock %}

{% block content %}
<p>This is just an awesome page.</p>
{% endblock %}
```

### fis-conf.js
```js
fis.set('project.ignore', fis.get('project.ignore').concat(['package.json', 'conf/**']));

fis.match('*.tpl', {
    rExt: '.html',
    parser: fis.plugin('swig2', {
        globalStatics: require('./conf')
    })
});
```

### conf/index.js
```js
module.exports = {
	pageUrl: './page/url'
};
```

---

### result: index.html
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Page</title>



  <link rel="stylesheet" href="main.css">

  <link rel="stylesheet" href="custom.css">

</head>
<body>
  <a href="./page/url"></a>

<p>This is just an awesome page.</p>

</body>
</html>
```

[downloads-image]: http://img.shields.io/npm/dm/fis3-parser-swig2.svg
[npm-url]: https://npmjs.org/package/fis3-parser-swig2
[npm-image]: http://img.shields.io/npm/v/fis3-parser-swig2.svg
