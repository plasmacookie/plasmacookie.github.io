---
title: pixiv爬虫(一) 登录与获取cookie
date: 2021-09-15 17:34:32
categories:
- 俯听一树新绿
tags:
- pixiv爬虫
- 爬虫
- python
---
# 前言
这就是pixiv爬虫的重制版啦！  
这项目是想写成几篇blog啦，看标题也知道这是第一集，因为代码量不算少，全部挤到一篇的话，实在不算优雅；另一方面，单次任务量太多的话我就会无限制拖延  
这次的目标是多线程下载某tag里打心数高于某数值的所有图片。  
废话不多说，我们来开始吧(￣▽￣)~*  
<!-- more -->
之前看到其他p站爬虫的登录教程大都采用的是post登录，不过这种方法在p站添加了reCAPTCHA v3后就没法使用了，现在流行的方法是使用cookie。  
本篇使用的方法是selenium模拟登录p站后获取cookie  
当然你要是嫌弃太麻烦也可以手动从浏览器控制台把cookie复制下来，不过实在不优雅就是了...
# 安装selenium
已经安装过的小伙伴可以跳过这节（￣▽￣）  
首先安装selenium库：
```cmd
pip install selenium
```

然后[点我](http://chromedriver.storage.googleapis.com/index.html)下载对应版本的浏览器驱动，我用的是Chrome，用其他浏览器的就百度去找其他浏览器的驱动（  
下载后解压，随便丢到一个文件夹并设置环境变量
在python的IDLE输入
```IDLE
>>> from selenium import webdriver
>>> driver = webdriver.Chrome()
```

弹出一个浏览器就说明安装成功了![](autoExtension.png)  
之后就可以动手写代码了  
# 目前需要的python库
```dep
from selenium import webdriver
# 模拟浏览器
from selenium.webdriver.common.keys import Keys
# 模拟键盘输入
from selenium.webdriver.support.wait import WebDriverWait
# 设置浏览器等待时间
import sys
# 系统相关的操作
import os
# 操作文件
import random
# 设置随机数
import requests
# 各种网络请求
```

# 设置一些全局变量
```python
login_url = 'https://accounts.pixiv.net/login'
# 登录网址
home_page = 'https://www.pixiv.net/'
# 主页

user_agents = [
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/81.0.4044.113 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E;rv:11.0) like Gecko',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/58.0.3029.110 Safari/537.36',
]
# 一些user_agent
```

# 使用selenium模拟登录
## 打开无界面浏览器
之前我们测试的时候程序打开了一个测试用浏览器，虽然安装成功很开心，但是每次使用程序就要打开一个浏览器的话确实很烦人，所以我们设置一些参数，使程序能打开无界面浏览器。
```python
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--disable-gpu')
# 启动无界面浏览器
chrome_options.add_argument('log-level=3')
# 不打印日志
browser = webdriver.Chrome(options=chrome_options)
```

## 登录pixiv
selenium可以模拟浏览器动作，使用它登录的过程与人类无异，找到账号密码的输入框，输入账号密码，点按回车键。  
我们可以使用xpath来定位到账号密码的输入框。
```python
print('登录(￣▽￣)~*')
pixiv_id = input('pixiv_id: ')
password = input('password: ')
# 输入账号密码

browser.get(login_url)
# 打开登录界面
pixiv_id_xpath = '//input[@autocomplete="username"]'
password_xpath = '//input[@autocomplete="current-password"]'
pixiv_id_input = browser.find_element_by_xpath(pixiv_id_xpath)
# 定位到输入账号的位置
password_input = browser.find_element_by_xpath(password_xpath)
# 定位到输入密码的位置
pixiv_id_input.send_keys(pixiv_id)
password_input.send_keys(password)
password_input.send_keys(Keys.ENTER)
# 输入账号密码并点按回车
print('登录ing...')
```

## 设置等待时间
selenium加载网页需要几秒钟，这也是为什么不用selenium直接写爬虫的原因。  
登录未完成就无法获取到cookie，我们设置等待时间，当网页跳转到home_page就说明登录成功。
```python
try:
    WebDriverWait(browser, 5).until(
        lambda browser: browser.current_url == home_page)
    print('登录成功啦(๑•̀ㅂ•́)و✧')
    # 在5秒内跳转到home_page就说明登录成功

except Exception:
    print('资源获取失败w(ﾟДﾟ)w')
    sys.exit(0)
    # 否则登录失败，退出程序
```

## 获取cookie
获取cookie就很简单了，使用get_cookies()函数就可以，但我们打印一下得到的cookie就不难发现，这个函数的返回值是一个包含了许多字典的列表，而请求头里的cookie是一个字符串，所以我们还需要加工一下。这步完成后便可以关掉浏览器。
```python
cookie = browser.get_cookies()
# 获取cookie
process_cookie = [item["name"] + "=" + item["value"] for item in cookie]
cookies = ';'.join(item for item in process_cookie)
# 加工cookie

browser.close()
# 关闭浏览器
```

为了调用方便，我们把模拟登录并获得cookie的代码封装在一个名为get_cookies函数里，要获得cookie只需要函数末尾加个返回值return cookies。

# 保存与读取cookie
每次登录都要输入账号密码也很麻烦，我们将cookie保存在文件里，每次使用的时候读取文件里的cookie就无需重复输入账号密码了。保存与读取文件都是很基本的代码，就不做过多解释。
```python
# 将获取到的cookie保存在cookie文件里
def save_cookies(cookies):
    with open('cookies', mode='w')as fw:
        fw.write(cookies)


# 读取cookie文件里的内容
def read_cookies():
    try:
        with open('cookies', mode='r')as fr:
            cookies = fr.read()
    except Exception:
        cookies = ''
    return cookies
```

# cookie的重新获得
上面的代码又有了一个问题：究竟什么时候可以从文件里读取cookie，什么时候需要登录获取呢？  
为了解决这个问题，我们还需要再加一点东西。  
很容易知道，当cookie文件遗失，或cookie文件里的内容无法让我们成功登录的时候（即过期），我们就需要更新文件里的内容。  
我们先设置一个空函数is_login,当登录成功时，它返回True，登录失败时，它返回False。  
于是更新cookie文件内容的函数便可以写成：
```python
# 判断是否需要重新获得cookie
def is_cookie_expired():
    if not os.path.exists('cookies') or not is_login():
        save_cookies(get_cookies())
```

当cookie文件遗失或者登录失败时，它便执行save_cookies(get_cookies()),以更新cookie文件内容，否则不执行任何动作。  
接下来我们只需要对is_login函数进行填充，如何判断是否登录成功。

# 是否登录成功
我们只需要使用cookie中的内容登录一下，能够获取到登录后的内容就说明登录成功。  
那么这个问题就变成，什么内容是登录后才会有而登录前没有的。  
这个问题就很简单了，通过观察登录前与登录后的home_page网页代码，我发现登录后网页代码中存在有login: 'yes'这个字典元素，登录前的网页代码则是login: 'no'。
```python
# 登录时的头部信息
login_headers = {
    'cookie': read_cookies(),
    'user-agent': random.choice(user_agents)
}


# 判断是否登录成功
def is_login():
    try:
        html = requests.get(url=home_page, headers=login_headers).text
    except Exception:
        print('没有连接到网络w(ﾟДﾟ)w')
        sys.exit(0)

    if "login: 'yes'" in html:
        return True
    else:
        return False
```

程序运行前只要先调用is_cookie_expired函数就能保证cookie文件中的内容一定可用。