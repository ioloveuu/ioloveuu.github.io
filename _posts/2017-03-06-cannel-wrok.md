---
layout: post
title: 入职总结(1)
description: 这是我的入职的工作总结。
category: blog
---
如果能跑出来，就可以做一些小项目了，比如写一个知乎日报啊偷笑，这些demo在github上很多。
可以结合一些组件库写demo，这样可以更加了解组件化。比如饿了么团队的Element、mint-ui
 
 
## Vuex
Vuex 是一个专门为 Vue.js 应用设计的 状态管理模型 + 库。它为应用内的所有组件提供集中式存储服务，其中的规则确保状态只能按预期方式变更。说白了就是控制应用的一些全局状态。状态改变了，对应的视图也
什么是vuex？会改变。
 
在学习Vuex时，会有一些ES6特性，当遇到这些时，最好不要一带而过，去好好看一看这些es6特性。
比如在学习Action时可以看看ES6新增的Promise和参数解构。
实践的方法一样是先看别人别人写的代码，比如官方的购物车实例的应用结构
把之前写的demo优化一下，有些地方可以用用vuex
## vue cli安装方法

$ vue -cli

## vue-router
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


