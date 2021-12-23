---
title: pixiv爬虫
date: 2021-12-21 17:19:23
tags: 
- 爬虫
- python
- pixiv爬虫
categories: 技术分享
description: 用python写一个程序用来自动下载pixiv的图片
---
# 前言
&ensp;&ensp;&ensp;&ensp;虽然应该还有不少需要做的事，总之一件件做，但果然色图才是最重要的呀（，所以今天就要来爬取pixiv了。  

&ensp;&ensp;&ensp;&ensp;不出意外的话，这就是第一篇blog里提到的重制版了，目的是写一个下载插画的爬虫。废话不多说，我们来开始吧(￣▽￣)~*

# pixiv网页分析
## 作品分类
### 作品题材分类
&ensp;&ensp;&ensp;&ensp;pixiv的作品按题材分一共有三类，分别是插画，漫画和小说。这次爬虫只要插画，那么应该如何区分它们呢？  

![](kind01.png)  

&ensp;&ensp;&ensp;&ensp;在搜索框输入要搜索的内容，回车后可以看到“顶部”，“插画”，“漫画”，“小说”，“用户”等分类。当我们点击插画时，发现网页的url变成了`https://www.pixiv.net/tags/クリスマス/illustrations` 。  

&ensp;&ensp;&ensp;&ensp;来分析一下这个链接。`https://www.pixiv.net` 就是pixiv的地址。`tags`即标签，表明这个链接展示的是某标签下的作品。`クリスマス`是我们搜索的内容。`illustrations`则表明插画。  

&ensp;&ensp;&ensp;&ensp;整个搜索结果构成的链接可以划分为`https://www.pixiv.net/`+`tags/`+`搜索内容/`+`作品分类`。当作品分类是`manga`时，表明搜索漫画。当作品分类是`novels`时，表明搜索小说。  

### 作品限制级分类
&ensp;&ensp;&ensp;&ensp;除了上述分类机制，当我们在用户设置里选择显示R18与R18G作品时，便可以显示R18与R18G的作品。  

![](kind02.png)  
![](kind03.png)  

&ensp;&ensp;&ensp;&ensp;在用户设置-->浏览限制中选择显示作品后，再次搜索。会发现页面上多出了限制级分类。  

&ensp;&ensp;&ensp;&ensp;网页链接除了之前分析过的部分外，又多出了`?mode=safe`。这便是和限制级有关的了。当mode=safe时，显示全年龄。当mode=r18时，显示R18以及R18G作品。当没有这部分或者mode=all时，全年龄和限制级作品全都显示。  

&ensp;&ensp;&ensp;&ensp;值得注意的是，若不选择显示限制级作品，就算手动修改链接为mode=r18也是不会显示限制级作品的。  

### 用户与搜索
&ensp;&ensp;&ensp;&ensp;之前都是基于使用搜索的基础上，在我们实际使用网站的过程中，除了使用搜索获取图片，也会有想获取某画师作品的情况。我们进入一个画师的主页，并查看画师的插画作品。  

![](kind04.png)  

&ensp;&ensp;&ensp;&ensp;网页的url为`https://www.pixiv.net/users/9212166/illustrations` 。我们来分析一下。`users`即用户，说明我们通过搜索用户来查找作品。`9212166`即是表明用户身份的特定id，每个用户在注册的时候就会被分配一个数字用于确定用户身份。`illustrations`，刚刚我们就了解到，这是表明正在查看插画分类。  

&ensp;&ensp;&ensp;&ensp;很容易发现左侧分类栏和之前差不多，但是缺少了漫画和小说分类。这是因为该用户并没有漫画和小说分类的作品，只有有了对应分类的作品，才会反映到分类栏。  

&ensp;&ensp;&ensp;&ensp;我们也可以通过修改url来查看特定分类。分类对应的单词和之前一致。但是多出了`request`约稿分类。普通用户可以向有该分类的画师进行约稿。（虽然这次爬虫用不到就是了）如果画师没有对应分类的作品，则会显示`没有作品`。  

![](kind06.png)  

&ensp;&ensp;&ensp;&ensp;需要注意的是，在用户作品里是没有限制级分类的，所以使用“mode=”完全没有用。能否看到限制级作品取决于你是否选中了显示限制级作品的按钮，选择了显示限制级的话，则会全部显示，否则显示全年龄。

### 动图
&ensp;&ensp;&ensp;&ensp;pixiv还有一类特殊的作品，动图。pixiv的动图并不是一份动图文件，而是许多静态图按照延迟时间展示在页面上。所以单纯用解析文件二进制并存入本地文件的方式是无法下载pixiv的动态图的。如何区分动态图和静态图，以及如何下载动态图也是需要思考的问题。  

## 下载分析
### 获取画师作品id
&ensp;&ensp;&ensp;&ensp;我们进入画师的主页，按F12进入浏览器的开发者工具，进入NetWork面板，分类选择XHR。按F5刷新后，会发现name中多了一个名叫`all?lang=zh`的get请求。点击查看Headers中的Request URL。  

![](down01.png)
![](down02.png)  

&ensp;&ensp;&ensp;&ensp;进入Request URL，通过仔细观察，我们不难发现，这里保存着作者的所有作品。`illusts`后的json对象中保存着所有插画作品的id。`manga`后的json对象中保存着所有漫画作品的id。`novels`后的json对象中保存着所有小说作品的id。

### 获取某搜索内容下的所有作品id
&ensp;&ensp;&ensp;&ensp;我们搜索某内容并进入插画作品分类。按同样的方式打开控制台后刷新页面。发现name中多了一个get请求，点击并查看Headers中的Request URL。  

![](down03.png)
![](down04.png)  

&ensp;&ensp;&ensp;&ensp;打开Request URL，通过观察容易发现，这里保存着作品id。但我们在页面中查找"id"的时候却发现有78个，pixiv一个页面中保存着6x10一共60幅作品，这78个id里，肯定有不是作品id的我们不需要的id，如何分辨呢。通过仔细查看json数据，我发现数组"data"中，一共有60个json对象，正好和页面搜索结果一一对应。这些json对象的第一个key"id"的值，便是我们搜索得到的作品id。  

&ensp;&ensp;&ensp;&ensp;看似万事大吉，但仔细一想，我们搜索到的作品肯定不止这60幅啊，其他的在哪呢？我们来分析一下parameters，除了mode和p其他都对我们分析没有用处，因此这个URL可以简写为`https://www.pixiv.net/ajax/search/illustrations/Fate%2FGrandOrder?mode=all&p=1` 。`illustrations`表示正在搜索插画。`Fate%2FGrandOrder`是我们的搜索内容。`mode=all`表示全年龄和R18作品都会搜索到。`p=1`表示这是搜索结果的第一页。  

&ensp;&ensp;&ensp;&ensp;容易发现，只要让p=的数字递增，便可实现翻页效果，直到获取到所有作品id。那么又引出一个问题，什么时候到达最后一页呢？打开搜索后的界面，不难发现这个元素。  

![](down05.png)
![](down06.png)

&ensp;&ensp;&ensp;&ensp;这是搜索到的总的作品数，要知道pixiv每一页的数量都是固定的60幅，就能计算出总页数了。值得注意的是pixiv最多展示1000页，就算总作品数大于6w，也只能看到前1000页的作品。

### 判断作品是否是我们需要的
&ensp;&ensp;&ensp;&ensp;有了作品id后，我们需要判断是否要下载该作品。pixiv判断一个作品的受欢迎程度是根据三种数值来判断的，分别是点赞数，收藏数和浏览量。使用哪一个都没关系，甚至采用某种算法对这三个数值进行计算后得到的数值都可以。毕竟我是自己用的，就不搞那么复杂了，我就用收藏数来作为判断某作品是否是我想要下载的依据。  

&ensp;&ensp;&ensp;&ensp;有了作品id后，我们可以拼接字符串，来获得作品的地址。我们打开一幅作品，进行分析。  

![](down07.png)  
![](down08.png)

&ensp;&ensp;&ensp;&ensp;发现我们需要的属性都在页面上。源码中，使用bookmarkCount表示收藏数，likeCount表示点赞数，viewCount表示浏览量。我们还发现pageCount这个属性，这是表示该作品一共有多少页的属性。  

### 判断作品是静图还是动图
&ensp;&ensp;&ensp;&ensp;pixiv的静图与动图的下载方式不同，所以区分它们是很有必要的。我们打开一幅动图作品分析其源码，试着找到它与静图作品的不同之处。经过我不懈努力，终于发现个是在所有动图页面中都存在，而不存在于静图页面的单词。这里直接说结论:**ugoira**。（写爬虫可真费眼睛）  

![](j1.png)
![](j2.png)

### 下载静图
&ensp;&ensp;&ensp;&ensp;页面代码中key"urls"的值即是静态图的二进制文件。甚至还贴心的可以让我们选择像素，有mini、thumb、small、regular、original五种可以选择。既然要下载肯定要下原图啦。需要注意的是，二进制文件均是是以p0结尾的。对于有多张图片的作品，只要递增p后的数值就可以了。我们之前获得的pageCount属性在这里就发挥用处了。但当我们直接打开这些图片链接的时候，发现403了。经过谷歌大神的解答，我了解到这是pixiv的防盗链机制，如果返回头referer不带作品链接就会报430。那这个问题就等写代码的时候再解决吧。

![](down09.png)

### 下载动态图
&ensp;&ensp;&ensp;&ensp;我们打开一幅动图作品，按之前的方式打开控制台并刷新。发现name中多了一个名为ugoira_meta?lang=zh的get请求。点击查看Header中的Request URL，发现该链接保存着动图的压缩包链接和所有文件名以及每个文件的帧延迟时间。有了每一帧和每一帧的延迟时间，我们就可以合成gif了。    

![](u1.png)
![](u3.png)  


## 需解析的URL汇总
`https://www.pixiv.net/ajax/user/ +用户id+ /profile/all?lang=zh`:  
通过该URL可获取该用户的所有作品的id。  

`https://www.pixiv.net/ajax/search/illustrations/ +搜索内容+ ?mode= +限制级分类+ &p= +页数`:  
通过该url可获取某搜索内容下，某限制级分类的某页所有作品的id。  

`https://www.pixiv.net/tags/ +搜索内容+ /illustrations?mode= +限制级分类`:  
通过该url可获取某搜索内容下，某限制级分类的作品总数。  

`https://www.pixiv.net/artworks/ + 作品id`:  
通过该url可获取某作品的收藏数，页数，是静图还是动图。还可以从该页面获取原图链接。

`https://www.pixiv.net/ajax/illust/ +动图作品id+ /ugoira_meta?lang=zh`: 
通过该url可获取动图作品的压缩包和每一帧的延迟时间。

# 写代码
&ensp;&ensp;&ensp;&ensp;项目代码已上传至github，请至此处查看: [pixivSpider](https://github.com/plasmacookie/pixivSpider)