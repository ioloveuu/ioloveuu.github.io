---
layout: post
title: 入职总结(1)
description: 这是我的入职的工作总结。
category: blog
---
# 入职工作总结

## 第一天

今天刚入职新公司，感觉一切都很新鲜。
由于来的比较早，人事部的MM们还没到，所以早上第一件事便是领了装备。可惜还没开通`工作网络`，所以等待开网了。
等到快中午才开通，然后就要安装`工作环境`了。
恩，可能会接手一个移动端项目，等待老大详细交接。

## 移动端项目

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


