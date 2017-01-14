---
layout: post
title: 分析一下前端的变量赋值
description: js是一种令人着迷的语言，它存在种种机制让我在实践中学习成长。
category: blog
---
## undefined 和 undeclared
  在js中，变量在没有赋值的时候返回undefined，可以参考下列代码：

```
var a;
typeof a; // "undefined"
var b = 42;
var c; // later
b = c;
typeof b; // "undefined"
typeof c; // "undefined"

```
以前我曾将 undefined 等同于 undeclared ，但在 JavaScript 中这完全
是两回事。

已在作用域中声明但还没有赋值的变量，是undefined的。相反，还没有在作用域中声明过的变量，是 undeclared 的。就像下面的代码：

```
var a;
a; // undefined
b; // ReferenceError: b is not defined
```

在这里，“b is not defined”就是是undeclared，而`undefined`和`is not defined`是不同的。所以如果控制台报错成“b is not found”||“b is not declared”可能更加贴切一点吧。
但是 typeof 处理 undeclared 变量的方式使情况在某种意义上变得复杂了。
可以看看下列代码：

```
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```

上面的代码中可以看到，浏览器的解析器对于undeclared变量，typeof仍然还是返回 "undefined" 。虽然` b `是一个` undeclared `变量，但` typeof b `并没有报错。这是因为` typeof `有一个特殊的安全防范机制。此时` typeof `如果能返回` undeclared `的话，会让我们更加明白JS解析机制。








<noscript>Please enable JavaScript to view the comment form powered by <a href="https://commentit.io/">Comm(ent|it)</a></noscript>
<div id="commentit"></div>
<script type="text/javascript">
  /** CONFIGURATION VARIABLES **/
  var commentitUsername = 'ioloveuu';
  var commentitRepo = 'ioloveuu/ioloveuu.github.io';
  var commentitPath = '{{ page.path }}';

  /** DON'T EDIT FOLLOWING LINES **/
  (function() {
      var commentit = document.createElement('script');
      commentit.type = 'text/javascript';
      commentit.async = true;
      commentit.src = 'https://commentit.io/static/embed/dist/commentit.js';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(commentit);
  })();
</script>
  {%if page.comments %}
  {% assign sorted_comments = (page.comments | sort: 'date') %}
{% endif %}
{% for c in sorted_comments %}
  <div class="media">
    <div class="media-left">
      <img src="{{ c.author.picture }}" alt="{{ c.author.displayName}}" height="73" width="73">
    </div>
    <div class="media-body">
      <p class="text-muted">
        <a href="{{ c.author.url }}">{{ c.author.displayName }}</a>
        on {{ c.date | date_to_string }}
      </p>
      <p>{{ c.content | newline_to_br }}</p>
    </div>
  </div>
{% else %}
  There are no comments on this post.
{% endfor %}
