---
title: JavaSE（三） 面向对象II
date: 2021-12-16 14:05:13
tags:
- java
- java学习
categories: 学习笔记
description: 单独创了个分类专门做笔记。一边复习一边感叹自己忘掉的好多啊，像是接口中的属性只能是常量，BigDecimal用于解决精度丢失等等..._(´ཀ`」∠)_ 
---

## 抽象类
### 定义
使用abstract修饰的类是抽象类。  
例：

```java
public abstract class Graph{

}
```

abstract可以用来修饰类和方法，修饰方法时，该方法是抽象方法。  

抽象类中可以有抽象方法，但有抽象方法的类一定是抽象类。

### 抽象类的使用

```java
Graph g = new Graph();  //error
// Cannot instantiate the type Graph
```

抽象类有构造方法，但不能被实例化。  

**问1：抽象类的构造方法是用来做什么的？**  
**问2：抽象类不能被实例化，要怎么使用它？**  

抽象类不能被实例化，只能作为模板被继承。  
抽象类的抽象方法的作用是为子类实例化

```java
public class Circle extends Graph{

}
```

### 抽象方法
抽象类可以有抽象方法。使用abstract修饰的方法。没有方法体。  
抽象方法不实现具体功能。

继承抽象类的子类必须实现抽象类里的抽象方法

### 多态写法
```java
Graph graph = new Circle();
// 调用属性
System.out.println(graph.name);
// 调用方法
System.out.println(graph.sumArea());
System.out.println(graph.sumLength());
```

编译期调用父类的抽象方法，实际运行子类重写的方法。

## 接口
现实中USB接口 HDMI接口...  
**有什么共同点？**
### 定义
```java
public interface 接口名 [extends 接口列表]{}
```

```java
public interface Usb{
    // 属性
    private double width; //error
    //Illegal modifier for the interface field USB.width; only public, static & final are permitted

    public static final double WIDTH = 2; //true 
    double LENGTH = 3;  // true

    // 方法
    public void test(){} //error
    //Abstract methods do not specify a body

    public abstract void charge();    //true 
    String read();  //true
}
```

接口定义了一种规范，规则。

### 属性
接口中的属性必须是常量。java中常量使用 public static final修饰。  
常量命名规则： 所有字母大写，多个单词使用_连接`USB_LENGTH`  
接口中的属性，不写修饰符时，默认也是public static final修饰的。

### 方法
接口中的方法必须是抽象方法。使用public abstract修饰。  
接口中的方法，不写修饰符时，默认也是public abstract修饰的。

### 构造方法
接口中，没有构造方法。不能实例化。

### 接口的实现
```java
class 类名 implements 接口列表
```

一个类可以实现多个接口

```java
public class Computer implements USB{
    //...重写接口的抽象方法
}
```

```java
// 声明一个USB接口类型的对象
USB usb;

// 创建一个USB类型的对象
usb = new Computer();

usb.charge();
```
在编译期是接口类型，调用的是接口中的抽象方法。运行期调用实现类中重写的的方法。（就是多态）

### 类实现多个接口

```java
public interface Hdmi{
    ...
}
```

```java
public class Computer implements USB,Hdmi{
    //...重写两个接口中的所有方法
}
```

### 接口的作用
解耦。  
学习软件工程时经常听到“高内聚低耦合，强内聚弱耦合”。  
耦合度越低越好，因为耦合度越低，互相的关联越少，替换起来就越方便，维护拓展起来方便。

### 开闭原则
java中的开闭原则：  
对拓展时开放的，对修改是关闭的。

例如创建许多基于接口的实现类，客户想用哪个用哪个，替换方便。  
好处：对后期拓展维护方便  
坏处：实现类太多可能多余

### 接口类型参数
其实就是多态参数  

```java
public void test(USB usb) {
	System.out.println(usb.read());
}
```

```java
USB usb = null;
usb = new Computer();
test(usb);
```

### 接口和抽象类的区别
1. 从属性的角度
   1. 抽象类没有要求
   2. 接口要求必须是常量(public static final修饰)
2. 从方法的角度
   1. 抽象类可以有抽象方法或者其他方法，但有抽象方法的类一定是抽象类
   2. 接口中的方法都是抽象方法(pulic abstract修饰)。但从jdk1.8后，接口中可以有静态方法(public static修饰)
3. 从构造方法的角度
   1. 抽象类有构造方法，但是不能实例化，构造方法只为子类实例化用
   2. 接口没有构造方法，只能通过实现类实现接口
4. 从继承角度
   1. 子类只能继承一个抽象类（单继承）
   2. 子类可以实现多个接口（多实现）

## String
### 创建String对象
```java
String str1 = "hello world";
String str2 = new String("hello world");
String str3 = "hello world";
String str4 = new String("hello world");
		
System.out.println(str1==str2);	//false
System.out.println(str1==str3);	//true
System.out.println(str2==str4);	//false
```

### =和new的区别
使用new创建String对象和数组以及其他对象一样，都是在栈中声明，堆中开辟空间。所以每次创建出的对象的地址都是不同的。  
使用=创建String对象，则是在常量池中开辟空间。上例中，当使用=时，先去常量池中找"hello world"字符串，如果有，直接存储该对象的地址。如果没有，则在常量池中创建该对象，然后存储。

### 不可变性
为了方便对比，我们先来看一个例子
```java
//新建一个test类
public class Test {
	public int test;
}
```

测试代码
```java
Test test1 = new Test();
Test test2 = test1;
System.out.println(test1.test); //0
System.out.println(test2.test); //0
test2.test=1;
System.out.println(test1.test); //1
```

test2存入test1的地址，之后修改test2的test属性为1后，test1的test属性也更改为1.这很好理解，因为两者地址相同，即地址指向的内存是相同的，所以当值修改后，会同时影响到两者。

```java
String str1 = "hello world";
String str2 = str1;
str1 = "hello";
System.out.println(str2);   //hello world
```

而在String类中，我们修改str1的值，并不会影响到str2。  
当执行`str1="hello"` 时，常量池中的"hello world"不会发生变化，str1会在常量池中寻找或者创建hello对象，对于原来的字符串hello world不发生改变

**String和StringBuffer区别**  
String不可变，StringBuffer可变。不可变是指，在常量池创建的对象不会被改变。

### StringBuffer
```java
StringBuffer s1 = new StringBuffer("test");
StringBuffer s2 = s1;
s2.append("123");
System.out.println(s1); //test123
```

### String常用方法
有不懂的或者遇见没见过的就去查api，这里列出来主要是方便复习

```java
//String常用方法
String str = "Hello World";
//equals 比较字符串是否相等
System.out.println(str.equals("")); //false
// 忽略大小写比较
System.out.println(str.equalsIgnoreCase("HELLO WORLD"));    //true
//所有字母变大写
System.out.println(str.toUpperCase());  //HELLO WORLD
//所有字母变小写
System.out.println(str.toLowerCase());  //hello world
//返回对应位置的字符 下标从0开始
System.out.println(str.charAt(0));  //H
// 字符串拼接 concat只能字符串与字符串拼接效率高 +可以和null拼接
System.out.println(str.concat("and"));  //Hello Worldand
// 是否包含字串
System.out.println(str.contains("or")); //true
//是否以字串结尾
System.out.println(str.endsWith("ld")); //true
//是否以字串开始
System.out.println(str.startsWith("Hel")); //true
//字串或字符第一次出现的位置，下标从0开始，没有返回-1
System.out.println(str.indexOf("He"));  //0
//字符或字串最后一次出现的位置
System.out.println(str.lastIndexOf('l'));   //9
// 判断是否是空字符串
System.out.println(str.isEmpty());  //false
// 获取字符串的长度
System.out.println(str.length());   //11
// 替换字符或子串
System.out.println(str.replace('l', 'q')); //Heqqo Worqd
// 去首位空格
System.out.println("  hell o ".trim()); //hell o

//字符串的截取
// 截取从下标2到最后，包括下标2
System.out.println(str.substring(2));	//llo World
// 截取从2到7，包括2，不包括7
System.out.println(str.substring(2,7));	//llo W

//split 拆分
//字母l作为拆分
String[] arr = str.split("l");
for(int i=0;i<arr.length;i++) {
	System.out.println(arr[i]);	//{"He","","O Wor","d"}
}
```

### StringBuffer常用方法
以前没有框架的时候，常用StringBuffer拼SQL指令。因为用String拼太占内存。

```java
StringBuffer ss = new StringBuffer("hello world");
// 字符串长度
System.out.println(ss.length());	//11
// 字符串容量	
System.out.println(ss.capacity());	//27
//末尾添加字符串
ss.append("test");
System.out.println(ss); //hello worldtest
//删除字串[2,7)
ss.delete(2, 7);
System.out.println(ss); //heorldtest
//删除字符
ss.deleteCharAt(1);
System.out.println(ss);	//horldtest
//在索引位置插入字串
ss.insert(2,"SS");
System.out.println(ss);	//hoSSrldtest
// 把StringBuffer对象转换成String类型
System.out.println(ss.toString());
```

### 字符串练习
1. 已知一个11位的电话号码，获取手机号的后四位
2. 隐藏改手机号的中间四位，用*顶替
3. 获取一个文件的后缀。例：jdk1.8环境变量配置.docx 获取docx

```java
String tel = "13811112222";
System.out.println(tel.substring(7));	//2222
System.out.println(tel.substring(0, 3)+"****"+tel.substring(7));    //138xxxx2222
String fileName = "jdk1.8环境变量配置.docx";
String[] arr = fileName.split("\\.");
System.out.println(arr[arr.length-1]);  //docx
```

## 异常 Exception
常见的几种异常  
输入异常`InputMismatchException`  
数组越界异常`ArrayIndexOutOfBoundsException`  
空指针异常`NullPointerException`  
...

### Throwable
Throwable有两个子类
1. Exception 异常
2. Error 错误

**异常和错误的区别**  
异常不是错误，而是程序的不足。是可以弥补或者处理的。不影响程序的继续执行。  
错误是不可弥补或处理的。如编写错误，内存溢出等。

### Exception
Exception是所有异常的父类。  
系统中的异常分两类，编译期异常以及运行期异常。  
系统内定义了许多异常，如输入异常，数组越界异常，空指针异常，算数异常等等。  

### try-catch-finally
```java
try{
    可能出现异常的代码;
}catch(异常的类型 参数){
    处理异常的代码;
}catch(异常的类型 参数){
    处理遗产的代码;
}finally{
    最终执行代码;
}
```

一个例子
```java
Scanner sc = new Scanner(System.in);
System.out.println("请输入一个数字");
String s = null;
try {
	// 出现异常后的代码不会继续执行
	int input = sc.nextInt();
	if(input==1) {
		s.toLowerCase();
	}
	System.out.println("没有出现异常");
}catch(InputMismatchException e) {
	System.out.println("出现输入异常");;
}catch(NullPointerException e) {
	System.out.println("出现空指针异常");
}finally {
	System.out.println("不管是否出现异常都会执行");
}
System.out.println("不在try-catch-finally中");
```

写代码时，只把可能出现异常的代码放在代码块中，因为代码块中的代码在遇到异常后不会继续执行。  
可以使用Exception接收所有异常，但开发中一般不那么做。因为实际开发中需要通过判断异常类型执行不同的操作。  
但如果使用Exception的话，一定要将它放在所有catch的最后面，不然它之后所有的catch都不会执行。

### finally与return
看到上面的代码，我们发现finally中的代码，就算写在代码块外面也会执行。那么finally的作用是什么呢？  

```java
public int div(int a,int b) {
	int result = 0;
	try {
		result = a/b;
		System.out.println("运算正常，输出结果: "+result);
		return result;
	}catch(ArithmeticException e) {
		System.out.println("出现算数异常，返回-1");
		return -1;
	}finally {
		System.out.println("最终执行");
	}
}
```

我们知道，return之后的代码都不会执行，但在这里调用一下该方法。

```java
div(20,5);
/*
运算正常，输出结果: 4
最终执行
*/

div(0,0);
/*
出现算数异常，返回-1
最终执行
*/
```

可以看到，不管是否发生异常，finally中的代码都会在return之前执行。如果将最终执行代码写在代码块外面呢？

```java
System.out.println("代码块外，最终执行"); // error
// Unreachable code
```

而写在代码块外的代码则会报无法到达错误。

### 自定义异常
一般不会让人自己定义异常，但还是需要了解一下。  

所有异常都继承于Exception，我们自定义的时候也要继承。

```java
class 异常名 extends Exception{

}
```

**一个例子**

```java
/*
    自定义分数过大异常
*/ 
class MaxException extends Exception{
    public MaxException(String msg){
        super(msg);
    }
}
```

```java
/*
    定义输入分数方法，并抛出异常
*/

// 当方法体中抛出异常时，方法头也要抛出异常
public void judScore() throws MaxException{
    Scanner sc = new Scanner(System.in);
	System.out.println("请输入学生分数");
	int score = sc.nextInt();
	if(score>100) {
		MaxException maxException = new MaxException("分数过大异常");
		// 输入的分数超过100时，抛出异常
		throw maxException;
	}
}
```

```java
// 调用抛出异常的方法
try{
    judScore();
}catch(MaxException e){
    e.printStackTrace();
}
```

```txt
//控制台
请输入学生分数
101
MaxException: 分数过大异常
```

使用throw在方法体中抛出异常，一次抛一个  
使用throws在方法头中抛出异常列表，`throws 异常1,异常2...`  

当调用抛出异常的方法时，有两种解决方法，一种是使用try-catch在调用的时候处理掉异常。另一种是如果无法处理异常，则继续在方法头抛出异常列表，直到异常被处理。

Eclipse中try-catch快捷键：alt+shift+z

## UUID
我们自己写项目的时候，数据库的主键可能需要自己设置，比如订单表的主键可能设置成`order001`之类的。但实际开发中，有两种常用的方式。  
一种是使用自然数递增，比如Oracle中的序列以及MySQL中的自动递增。还要一种则是使用UUID。

```java
//import java.util.UUID;
UUID uuid = UUID.randomUUID();
// 转换成字符串
System.out.println(uuid.toString());
// 去掉 - 
System.out.println(uuid.toString().replace("-",""));
```
## 常用工具类
### Math
java.util.Math

```java
//返回[0,1)的double类型的随机数
System.out.println(Math.random());
//常量
System.out.println(Math.PI);
System.out.println(Math.E);

//绝对值
System.out.println(Math.abs(-1));
//开方
System.out.println(Math.sqrt(16));
//幂
System.out.println(Math.pow(3, 4));
// 四舍五入
System.out.println(Math.round(12.64));
//向下取整
System.out.println(Math.floor(12.64));
//向上取整
System.out.println(Math.ceil(12.11));
```

### Random
java.util.Random

```java
// import java.util.Random;
Random random = new Random();
//int类型随机数
System.out.println(random.nextInt());
//分布int值介于[0,指定值)
//[0,10]
System.out.println(random.nextInt(11));
		
//种子
//种子相同产生相同随机数
Random random1 = new Random(2);
Random random2 = new Random(2);
System.out.println(random1.nextDouble());   //0.7311469360199058
System.out.println(random2.nextDouble());   //0.7311469360199058
```

### Date
java.util.Date  
java.text.SimpleDateFormat

```java
//import java.text.ParseException;
//import java.text.SimpleDateFormat;
//import java.util.Date;

// date
Date date = new Date();
System.out.println(date);   // Thu Dec 16 10:21:37 CST 2021

//工具类
String pattern = "yyyy/MM/dd hh:mm:ss SSS";
SimpleDateFormat sdf = new SimpleDateFormat(pattern);

//Date转String
String str = sdf.format(new Date);
System.out.println(str);

//String转Date
try {
	Date d = sdf.parse("2021/12/16 10:39:27 990
");
	System.out.println(d);
} catch (ParseException e) {
	// TODO Auto-generated catch block
	e.printStackTrace();
}
```

### LocalDate、LocalDateTime、LocalTime
java.util.Date正在逐渐被淘汰，取而代之的则是java.time.LocalDate和java.time.LocalDateTime

```java
//import java.time.LocalDate;
LocalDate date = LocalDate.now(); // 2021-12-16
System.out.println(date);	//没有时分秒
System.out.println(date.getYear()); //获取年
System.out.println(date.getMonthValue()); //DECEMBER
System.out.println(date.getMonth()); //12

//String转LocalDate
//默认只能转换yyyy-MM-dd格式，否则运行时会报异常
LocalDate date1 = LocalDate.parse("2021-09-17");

//String转LocalDate
String str = date1.toString();
```

```java
//import java.time.LocalDateTime;
// 获取当前时间
LocalDateTime dateTime = LocalDateTime.now();
// 2021-12-16T10:55:21.395419800
System.out.println(dateTime.toString());
System.out.println(dateTime.toString().replace("T", " "));
		
// 预设值
dateTime = LocalDateTime.of(2021, 12, 16, 10, 57, 46);
System.out.println(dateTime.toString().replace("T", " "));
		
//String转LocalDateTime
//只能转yyyy-MM-ddThh:mm:ss格式，否则运行时会报异常
dateTime = LocalDateTime.parse("2021-12-16T10:57:46");
System.out.println(dateTime);
```

因为上述两个类只能转特定格式的日期字符串，很不方便，因此引入一个工具类

```java
//import java.time.format.DateTimeFormatter;

String pattern = "yyyy/MM/dd";
DateTimeFormatter dtf = DateTimeFormatter.ofPattern(pattern);
// LocalDateTime转特定格式字符串
LocalDateTime dateTime = LocalDateTime.now();
String str1 = dateTime.format(dtf);
System.out.println(str1);
```

### Calendar
java.util.Calendar;
是抽象类，因此不能new

```java
// import java.util.Calendar;
// import java.util.Date;
Calendar c = Calendar.getInstance();
//设置单个属性
c.set(Calendar.YEAR, 2021);
// 月份0-11表示1-12月
c.set(Calendar.MONTH, 11);
c.set(Calendar.DAY_OF_MONTH, 16);

//设置一堆属性
//年月日时分秒
c.set(2021, 11, 16, 11, 25);

// 转Date
Date date = c.getTime();
// Thu Dec 16 11:25:33 CST 2021
System.out.println(date);
```

## 包装器类
java中有8个包装器类，分别将8个基本数据类型变成引用数据类型

|基本数据类型|包装器类型|
|---|---|
|byte|Byte|
|short|Short|
|int|Integer|
|long|Long|
|float|Float|
|double|Double|
|char|Character|
|boolean|Boolean|


```java
//利用构造方法创造对象
//不推荐
Integer num1 = new Integer(1);
Integer num2 = new Integer("123");
System.out.println(num2+1);	//124
		
//装箱
//基本数据类型装箱成包装器类型
Integer num3 = 1;
		
//拆箱
//包装器类型拆箱成基本数据类型
int num4 = num3;

//比较值
Integer num5 = new Integer(1);
Integer num6 = new Integer(1);
Integer num7 = 1;
Integer num8 = 1;
System.out.println(num5==num6);			//false
System.out.println(num5.equals(num6));	//true
System.out.println(num7==num8);			//true

```

创建包装器类对象时，使用new与使用=的不同，和String类型一致。使用new时会在栈中存入虚地址，在堆中开辟空间。使用=时，如果在[-128,127]中，会将数据存入常量池。若超出此范围，则重新创建新对象。

```java
Integer num10 = 128;
Integer num11 = 128;
System.out.println(num10==num11);	//false
```


常用的方法

```java
System.out.println(Integer.max(3,4));
System.out.println(Integer.min(3,4));
System.out.println(Integer.sum(1,2));
		
//String转int,String转double
int s1 = Integer.parseInt("123");
double s2 = Double.parseDouble("123.45");
		
//int转String
String str1 = Double.toString(1247.5);
String str2 = Integer.toString(123456789);
		
```