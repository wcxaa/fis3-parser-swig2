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