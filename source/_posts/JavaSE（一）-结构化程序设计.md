---
title: JavaSE（一） 结构化程序设计
date: 2021-12-13 10:00:55
tags:
- java
- java学习
categories: 学习笔记  
description: 在复习java啦，没想到东西还挺多的，本来是想一篇写完的，看来做不到emm
---

## 注释
```java
// 单行注释

/*
    多
    行
    注
    释
*/
```

## JDK、JRE和JVM
### 是什么
现在企业使用最多的版本是JDK1.8  
JDK: Java Development Kit; java开发工具  
JRE: Java Runtime Environment; java运行环境  
JVM: Java Virtual Machine; java虚拟机  

### 三者之间的区别 
JDK是java开发工具，提供给开发人员使用。它包括JRE和其他java工具，比如javac等  
JRE是java运行环境，提供给需要运行java程序的用户使用。它包括JVM(jre的bin目录)和类库  
JVM是java虚拟机  

### java程序的运行过程
java源文件(.java文件)经过javac编译成为字节码文件(.class文件)  
.class文件再经过不同操作系统上的jvm翻译成为不同的机器码并运行  

### 一次编译到处运行
java一次编译到处运行是指源文件编译成为字节码文件后，字节码文件可经由不同操作系统上的jvm翻译为不同的机器码并运行。  
**到处运行指的是.class文件，而不是jvm可以到处运行**

## java特性（了解）
面向对象  
跨平台  
健壮性（鲁棒性）  
异常处理机制  
支持多线程  
支持网络编程  
...  
// 了解就好，又不是上学考你填空题

## 关键字
关键字，也叫保留字，是系统预定义的一些有特殊功能的单词  
java中有几十个关键字，比较常见的有package，public，class，for，if等等。  
**标识符命名不能使用关键字**  

## 标识符
### 定义
在java中用于表示类名、变量名、方法名等等  
命名规则：  
1. 字母、数字、_、$组成，但实际开发中一般只用数字和字母组成。且实际开发中不同用处的标识符定义也有不同
2. 不能是关键字


### 类名
```java
//定义类
class 类名{
    //...
}
```

命名规则：  
1. 首字母必须大写
2. 由字母数字组成，数字用的少，一般使用多个单词用驼峰命名法


### 变量名
```
// 声明变量
// 数据类型 变量名;
```

命名规则：
1. 首字母小写
2. 多个单词拼接在一起，其他单词首字母大写（驼峰）

## 数据类型
### 几种问题
**java中有几种数据类型**  
两种  
**基本数据类型分几种**  
四种  
**基本数据类型有几个**  
八个  

### 数据类型分类
1. 数据类型分为
   1. 基本数据类型
   2. 引用数据类型
2. 基本数据类型分为
   1. 整数型
   2. 浮点型
   3. 字符型
   4. 布尔类型
3. 整数型: byte short int long
4. 浮点型: float double
5. 字符型: char
6. 布尔类型: boolean


### 整数型
byte类型有8位 1byte = 8bit 范围：[-128,127]，有一位符号位  
short类型16位 范围：[-2^15,2^15-1]  
int类型32位  
long类型64位  
**java中整数默认int类型**

### 浮点型
float类型32位，单精度浮点数，1位符号位，8位指数，23位有效尾数  
double类型64位，双精度浮点数，1位符号位，11位指数，52位有效尾数  

### 字符型
char类型16位，可以存一个字符，包括汉字

### 布尔类型
boolean类型 1位 默认是false

## 变量
### 定义
变量的定义包括声明和赋值  
**声明**
```java
// 数据类型 变量名;
int num;
```

**赋值**
```java
// 变量名 = 值;
num = 1;
```

**简写**
```java
int num = 1;
```

### 不同数据类型的定义
```java
int intNum = 100;
short shortNum = 19;
byte byteNum = 10;
long longNum = 1000000000L;
float floatNum = 1.2f;
double doubleNum = 1.234d;
boolean b = true;

char c1 = 'a';  //char类型存入字符
char c2 = 97;   //char类型存入ascii码
```

## 基本数据类型的转换
### 一个例子
```java
byte num=1;
num = num+2;    //error
// Type mismatch: cannot convert from int to byte
```

错误原因：java中出现整数默认是int类型，num+2是int类型，却用byte类型接收

### 数据类型的自动转换（提升）
数据类型的自动转换，从高到低：  
double float long int short byte  
有double类型自动提升成double类型，没有则逐渐递减  

```java
double dNum = 1;    //1.0
// int类型自动提升成double类型

int iNum = 1.0; //error
//double类型不能转成int类型，所以报错
```

### 强制转换
```java
int intNum = (int)1.234;    // 1
//将double类型强制转换成int类型
//舍弃小数点后的数字

int m = 97;
char a = (char)m;	//a
// 将int强转为char类型 ascii码
```

### 精度的丢失

```java
double d1 = 0.3d;
double d2 = 0.5d;
float f1 = 0.3f;
float f2 = 0.5f;
System.out.println(d1==f1);	//false
System.out.println(d2==f2);	//true

System.out.println(d1+d2);	//0.8
System.out.println(f1+f2);	//0.8
// 精度丢失
System.out.println(d1+f1);	//0.600000011920929
System.out.println(d2+f2);	//1.0
```

**如何解决精度丢失**  
```java
//import java.math.BigDecimal
double doubleNum = 0.3d;
float floatNum = 0.3f;
//0.600000011920929 精度丢失
System.out.println(doubleNum+floatNum);	
		
//解决精度的丢失
BigDecimal b1 = new BigDecimal(Double.toString(doubleNum));
BigDecimal b2 = new BigDecimal(Float.toString(floatNum));
//0.6
System.out.println(b1.add(b2));

```

BigDecimal经常用于解决精确计算问题。

## 运算符
### 运算符类型
算术运算符：+	-	*	/	%	++	--

赋值运算符：=	+=	-=	*=	/=

比较运算符：==	>	<	>=	<=	!=

逻辑运算符：& | ! && ||

位运算符：	<<	>>	^	& | !

三目运算符：布尔表达式?值1:值2

### i++与++i
i++是后自加，++i是先自加

```java
int num = 10;
int i = 1;
System.out.println(num+(i++));	//11
System.out.println(i);          //2
```

```java
int num = 10;
int i = 1;
System.out.println(num+(++i));	//12
System.out.println(i);          //2
```

### +=与= +
运算符在以下场景中会有区别
```java
byte m=1;
m=m+2;	//报错
//报错原因：2默认是int型，m+2也为int型，拿byte类型接收所以报错
m+=2;	//正确
```

### &与&&
&&是短路与，若左边表达式错误，则不执行右边表达式，直接判断总表达式为false  
&则是两边的表达式都会执行，最后再判断总表达式的值

### 左移和右移
```java
int m = 70;
int n = 3;
System.out.println(m<<n);   //560
System.out.println(m>>n);   //8
```

m左移n位 = m*2^n  
m右移n位 = m/2^n

**2如何快速得到8？**  
左移2位

### ^ & |
^: 按位异或，两个相同是0 不同是1  
&: 按位与，两个都是1才是1，否则是0  
|: 按位或，两个都是0才是0，否则是1  

例：  
101100&110110 = 100100  
101100|110110 = 111110  
101100^110110 = 011010  

### ? :
三目运算符，布尔表达式?值1:值2  
若布尔表达式值为true，则表达式的值为值1，否则为值2  
例: `a>b?a:b`  
该表达式的值为ab中较大的数

## 随机数
```java
//随机生成一个[0,1)间的double类型的数
System.out.println(Math.random())   
```

生成一个0-9的整数：(int)(Math.random()*10)  
生成一个1-3的整数：(int)(Math.random()*3+1)  
生成一个26-51间的整数：(int)(Math.random()*26+26)  

生成一个m-n间的整数：(int)(Math.random()*(n-m+1)+m)  

## switch-case
```java
switch(key){
    case value1: 执行代码1;
                break;
    case value2: 执行代码2;
                break;
    default: 其他情况执行的代码;
                break;
}
```

key的类型可以是byte short int char String  
switch-case 常用于分支的值是固定的  
if-else 可以比对，判断等等

## 循环
### for循环

```java
for(初始化变量表达式;循环判断条件;变量变化){
    循环表达式;
}
```

以右侧大括号作为标记结束，或者以return;break;continue;为标记结束。

例子：
```java
for(int i=1;i<=100;i++){
    System.out.println(i);
}
```

例：输出1-100间偶数

```java
for(int i=2;i<=100;i+=2) {
	System.out.println(i);
}
```
### while循环

```java
while(布尔表达式){
    循环语句;
}
```

### do-while循环

```java
do{
    循环语句;
}while(循环判断条件)
```

## 数组

### 定义
相同数据类型的集合，有序，内存连续，有固定长度

```java
数据类型[] 数组名 = new 数据类型[数组长度];
数据类型[] 数组名 = {元素1,元素2,元素3,....};
数据类型[] 数组名 = new 数据类型[]{元素1,元素2,元素3,...};
```

```java
int[] arr1 = new int[5];
int[] arr2 = {23,34,35,45,56};
		
// 获取数组长度
System.out.println(arr1.length);
		
// 循环数组
for(int i=0;i<arr1.length;i++) {
	System.out.println(arr1[i]);
}
```

若数组定义时不赋值，则数组中元素为数据类型的默认值。如int数组元素默认值为0，double数组元素默认为0.0

### 栈和堆
java有垃圾回收机制，可以自动回收内存。  

栈：先进后出  
栈一般由系统负责管理，堆一般由程序员负责管理。  

数组定义的左侧声明保存在栈中，右侧new用于在堆中开辟空间。栈中的声明指向堆中开辟的地址。  
new一个数组，即在堆中开辟出一段连续且长度固定的地址。数组首地址即数组的地址。  

### 一个例子
问：定义一个数组，随机存储10个1-100的整数。输入一个数，并判断该数是否存在与数组中。

```java
// 生成数组
int[] arr = new int[10];
for(int i=0;i<arr.length;i++) {
	arr[i] = (int)(Math.random()*100+1);
	System.out.print(arr[i]+" ");
}

Scanner sc = new Scanner(System.in);
System.out.println("输入一个数：");
int num = sc.nextInt();
for(int i=0;i<arr.length;i++) {
	if(num==arr[i]) {
		System.out.println("该数存在在数组中");
		break;
	}else if(i==arr.length-1) {
        // 当数组循环到最后一位还不存在，确定该数不存在
		System.out.println("该数不存在");
	}
}

```

### 冒泡排序
排序过程：
1. 比较第一位与第二位的数，将较大的数排在第二位
2. 比较第二位与第三位的数，将较大的数排在第三位
3. 以此类推，第一次遍历后，数组中最大的数将排在最后一位
4. 重复以上操作，将第二大的数排在倒数第二位
5. 重复以上操作，直到数组中的数排序完

代码：  
```java
//
for(int i=0;i<arr.length;i++) {
	for(int j=0;j<arr.length-1-i;j++) {
		if(arr[j]>arr[j+1]) {
			int temp = arr[j];
			arr[j]=arr[j+1];
			arr[j+1]=temp;
		}
	}
}
```

### 数组比较
```java
int[] arr1 = {1,2,3};
int[] arr2 = {1,2,3};
System.out.println(arr1);	//[I@7637f22
System.out.println(arr2);	//[I@4926097b
System.out.println(arr1==arr2);	//false
```

==符号比较数组的虚地址，虚地址不同，所以结果false。如果两个数组指向同一块内存，则相等。

### 数组排序
```java
//import java.util.Arrays
Arrays.sort(arr);//将数组从小到大排序
```

### 验证码
定义一个数组存储小写字母a-z，大写字母A-Z，以及数字0-9一共62个元素.随机产生由字母或者数字组成的验证码，显示在控制台上

```java
// 存储字母
char[] arr = new char[62];
int i=0;
for(char c='a';c<='z';c++) {
	arr[i] = c;
	i++;
}
for(char c='A';c<='Z';c++) {
	arr[i] = c;
	i++;
}
for(char c='0';c<='9';c++) {
	arr[i] = c;
	i++;
}
// 随机选取4个字符显示在控制台
for(int j=0;j<4;j++) {
	System.out.print(arr[(int)(Math.random()*61)]);
}
```

### 二维数组

```java
数组类型[][] 数组名 = new 数据类型[长度][长度];
数据类型[][] 数组名 = {{数组元素1,数组元素2..},{数组元素3,数组元素4,...}}
```

二维数组相当于数组元素为数组  

**循环二维数组**  

```java
int[][] arr = {{23,34},{45,35,25},{77,88,99,55}};
//循环二维数组
for(int i=0;i<arr.length;i++) {
	for(int j=0;j<arr[i].length;j++) {
		System.out.println(arr[i][j]);
	}
}
```

## DeBug
bug是程序运行时的缺陷，我们写程序时不可能全是对的，当发现输出有误时，我们需要找是哪里出错了。使用debug来调试程序。  

debug步骤：打断点(breakpoint)-->以debug模式运行代码。  

Eclipse中debug快捷键：  
F6: 运行到下一行  
F8: 运行到下一个断点  
F5: 进入当前方法  
F7: 返回调用层
