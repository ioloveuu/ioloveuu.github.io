---
layout: post
title: 作用域的知识复习
description: 作用域的知识复习，温故而知新
category: blog
---

对于作用域和闭包，感觉掌握的还不是很透彻，所以温习一下：
那么，什么是
#作用域？
在js里，作用域是根据名称查找变量的一套规则。它与其他面向对象语言的区别之一在于它没有块级作用域，所以变量在执行完毕以后往往不会被销毁。
另外，变量是分为全局变量和局部变量，并且变量的执行环境通过相关的作用域链链接在一起。

在[你不知道的javascript]一书中，这样说明作用域与变量的关系：
1. 遇到`var a = 2`的时候，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的集合中。如果是，编译器会忽略该声明，继续进行编译；否则它会要求作用域在当前作用域的集合中声明一个新的变量，并命名为` a `。
2. 然后编译器会为引擎生成运行时所需代码，被用来处理` a = 2 `这个赋值操作。引擎运行时会先询问作用域，在当前作用域集合中是否存在一个叫作` a `的变量。如果是，引擎就会使用这个变量；如果否，引擎会继续查找该变量。

以上的过程最终会抛出一个三目的判断：有变量便赋值，没有就抛出异常状态。

总结便是：变量的赋值操作会执行两个动作，首先编译器会在当前作用域中声明一个变量（如果之前没有声明过，然后在运行时引擎会在作用域中查找该变量，如果能够找到就会对它赋值。

对于这个结论，我们还可以详细的从原理分析一二，这里就必须介绍一下LHS和RHS：

* RHS 表示查询某个变量的值，而 LHS 则是试图找到变量的容器本身，让其可以对变量赋值。所以，RHS并不是真正意义上的“赋值操作的右侧”，更准确地说是“非左侧”。你可以将 RHS 理解成 retrieve his sourcevalue（取到它的源值），这意味着“得到某某的值” 。 

看下面代码：

  ```
    console.log( a );
  ```

其中对` a `的引用是一个` RHS `引用，因为这里` a `并没有赋予任何值。相应地，需要查找并取
得` a `的值，这样才能将值传递给` console.log(..) `。
相比之下，例如：

  ```
  a = 2;
  ```
  
这里对` a `的引用则是` LHS `引用，因为我们并不关心当前的值是什么，只是想要为` = 2 `这个赋值操作找到一个容器。

那么我们看一下下面的程序：

  ```
    function foo(a) {
    console.log( a ); // 2
    }
    foo( 2 );
  ```

最后一行的`foo(..)`函数的调用需要对` foo `进行` RHS `引用，意味着“去找到 foo 的值，并把它给我” 。并且 (..) 意味着 foo 的值需要被执行，因此它最好真的是一个函数类型的值！
这里还有一个容易被忽略却非常重要的细节:`隐式的 a＝2 操作`。
这个操作很容易被忽略掉。当` 2 `被当作参数传递给`foo(..) `函数时，` 2 `会被分配给参数` a `。为了给参数` a `隐式地分配值，需要进行一次` LHS `查询。这里还有对` a `进行的` RHS `引用，并且将得到的值传给了` console.log(..) `。而它本身也需要一个引用才能执行，因此会对` console `对象进行` RHS `查询，并且检查得到的值中是否有一个叫作 log 的方法。
最后，在概念上可以理解为在` LHS `和` RHS `之间通过对值` 2 `进行交互来将其传递进` log(..)`,即通过变量` a `的` RHS `查询 。假设在` log(..) `函数的原生实现中它可以接受参数，在将` 2 `赋值给其中第一个（也许叫作` arg1 `）参数之前，这个参数需要进行` LHS `引用查询。

那么，在作用域嵌套的时候呢：
当一个块或函数嵌套在另一个块或函数中时，就发生了作用域的嵌套。因此，在当前作用域中无法找到某个变量时，引擎就会在外层嵌套的作用域中继续查找，直到找到该变量，或抵达最外层的作用域（也就是全局作用域）为止。
可以看看下面的代码：

  ```
    function foo(a) {
    console.log( a + b );
    }
    var b = 2;
    foo( 2 ); // 4
  ```

对` b `进行的` RHS `引用无法在函数` foo `内部完成，但可以在上一级作用域中完成。

那么总结一下：
* 遍历嵌套作用域链的规则很简单：引擎从当前的执行作用域开始查找变量，如果找不到，就向上一级继续查找。当抵达最外层的全局作用域时，无论找到还是没找到，查找过程都会停止。

## 为什么区分` LHS `和` RHS `是一件重要的事情？
因为在变量还没有声明（在任何作用域中都无法找到该变量）的情况下，这两种查询的行为是不一样的。
考虑如下代码：

  ```
    function foo(a) {
    console.log( a + b );
    b = a;
    }
    foo( 2 );
  ```

第一次对` b `进行` RHS `查询时是无法找到该变量的。而如果 RHS 查询在所有嵌套的作用域中遍寻不到所需的变量，引擎就会抛出` ReferenceError `异常。
相较之下，如果引擎执行` LHS `查询时，如果在顶层（全局作用域）中也无法找到目标变量，全局作用域中就会创建一个具有该名称的变量，并将其返还给引擎。
但是在`ES5 `中引入了“严格模式” 。同正常模式，或者说懒惰模式相比，严格模式在行为上有很多不同。其中一个不同的行为是严格模式禁止自动或隐式地创建全局变量。因此，在严格模式中 LHS 查询失败时，并不会创建并返回一个全局变量，引擎会抛出同 RHS 查询
失败时类似的` ReferenceError `异常。
接下来，如果` RHS `查询找到了一个变量，但是你尝试对这个变量的值进行不合理的操作，比如试图对一个非函数类型的值进行函数调用，或着引用` null `或 `undefined `类型的值中的属性，那么引擎会抛出另外一种类型的异常，叫作 TypeError 。
` ReferenceError `同作用域判别失败相关，而` TypeError `则代表作用域判别成功了，但是对结果的操作是非法或不合理的。

所以说`LHS`的目的是查找以对变量赋值，而` RHS `是为了获取变量的值，另外` = `操作符或调用函数时传入参数的操作都会导致关联作用域的赋值操作。

JavaScript 引擎首先会在代码执行前对其进行编译，在这个过程中，像` var a = 2 `这样的声明会被分解成两个独立的步骤：
1. 首先，` var a `在其作用域中声明新变量。这会在最开始的阶段，也就是代码执行前进行。
2. 接下来，` a = 2 `会` LHS `查询变量` a `并对其进行赋值。` LHS `和` RHS `查询都会在当前执行作用域中开始，如果有需要（也就是说它们没有找到所需的标识符） ，就会向上级作用域继续查找目标标识符，这样每次上升一级作用域。最后抵达全局作用域（顶层） ，无论找到或没找到都将停止。
不成功的` RHS `引用会导致抛出` ReferenceError `异常。在非严格模式下，不成功的` LHS `引用会导致自动隐式地创建一个全局变量。而在严格模式下，该变量使用` LHS `引用的目标作为标识符，或者抛出` ReferenceError `异常。
下面来讲讲闭包的分析：
12345



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
