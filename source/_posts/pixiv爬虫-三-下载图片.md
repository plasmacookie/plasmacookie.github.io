---
title: pixiv爬虫(三) 下载图片
date: 2021-09-15 18:00:09
categories:
- 技术
tags:
- pixiv爬虫
- 爬虫
- python
description: python写pixiv爬虫的教程的第三篇。通过获取到的图片链接下载图片
---
# 下载图片
你以为直接就开始下载了吗？先别急，我们来想一想下载图片的流程。  
我们先判断打心数是否高出我们所设定的最小目标，然后才执行下载。  
pixiv图片的下载也有静态图和动态图之分。<!-- more -->  
我们先设置三个空函数get_count，download_static_img，download_dynamic_img，分别用于获取打心数，下载静态图，下载动态图; 将判断一张图片是动态图还是静态图的条件设为Expression。  
那么下载图片的函数就可以写成：
```python
book_mark_count = int(input('请输入最少收藏数：'))
def download_img():
    for img_data in img_datas:
        if get_count() < book_mark_count:
        # 判断打心数是否高出我们设定的最小目标
            continue
        if Expression:
            # 判断是否满足条件
            download_dynamic_img()
            # 下载动态图
        else:
            download_static_img()
            # 下载静态图
```

我们只需要填充此函数就好。
# 判断动态图还是静态图
经过我对动态图与静态图网页源码的一番观察，我发现动态图的源码里存在而静态图的源码里不存在的一个单词“ugoira”![](j1.png)
![](j2.png)
这就能成为判断图片类型的条件了。
Expression即为：
```python
resource = se.get(url=img_data[0], headers=login_headers).text
if 'ugoira' in resource
```

# 获取打心数
观察一下网页源代码就不难发现打心数所在的位置![](bookmarkCount.png)
我这里使用的方法是先用一次正则表达式获取到这句话，再用一次正则表达式获取到打心数。  
当然是用bs4或者其他方法也是可以的。  
```python
# 获取加入书签数
def get_count(img_data):
    resource = se.get(url=img_data[0], headers=login_headers).text
    bookmarkCount_pattern = re.compile('"bookmarkCount":\\d{1,}')
    bookmarkCount = str(bookmarkCount_pattern.search(resource).group(0))
    # 获取保存有打心数的字符串
    count_pattern = re.compile('\\d{1,}')
    count = int(count_pattern.search(bookmarkCount).group(0))
    # 获取打心数
    return count
```

我们发现获取网页源码这个操作出现了多次，所以不妨将他作为一个参数传进来。那样此函数就变成了：
```python
def get_count(img_data,resource)
```

然后在此函数里删掉获取网页源代码这个操作就好
# 下载静态图
观察一下静态图的源码，我们发现了图片的直接地址，甚至还有mini，thumb，small，regular，original五种像素可供选择。![](original.png)
对于有多张图片的作品，我们可以切割字符串，在for循环里依次获得每一张图片地址，for循环的结束标志就是之前获取到的页数。  
**p站有防盗链机制，假如返回头referer不带作品链接会报403错误！**  
**p站有防盗链机制，假如返回头referer不带作品链接会报403错误！**  
**p站有防盗链机制，假如返回头referer不带作品链接会报403错误！**  
```python
# 创建下载目录
filepath = "E:/image/"+tag+'/'
folder = os.path.exists(filepath)
if not folder:
    os.makedirs(filepath)
cookie = read_cookies()

# 下载静态图
def download_static_img(img_data, resource):
    original_pattern = re.compile(
        'https://i.pximg.net/img-original/img/\\d{4}(/\\d{2}){5}/\\d{1,}_p\\d{1,}.\\w{1,}')
    original_url = str(original_pattern.search(resource).group(0))
    # 获取原图链接
    headers = {
        'referer': img_data[0],
        'cookie': cookie,
        'user-agent': random.choice(user_agents)
    }
    # 构造请求头
    li = original_url.split('p0')
    # 切割链接
    if len(li) == 2:
        for i in range(img_data[1]):
            original_url = li[0]+'p'+str(i)+li[1]
            # 获得每一页的链接
            resource = se.get(url=original_url, headers=headers).content
            img_name_pattern = re.compile('\\d{1,}_p\\d{1,}.\\w{1,}')
            img_name = str(img_name_pattern.search(original_url).group(0))
            # 获取图片名
            with open(filepath+img_name, mode='wb')as fw:
                fw.write(resource)
            # 下载图片
```

# 下载动态图
## 需要用到的python库
```python
import imageio
import zipfile
```
我们先找到一张动态图，按F12打开开发者工具，分类里选择XHR，按F5刷新，我们找到了动图的get请求![](ugoira.jpg)
打开request url，发现这里保存着动图的所有文件名和帧延迟时间![](delay.jpg)
打开动图get请求的preview面板，我们发现了一个压缩包，这个压缩包包含着动图的每一帧图片。![](zip.jpg)
我们要做的就是下载得到压缩包并解压，根据帧延迟时间合成gif。  
得到压缩包链接的方法是用动图的链接修改得到...（又不是不能用）
```python
# 下载动态图
def download_dynamic_img(img_data, resource):
    original_pattern = re.compile('https://i.pximg.net/img-original/img/\\d{4}(/\\d{2}){5}/\\d{1,}_ugoira\\d{1,}.\\w{1,}')
    original_url = str(original_pattern.search(resource).group(0))
    original_zip = original_url.replace(
        'img-original', 'img-zip-ugoira').replace(
            'ugoira0.jpg', 'ugoira1920x1080.zip').replace(
                'ugoira0.png', 'ugoira1920x1080.zip')
    # 得到压缩包链接
    headers = {
        'referer': img_data[0],
        'cookie': cookie,
        'user-agent': random.choice(user_agents)
    }
    # 构造请求头
    zip_name_pattern = re.compile('\\d{1,}_ugoira\\d{1,}x\\d{1,}.\\w{1,}')
    zip_name = str(zip_name_pattern.search(original_zip).group(0))
    # 得到压缩包名字
    id_pattern = re.compile('\\d{8}')
    illustid = str(id_pattern.search(original_zip).group(0))
    # 获得id
    resource = se.get(url=original_zip, headers=headers).content
    with open(filepath+zip_name, mode='wb')as fw:
        fw.write(resource)
    # 下载压缩包
    temp_file_list = []
    zipo = zipfile.ZipFile(filepath+zip_name, "r")
    for img in zipo.namelist():
        temp_file_list.append(os.path.join(filepath+illustid, img))
        zipo.extract(img, filepath+illustid)
    zipo.close()
    # 解压
    ugoira_url = 'https://www.pixiv.net/ajax/illust/{}/ugoira_meta?lang=zh'.format(illustid)
    resource = se.get(url=ugoira_url, headers=headers)
    delay = resource.json()['body']['frames'][0]['delay']
    # 获得帧延迟时间
    image_data = []
    for img in temp_file_list:
        image_data.append(imageio.imread(img))
    imageio.mimsave(os.path.join(filepath, str(
        illustid) + ".gif"), image_data, "GIF", duration=int(delay)/1000)
    # 合成gif
    for img in temp_file_list:
        os.remove(img)
    os.removedirs(filepath+illustid)
    os.remove(filepath+zip_name)
    # 删除所有中间文件
```
# 多线程下载图片
## 对download_img函数的修改
我们要多线程循环一个列表，也就是把一个列表平分成多个小列表，每一个线程循环一个小列表。所以我们传入download_img的参数也应是一个列表。  
为了显示下载进度，我加了一条打印下载百分比的信息
```python
def download_img(datas):
    # 传入小列表
    flag = 0
    count_datas = len(datas)
    for img_data in datas:
        flag = flag+1
        sys.stdout.write("下载进度: {0}%\r".format(int(100*flag/count_datas)))
        sys.stdout.flush()
        # 打印下载进度
        resource = se.get(url=img_data[0], headers=login_headers).text
        if get_count(img_data, resource) < book_mark_count:
            continue
        if 'ugoira0' in resource:
            download_dynamic_img(img_data, resource)
        else:
            download_static_img(img_data, resource)
```
## 多线程函数
我们使用16个线程来完成，那么需要将列表分成16个小列表，每个列表交由不同的线程来完成。  
这里和上一节使用的方法相同，使用了等差数列后将列表切片。上一讲讲过了这里不再赘述。  
```python
# 多线程下载图片
def multithreading_2():
    tc = 16
    threads = []
    d = int(math.ceil(len(img_datas)/16))
    for i in range(tc-1):
        t = threading.Thread(target=download_img,args=(img_datas[i*d:(i+1)*d], ))
        threads.append(t)
        t.start()
    t = threading.Thread(target=download_img,args=(img_datas[(tc-1)*d:len(img_datas)], ))
    threads.append(t)
    t.start()
    for t in threads:
        t.join()
    print('下载完成')


multithreading_2()
```

# 后记
项目到这里就做完了。本身还是很简单的。使用了一些比较简单的爬虫知识与字符串切割方法。  
爬虫本身不难，写这几篇blog最重要的还是爬虫思想，以及如何去获取到api。  
这次爬虫只写了通过tags爬取图片的方法，但如果有同学想要通过每日排行榜或者通过绘师来下载图片的话，原理是一样的，都是先获取图片，再下载图片，所以有别种需求的同学也可以从本篇blog中获取经验，然后自己想办法修改。  
项目已传至github: [点我传送](https://github.com/plasmacookie/pixivSpider)  
  
求围观！！乌拉！！！！（>○<）
