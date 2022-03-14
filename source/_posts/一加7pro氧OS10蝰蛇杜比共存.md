---
title: 一加7pro氧OS10蝰蛇杜比共存
tags:
- 一加7pro
- 蝰蛇音效
- 杜比音效
categories: 玩机日常
description: 刷音效模块那些事。
---
# 前言
&ensp;&ensp;&ensp;&ensp;因为某些乌龙（指以为手机屏碎，想要使用碎屏险，遂将手机恢复出厂。之后发现只是手机膜的划痕。）退回OOS10了。于是重新解bl，刷twrp，刷magisk。结果在刷入音效模块的时候总是出问题。在经历各种变砖之后终于摸索出了解决方法，来记录一下。  

&ensp;&ensp;&ensp;&ensp;注：本教程并不包括刷入音效前的准备工作（解bl，刷magisk等）以及刷入音效后的调教工作（如何配置音效，以及脉冲文件的下载）。如需要这方面的教程，请咨询谷歌大神。  

&ensp;&ensp;&ensp;&ensp;**刷机有风险，请自行承担后果。**  

# 蝰蛇音效
&ensp;&ensp;&ensp;&ensp;首先刷入[Audio-Modification-Library](https://zackptg5.com/downloads/Audio-Modification-Library_v4.1.zip)，并重启，该模块可以使多个音效模块共存。  

&ensp;&ensp;&ensp;&ensp;蝰蛇音效需要将SeLinux切到宽容模式才能正常工作，因此先来着手这方面工作。下载并安装[Scene4](https://github.com/helloklf/vtools/releases)，在杂项设置中打开SeLinux宽容模式。  
![](SeLinux宽容.png)  

&ensp;&ensp;&ensp;&ensp;之后刷入[蝰蛇音效的magisk模块](https://zackptg5.com/downloads/v4afx_v2.7.2.1.zip)，过程中会自动安装一个名为`ViPER4Android FX`的应用。打开该应用，授予root权限，之后会提示下载驱动，安装好驱动后会自动重启。  

&ensp;&ensp;&ensp;&ensp;重启后打开ViPER4Android FX，设置中打开Legacy mode。之后查看驱动状态，若显示正常，则蝰蛇安装完毕。  
![](蝰蛇.png)

# 杜比音效
&ensp;&ensp;&ensp;&ensp;因为一加自带的杜比音效太垃圾了，而且会与安装的其他杜比冲突，因此首先要冻结或者卸载系统自带的杜比音效。冻结可以使用冰箱，灭霸之类的软件，卸载系统软件可以使用幸运破解器。  
![](冻结杜比.png)

&ensp;&ensp;&ensp;&ensp;本来是想使用[reiryuki](https://github.com/reiryuki)大佬的杜比模块，因为我的渣2刷了类原生后可以完美使用。但是经过多次尝试，发现reiryuki大佬的杜比模块一个也无法使用，不是不生效就是直接砖。可能是因为OOS还不够原生？  

&ensp;&ensp;&ensp;&ensp;本来都要放弃了，结果在apkmirror找到了razer的[dolby atmos](https://www.apkmirror.com/apk/razer-inc/dolby-atmos-4/dolby-atmos-4-dax2_2-6-0-28_r1-release/dolby-atmos-dax2_2-6-0-28_r1-android-apk-download/)。完美兼容一加7pro的OOS10，安装上就能直接使用。  
![](杜比.png)