---
layout: post
title: 自我摸索前端的MV*框架
description: 框架模式可以提升前端开发者的开发效率和对前端框架的使用理解，它包含了多种设计模式
category: blog
---

看过了一些设计的模式的文章，总体来说是解决一类问题的抽象公共方法，但像啥`工厂模式`，`单例模式`，`观察者模式`啥的，让我知其然而不知其所以然。
今天，参考网上一些文章，来对设计模式和MV*的框架的只是来温习一下。

刚学前端代码时候，最开始往往直接方式的：

```
  //一个按钮点击控制DIV的实现
  var btn = document.createElement('input');
  var div = document.createElement('div');
  document.body.appendChild(div);
  document.body.appendChild(btn);
  btn.type = 'button';
  btn.value = "点击我";
  div.style.height = `300px`;
  div.style.width = `300px`;
  div.style.background = `red`;
  div.style.display = `block`;
  var onOff = true;
  btn.onclick = function(){
    if(onOff){
        div.style.display = `none`;
        onOff = false;
    }else{
        div.style.display = `block`;
        onOff = true;
    }
    
  }
  
```

这种写法虽然是直观的，实现方法简单，也让开发者容易读懂。<font color=#ff0>BUT</font>这样写的缺点也显而易见：不方便维护。写一俩个简单的按钮还可以让人咬咬牙就写了，但是一旦开发老大呵呵一笑，说来五十个类似的吧，就让人泪崩了。好不容易熬夜写完，产品老大轻描淡写的来句：哎哟，不错哦，不过我感觉这个样式不好看，你再改改，于是又要慢慢重翻代码，一个个修改样式了。
身为一个开发人员，不管多热爱工作多好脾气，重复干活是会让人翻桌子的。
所以，我要改改方式，封装一点函数，少写点代码少改点样式：

```
//一个按钮点击控制DIV的实现 .2
  var btn = document.createElement('input');
  var div = document.createElement('div');
  var onOff = true;
  document.body.appendChild(div);
  document.body.appendChild(btn);
  function myStyles(a){
    a.style.height = `300px`;
    a.style.width = `300px`;
    a.style.background = `red`;
    a.style.display = `block`;
  }
  function myBtn(btn) {
    btn.type = 'button';
    btn.value = "点击我";
  }
  myStyles(div);
  myBtn(btn);
  function myEvents(a){
    a.onclick = function() {
        if(onOff){
            div.style.display = `none`;
            onOff = false;
        }else{
            div.style.display = `block`;
            onOff = true;
        }
    }
  }
  myEvents(btn);
 
```

上面我拼命封装函数，将功能划分样式、属性和事件。每次修改样式或者增减就去相关的函数里进行修改维护。

如果再配上javascript里的构造函数啥的，那么不就是前端的组件了吗。就像下面：
```
  //等我写点代码
```

而目前github上火热的一塌糊涂的webpack采用了代码文件分离的模式，事件驱动模式下，框架帮我们完成各个事件类型，我们所要做的事件下完成相关的业务逻辑。
```
<html>
<head>
	<link href="style.css" rel="stylesheet">
</head>
	<script src="bundle.js"></script>
</html>
```
它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分隔，等到实际需要的时候再异步加载。通过 loader 的转换，任何形式的资源都可以视作模块，比如 CommonJs 模块、 AMD 模块、 ES6 模块、CSS、图片、 JSON、Coffeescript、 LESS 等。这样可以把逻辑分离，达到分层开发的目的。

## MV*框架
下面来回忆一下MV*的组成，


在GitHub的主页上点击设置按钮：
![github account setting](/images/githubpages/github-account-setting.png)

  
![user pages](/images/githubpages/user-pages.png)
而普通的项目是这样的，即使你也是用的`othername.github.io`：


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
