---
typora-root-url: ./..\..\image
---

# 弹性布局

## 概述

**Flexbox is still relevant,** even with CSS Grid reaching wide browser support. It's a different tool for a different job: CSS Grid works best for two-dimensional layouts, while Flexbox offers more flexibility for working with a single dimension.

Grid 是 Flexbox 的完全替代品，目前仍旧使用 Flexbox 的原因有 2：

- Flexbox 的兼容性更好；
- Flexbox 在单轴控制上更方便；

When we apply `display: flex` to an element, we toggle the "Flexbox" layout algorithm for the element's *children*. The parent element will still use Flow layout.

如果 `display: flex`，那么元素的子元素就会启用 Flexbox 布局，而元素本身仍然会处于其原来的布局系统之中，元素本身会变成 flex container。

「Directions and Alignment」中的关于 Flexbox layout 的各种值的「可互动例子」真是太棒了！这让我开始考虑“我要不要切换到 MDX ？”。

注意：flex 子项会自动充满副轴，除非用 block-size 来覆写。

## align-items: baseline

> 疑问：如果子项们的 baseline 是不一样的，那么 `align-items: baseline` 时，应该选用谁的 baseline 来锚定呢？
>

`align-items: baseline` 具有穿透性，下例中，虽然 3 个 `Sph` 的字号不同，但是它们的文字基线都会对齐（关于文字基线，请看 [这里](https://en.wikipedia.org/wiki/Baseline_(typography))）。

```html
<section>
	<p>Sph<span>Sph</span></p>
    <p>Sph</p>
</section>

<style>
    section {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }
    
    span {
        font-size: 2rem;
    }
    
    p:first-child {
        font-size: 3rem;
    }
</style>
```



## align-self

flex 容器通过 `align-items` 来控制所有子项在副轴方向上的位置，子项则可以通过 `align-slef` 来控制自己在副轴方向上的位置。

> 不存在 `justify-self` 属性（这是合理的设计），如果你想要控制子项在主轴方向上的位置，那么需要借助 `flex-grow`、`flex-shrink`、`flex-basis`、`order`。

陷阱：If a flexbox item's cross-axis margin is `auto`, then `align-self` is ignored.

陷阱：align-self: flex-start 似乎有 fit-content 的效果

陷阱：似乎只要设置 align-*，相应的元素就会自动 fit-content！快验证一下！

## flex-basis & flex-grow & flex-shink

flex-basis 比 width（或 height）的优先级更高（所以 width 和 height 是一种建议尺寸或假设尺寸，而不是最终尺寸）。并且实际上，flex-basis 和 width 或 height 的作用是完全一样的，只不过发生冲突时前者的优先级更高。TODO: flex-basis、flex-shink、flex-grow 会根据 width 或 height 来活动吗？会。

flex-basis、width、height 会受到 min-width、max-width、min-height、max-height 的限制。

flex-basis 可以接受百分比值，百分比值根据其包含块来计算，flex 子项的包含块是其父元素（即 flex container）的 content box。

flex-basis: auto 时，就会使用 width（水平书写模式）或 height（垂直书写模式）的值，如果 width 或 height 的值刚好也是 auto 时，那么就会干脆使用 flex-basis: content，即意味着根据 flex 子项的内容尺寸来自动调整 flex 子项的尺寸。

1. `min-content`: 该值指定子项元素的尺寸应根据其内容的最小尺寸来确定。换句话说，子项元素将尽可能缩小到其内容所需的最小空间。
2. `max-content`: 该值指定子项元素的尺寸应根据其内容的最大尺寸来确定。换句话说，子项元素将尽可能扩展到其内容所需的最大空间。
3. `fit-content`: 该值指定子项元素的尺寸应根据其内容的适合尺寸来确定，但不超过父级容器的尺寸。换句话说，子项元素将根据其内容自动调整尺寸，但不会超出父级容器的限制。
4. `content`: 这是一个相对于 `auto` 的别名。当 `flex-basis` 设置为 `content` 时，子项元素的尺寸将根据其内容和其他 Flex 子项元素的尺寸进行分配。

> 上面的四点来自于 Poe 的 AI 回答，似乎还不够正确或清晰。

flex-grow 只接受非负整数，当所有 flex 子项的主尺寸之和小于 flex 容器的 content box 的主尺寸时，flex 子项的主尺寸就会根据该属性来瓜分「剩余空间」，剩余空间是指 flex container 的主尺寸（应该是指 content box 的尺寸吧？需要确定一件事情，flex 子项只占用 flex container 的 content box，对吗？）减去所有 flex 子项的主尺寸之和之后所得到的差值。默认值是 0。

> 当 box-sizing: content-box 时，flex 子项主持寸是 content box 的主尺寸，box-sizeing: border-box 时，则是 border box 的主尺寸。

flex-shink 只接受非负整数，当所有 flex 子项的主尺寸之和大于 flex 容器的 content box 的主尺寸时，flex 子项的主尺寸就会根据该属性来收缩自身的主尺寸，收缩的基数是超出的长度。默认值是 1。flex-shink 无法将子项收缩到最小尺寸以下（但是 width 可以）。最小尺寸是什么？是 min-content 吗？

> `flex` 缩写陷阱，下例中，width会无效，因为它会被 flex-basis 遮盖，而这个遮蔽挺隐晦的。
>
> ```css
> div {
>     flex: 1;
>     width: 100px; /* width会被flex-basis覆盖掉 */
> }
> ```

## flex-wrap

「Wrapping」的第一个交互示例很棒！

这节课的练习作业说明了一件事情：如果换行了，那么就会有多条主轴！

> flex-wrap 被用于双维度布局，但事实上，此时我们应该使用 Grid 布局，后者更棒。

## 其它

「Groups and Gaps」中的第一个交互示例里，`margin-right: auto` 可以模拟 float 效果，可是却没有解释为什么可以。

我们可以用 flex-direction、flex-wrap、order 属性来操纵 flex 布局为双维度布局，可是 Grid 提供了更加简单的方案，所以我们不要再去研究这种奇技淫巧了吧！比如，flex-wrap 可以实现换行，然后实现双维布局，但是他是有限制的，比如你做终极练习的时候，最后一个商品的尺寸很难和前面的商品的尺寸完全一致，这就是 flexbox 的限制。因为有这些情况，所以才推荐你使用 grid 来做双维度布局。

## flex-direction

「Interactive Review」中的首图也太漂亮了吧！很美观的展示了方向的定义欸！

row、row-reverse、column、column-reverse 是和 writing-mode 有关的，在英语中（ltr 语种），row 是从左到右，row-reverse 是从右到左，column 是从上到下，column-reverse 是从下到上。比如在 MDN 中，row 代表主轴方向遵循文本方向。

利用 `flex-direction: row-reverse; justify-content: flex-end` 可以轻松的反转 flex 子项的排序，但这种反转只是视觉上的，当用户使用键盘来聚焦项目的时候，其顺序仍然会遵循 dom 顺序，于是这就有可能会成为无障碍访问的障碍（因为这会让视觉与 DOM 相反）。

## flex-wrap

nowrap：禁止换行（将会导致溢出），行头行尾方向遵循 flex-direction 的方向

wrap、wrap-reverse 则是可以换行。然而换行的方向是怎么确定的呢？？？

## order

flex 容器会按照 order 的升序和自己的方向来排序子项，如果 order 相同，则按照 dom顺序来排序，默认情况下，大家的 order 都是 0。

order 只是改变了子项在视觉上的布局顺序，但是没有改变子项在 dom 中的顺序，因此对于 tab 聚焦这种事情来说，它可能会造成可访问性的障碍。

## z-index

flex 和 grid 布局都支持 z-index，当子项发生重叠时（用 margin 来实现重叠），z-index 大者获胜。

## flex

flex 缩写是有陷阱的，比如 `flex: 1` 时的 `flex-basis` 为 `0`，而不是默认值 `auto`。你要继续看看有没有别的陷阱！

## 布局冲突

> 事实上，一个元素只能参与一种布局，如果有应用多种布局，那么最后也只有一种布局会被采用。

如果一个元素同时被赋予了定位布局和其它布局策略，那么定位布局就总是会被采用，另一种布局则会被忽略。比如下例中的 div 会采用定位布局而不是弹性布局，section 会忽略掉这个 div，就好像 section 内部只有一个 p 一样。

```html
<section>
	<div></div>
    <p></p>
</section>

<style>
    section {
        display: flex;
    }
    
    div:first-child {
        position: fixed;
    }
</style>
```

relative 和 sticky 是例外，如果你给 flex 子项赋予了 relative 或 sticky 布局，那么弹性布局和相对定位布局/沾滞定位布局功存，对于相对定位布局而言，他就是表现的和一个正常的 flex 子项一模一样，不过我们还可以额外的使用 top/right/bottom/left 来偏移它。对于沾滞定位布局，虽然也能工作，但是有很多额外的陷阱...

## 关于阮一峰的 Flex 教程的笔记

行内元素也可以使用 Flex 布局：`span { display: inline-flex }`。

设为 Flex 布局以后，子元素的`float`、`clear`和`vertical-align`属性将失效。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做`main start`，结束位置叫做`main end`；交叉轴的开始位置叫做`cross start`，结束位置叫做`cross end`。

## 关于 Josh 的文章
When we flip display to flex, we create a “flex formatting context”.

默认情况下，子项将聚集在主轴（primary axis）的开头，并且会通过拉伸自己来填满整个交叉轴（cross axis）。

### 为什么没有 justify-items，并且为什么用 content 和 items

因为子项（item）可以在不影响其它子项的前提下，在交叉轴方向上自由移动，因此会有 align-self/align-items 属性。然而，子项没有办法在不影响其它子项的前提下，在主轴上自由移动，因此不会有 justify-items 属性。

justify 代表在主轴上的布局，align 代表在交叉轴上的布局。子项在主轴方向上，只能成群的行动，因此要用 justify-content，因为 content 代表一堆东西。子项在交叉轴方向上可以单独行动，因此可以用 items 或 self，因为这就代表着单个东西。

> 那有没有 align-content 呢？其实 align-items 就对应 align-content，对不对？（content 对应 items 嘛）

一个不太容易理解的事情，看下面的代码，这说明一件事情，在弹性盒布局中，width 只能代表一个假设宽度，而不是一个硬性宽度，规范对此给了一个名字“hypothetical size”。Josh：`flex-basis` and `width` set the elements' *hypothetical size*. 

```html
<main>
  <div></div>
  <hr />
  <section>
    <div></div>
  </section>
</main>

<style>
  main {
    inline-size: 9rem;
    padding: 1rem;
    border: 2px dashed black;
  }
  
  section {
    display: flex;
  }
  
  div {
    /* flex-shrink: 0; */
    block-size: 3rem;
    inline-size: 100rem;
    border: 2px solid black;
    background-color: hotpink;
  }
</style>
```

`flex-basis` 和 `width / height` 的区别在于，前者更加灵活，在 Flex row 模式中，它代表 `width`，在 Flex column 中，它代表 `height`。而 width 永远都代表 width，height 永远都代表 height。`flex-basis` 的好处就是，它的方向永远跟着主轴走。

但是 width 也会有一些区别，比如在可替换元素（比如 img 元素）中，width 的作用和 flex-basis 是不同的，另外，width 可以突破元素的最小宽度，但是 flex-basis 不可以。

对于 `flex-grow` 的计算机制，文章中的「I think it'll be easier to explain visually. Try incrementing/decrementing each child:」部分的例子非常棒！

对于 `flex-shrink` 的计算机制，抄这个例子！「**Let's test it.** Try shrinking the container to see what happens:」🧠 原来 flex-shrink 的收缩会收到 flex-basis 的影响！（width 也和 flex-basis 一样会影响 flex-shrink）。flex-shrink 之所以会收到 flex-basis 的影响，是因为这样可以在收缩之后，item 之间的尺寸的比例关系也可以继续维持下去。

“Alright, so: we have two children, each with a hypothetical size of 250px. The container needs to be at least 500px wide to contain these children at their hypothetical size.” 从这句话可以看出，当容器尺寸小于子项的假设尺寸之和时，才开始考虑 shrink，同理可得，当容器尺寸大于子项的假设尺寸之和时，此开始考虑 grow。这也意味着，shrink 和 grow 不可能同时发挥作用。

这个例子在说「Take a couple of minutes and poke at this demo. **See if you can figure out what's going on here.** We'll explore below.」shrink 的原理。

关于 shrink 的原理，见：

```html
<section>
  <div></div>
  <div></div>
</section>

<style>
  section {
    display: flex;
    block-size: 300px;
    inline-size: 400px;
    border: 2px dashed black;
  }

  div:first-child {
    flex: 1 5 250px; /* 5 */
    background-color: hotpink;
  }

  div:last-child {
    flex: 1 2 500px; /* 4 */
    background-color: cornflowerblue;
  }
</style>
```

原来 min-inline-size 和 max-inline-size 会限制收缩和拉伸的极限。当 `flex-shrink: 0` 之后，便意味着不再会收缩，便意味着 `width` 或 `flex-basis` 就是最小宽度。

## 参考资料

https://www.joshwcomeau.com/css/interactive-guide-to-flexbox/
