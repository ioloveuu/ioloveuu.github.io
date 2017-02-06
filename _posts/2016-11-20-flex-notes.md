---
layout: post
title: flex布局的学习
description: flex的弹性盒子的学习。
category: blog
---

优势

flex-layout解决了css布局的不少问题:

应用一个class就可以垂直居中。
轻松实现多栏同高。
自动计算间距，实现等宽布局，不需要再计算margin。
支持自动填充剩余宽度，以往我们需要通过触发BFC来实现。
支持自动填充剩余高度，比如将footer置于底部。
随意调整[栅格]顺序，比如让main比sidebar提前渲染出来。
丰富的对齐方式：上、下、左、右、左上、右上、左下、右下。
概述

与传统的栅格化一样，flex-layout基于容器(相当于Bootstrap的row) 和栅格(相当于Bootstrap的column) 来布局:

[容器]有两种： flex-column: 容器里的[栅格]以横向排列，与传统栅格化的row一样 flex-row: 容器里的[栅格]以竖向排列，就像header、content、footer的排列一样

通常，只有[栅格]可以直接放在[容器]中，而你的内容应该放在[栅格]里。但这不是必须的，直接把内容放在[容器]里也没问题。

如果一个[容器]里包含的[栅格]超过24格，多出的部分将另起一行。
IE的话只兼容IE10+，其他主流浏览器都支持。
Flexbox有主轴，副轴的概念，flex-layout已经封装好了，你不需要懂得flexbox，也无需针对不同轴使用不同的class。不过，如果你对Flexbox有所了解的话，用起来会更顺手。
与Bootstrap等栅格化不同的是：flex-layout不需要container，栅格本身不自带padding。flex布局。具体
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
