---
title: pixiv爬虫(二) 获取图片链接
date: 2021-09-15 17:53:21
categories:
- 技术
tags:
- pixiv爬虫
- 爬虫
- python
---
# 准备工作  
这一集的目的是获取搜索到的所有图片链接  
打开上节课你写好的代码，别忘了在最后调用函数is_cookie_expired
```python
is_cookie_expired()
```
<!-- more -->
# 目前新增的python库
```python
from requests.adapters import HTTPAdapter
# http适配器
import re
# 用来切割字符串
import math
# 提供一些数学运算
from queue import Queue
# 队列
import threading
# 多线程
```
# 定义一些全局变量
```python
se = requests.Session()
# 新建会话
se.keep_alive = False
# 删除打开的链接
se.mount('http://', HTTPAdapter(max_retries=5))
se.mount('https://', HTTPAdapter(max_retries=5))
# 最大重试次数=5
# 将重试规则挂载到http与https链接
tag = input('你要搜索什么呢|･ω･)？')
```
# 搜索图片
我们打开p站首页，按F12进入浏览器的开发者工具，进入Network面板，分类选择XHR。  
在pixiv输入框输入搜索内容，点按回车，之后在分类里点击“插画”，  
在点击“插画”时，我们发现右边面板里同时增加了一个get请求。![](search.png)
点击进入，并查看Request URL与param![](request.png)
进入Request URL，发现这里保存着json格式的图片信息，浏览了一遍后，发现这里我们需要的只有illustId和pageCount![](json.png)
# 获取图片链接与pageCount
我们构造Request URL和param，由于param中的参数p是页数，我们只需要在for循环中让p递增就可实现翻页效果。  
然后在打开的网页中获取到illustId和pageCount。之后将illustId加工成图片链接即可。  
问题来了，什么时候到达最后一页呢？  
我们不妨先设置一个空函数get_total_pages()，这个函数将返回全部页数。之后填充此函数。  
```python
# 获取图片链接和页数
def get_img_url():
    request_url = 'https://www.pixiv.net/ajax/search/illustrations/{}'.format(tag)
    # 构造request url
    img_datas = []
    for i in range(get_total_pages()):
        params = {
            'word': tag,
            'order': 'date_d',
            'mode': 'all',
            'p': i+1,
            's_mode': 's_tag',
            'type': 'illust_and_ugoira',
            'lang': 'zh'
        }
        # 构造param
        resource = se.get(url=request_url, headers=login_headers, params=params)
        # 获取网页内容
        data = resource.json()["body"]["illust"]["data"]
        # illustId与pageCount都保存在data列表里
        for d in data:
            img_url = 'https://www.pixiv.net/artworks/{}'.format(str(d['illustId']))
            img_data = (img_url, int(d['pageCount']))
            img_datas.append(img_data)
    return img_datas
```
# 获取页数
观察搜索页的网页源代码，我们发现了这样一句话：“SOS団のイラストや絵は1055件投稿されています”![](total.png)
从这里我们可以得到作品总数。我们知道p站最多可以查看1000页，每1页有60幅作品，只要将作品总数除以60就可以得到全部页数。  
这里使用的方法是用正则表达式找出这句话，再用一次正则表达式找出这句话中的数字。很简单的正则表达式，就不过多解释了。  
```python
# 获取总页数
def get_total_pages():
    search_url = 'https://www.pixiv.net/tags/{}/illustrations'.format(tag)
    resource = se.get(url=search_url, headers=login_headers).text
    # 获取搜索页面内容
    sentence_pattern = re.compile('のイラストや絵は\\d{1,}件投稿されています')
    sentence = str(sentence_pattern.search(resource).group(0))
    tpage_pattern = re.compile('\\d{1,}')
    total_number = int(tpage_pattern.search(sentence).group(0))
    # 获取作品总数
    if total_number/60 > 1000:
        total_pages = 1000
    else:
        total_pages = int(math.ceil(total_number/60))
    # 获得总页数
    return total_pages
```
# 进阶——使用多线程获取图片链接
## 对get_img_url函数的修改
我们的目的是使用多个线程完成一个for循环，即将一个for循环拆分为多个for循环，之后将结果合成。  
为了达成这个目的，我们需要设置每个小for循环的起始点与结束点。  
因为多线程没法直接传递返回值的，所以还需要用一个队列参数q来传出每一个for循环生成的小列表。  
修改后的get_img_url函数为：
```python
def get_img_url(start, stop, q):
    # 传入起始点，结束点与队列参数
    request_url = 'https://www.pixiv.net/ajax/search/illustrations/{}'.format(tag)
    img_datas = []
    for i in range(start, stop):
        # 小for循环从每一个起始点开始，到每一个结束点结束
        params = {
            'word': tag,
            'order': 'date_d',
            'mode': 'all',
            'p': i+1,
            's_mode': 's_tag',
            'type': 'illust_and_ugoira',
            'lang': 'zh'
        }
        resource = se.get(
            url=request_url, headers=login_headers, params=params)
        data = resource.json()["body"]["illust"]["data"]
        for d in data:
            img_url = 'https://www.pixiv.net/artworks/{}'.format(str(d['illustId']))
            img_data = (img_url, int(d['pageCount']))
            img_datas.append(img_data)
    q.put(img_datas)
    # 将得到的小列表加入队列
```
## 多线程函数
我们使用16个线程来完成，那么需要将总页数等分成16份，每份交由不同的线程来完成。  
我们可以使用等差数列公式来求出每一份的start和stop。这个等差数列的公差即为int(total_pages/16)。  
但因为total_pages不可能总是16的整数倍，公差d却必须要整数，这样算下来，只有前15份必定是等差数列，第16份则需要另计算。  
等所有线程完成，我们将队列q中的数据整合，得到我们想要的结果。
```python
# 多线程
def multithreading_1():
    thread_count=16
    # 设置线程数
    total_pages = get_total_pages()
    d = math.ceil(total_pages/thread_count)
    q = Queue()
    threads = []
    # 定义线程列表
    for i in range(thread_count-1):
        t = threading.Thread(target=get_img_url, args=(i*d, (i+1)*d, q))
        threads.append(t)
        t.start()
    # 前15个线程
    t = threading.Thread(target=get_img_url, args=((thread_count-1)*d, total_pages, q))
    threads.append(t)
    t.start()
    # 第16个线程
    for t in threads:
        t.join()
    # 等待threads中的线程结束
    img_datas = []
    for _ in range(thread_count):
        img_datas = img_datas+q.get()
    # 将队列q中的内容整理到img_datas中
    return img_datas


print('正在爬取数据...')
img_datas = multithreading_1()
print('\n共搜索到{}幅作品'.format(len(img_datas)))
```

