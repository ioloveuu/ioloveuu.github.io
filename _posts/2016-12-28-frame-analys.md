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
下面来回忆一下MV*的组成，我们在前端领域涉及到的框架一般是mvc和最新的mvvm，
###那么什么是MVC呢
MVC是一种架构模式，它不局限于前端，而是一种设计思想，它通过数据与界面的分离，来使应用程序的结构分离，达到分层开发的目的。可以参看下图：

![mvc](/images/mvc.jpg)
具体的来说，就是将Model代表的数据与view代表的view隔离，用controller来管理逻辑和用户输入。这种模式早在20世纪80年代就已经出现了，发展至今已经十分成熟了。但是也有一些问题存在，最明显的就是在逻辑复杂度和项目规模正比的时候混乱的数据流动方式让人发指啊！

###这里有人将C变为了P（派发器），也就是MVP模式
MVP 模式将 Controller 改名为 Presenter，同时改变了通信方向。不过我还没用过，所以应该是：

![keda](/images/keda.jpg)

不对，发错图了，虽然我没用过，但也可以像小四一样成为借鉴派写手啊

![mvp](/images/mvp.png)
从上图可以知道
1. MVP子部件之间双向通信的。
2. 但是View 与 Model 之间通过 Presenter 传递信息。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
###那么什么又是MVVM呢

![mvvm](/images/mvvm.png)

MVVM是05年才流行起来的，它源于MVC模式，但最大变化在于VM代替了C的模式，也就是数据绑定，从而让View的数据状态变化的时候直接影响VM。
```
写点代码分析
```
巴啦啦巴啦啦巴啦啦

#总结
MV*模式的核心都可以说在于数据驱动，基于M推送消息更新，V/P来订阅这个模式。开发者通过数据来维护项目的更新，而数据的更新自动渲染UI端的更新，当然在前端里，和传统的MVC模式有点区别，这点区别的原因在js不同于其他面向对象语言的一些特性。所以view,controller，model的合并都存在合并的可能，产生了不一样的火花，完毕。


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
