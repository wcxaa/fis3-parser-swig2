# fis3-parser-swig2


[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][npm-url]

a plugin for fis3, use [swig](http://node-swig.github.io/swig-templates/docs/) to enhance html.

Fis3-parser-swig2 can help us to use swig with fis3. We can use some awesome features in swig, like [extends](http://node-swig.github.io/swig-templates/docs/tags/#extends), [SwigOpts.locals](http://node-swig.github.io/swig-templates/docs/api/#SwigOpts) and so on. Fis3-parser-swig2 mainly solves the problem of resource location using swig with fis3.

You can see some examples below.

## Installation

```
npm install --save-dev fis3-parser-swig2
```

## Use

```js
parser: fis.plugin('swig2'[,options]);
```

options type(Object)
Properties:

| Name        | Type    | Description  |
| ----------- | ------- | ----- |
| autoescape  | boolean | Controls whether or not variable output will automatically be escaped for safe HTML output. Defaults to true. Functions executed in variable statements will not be auto-escaped. Your application/functions should take care of their own auto-escaping. |
| varControls | array   | Open and close controls for variables. Defaults to ['{{', '}}']. |
| tagControls | array   | Open and close controls for tags. Defaults to ['{%', '%}'].      |
| cmtControls | array   | Open and close controls for comments. Defaults to ['{#', '#}'].  |
| locals      | object  | Default variable context to be passed to all templates.          |

## Examples

### /widgets/layout/layout.tpl
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>{% block title %}My Site{% endblock %}</title>

  {% block head %}
  <link rel="stylesheet" href="./main.css">
  {% endblock %}
</head>
<body>
  <a href="{{ pageUrl }}"></a>
  {% block content %}{% endblock %}
</body>
</html>
```

### widgets/index/index.tpl
```html
{% extends '/widgets/layout/layout.tpl' %}

{% block title %}My Page{% endblock %}

{% block head %}
  {% parent %}
  <link rel="stylesheet" href="./custom.css">
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
		locals: require('./conf')
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

### result: widgets/index/index.html
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>My Page</title>


  <link rel="stylesheet" href="/widgets/layout/main.css">

  <link rel="stylesheet" href="/widgets/index/custom.css">

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
