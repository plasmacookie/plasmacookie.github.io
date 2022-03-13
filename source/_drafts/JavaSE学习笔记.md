---
title: JavaSE学习笔记
tags:
- java
- javase
- java学习
categories:
- 学习笔记
- JavaSE
description: 复习了下JavaSE知识，整理了一下之前记录的笔记
---
# 初识Java
## JDK、JRE与JVM
JDK: java开发工具，提供给开发人员使用，它包含JRE与JVM  
JRE: java运行时环境，提供给需要运行java程序的用户使用，它包含JVM  
JVM: java虚拟机
## Java程序运行过程
源文件.java经过javac指令编译成字节码文件.class，再经过不同平台的jvm编译成不同的机器码实现跨平台运行
# 结构化程序设计
## main函数
主程序的入口
```java
public static void main(String[] args){

}
```

## 命名规则
### 通用规则
1. 由字母数字$_组成
2. 不能是关键字

### 类名
```java
class 类名{}
```
1. 应为名词
2. 首字母大写
3. 使用驼峰命名法
4. 每个单词拼写完整，不用简称缩写，除非缩写比全称更常使用，如URL，HTML等

### 方法名
```java
[修饰符] 返回值 方法名([参数1,参数2...]){}
```
1. 应为动词或动词词组
2. 首字母小写
3. 使用驼峰命名法

### 变量名
```java
[修饰符] [数据类型] 变量名;
```
1. 首字母小写
2. 使用驼峰命名
3. 简洁易懂，但尽量避免使用单字母
4. 临时变量可以使用单字母，整数型一般使用ijkmn，字符型一般使用cde

### 常量名
```java
public static final [数据类型] 常量名;
```
1. 所有字母大写
2. 多个单词使用_隔开
3. 可以使用数字，但不能是首字符

## 基本数据类型
### 分类
java数据类型: 两种
1. 基本数据类型
2. 引用数据类型

基本数据类型：4种，8个
1. 整型 byte short int long
2. 浮点型 float double
3. 字符型 char
4. 布尔类型 boolean

### 整数型
1. byte 8位(1byte = 8bit) [-128,127] 一位符号位
2. short 16位 [-2^15,2^15-1]
3. int 32位 [-2^31,2^31-1]
4. long 64位

**java中整数默认int类型**

### 浮点型
1. float 32位，单精度浮点数，1位符号位，8位指数，23位有效尾数
2. double 64位，双精度浮点数，1位符号位，11位指数,52位有效尾数

**java中浮点数默认double类型**

### 字符型
1. char 16位，可以存一个字符，包括汉字

### 布尔类型
1. boolean类型 1位 默认false

## 数据类型的转换
### 变量的定义
```java
// 变量的定义包括声明和赋值两部分
// 声明
数据类型 变量名;

// 赋值
变量名 = 值;

// 简写
数据类型 变量名 = 值;
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

### 自动提升
基本数据类型自动转换的优先级，由高到低：  
double float long int short byte  
在运算中，低优先级的数据类型可以自动转换成高优先级的数据类型。  
```java
// int类型数据自动转换成double类型
int i = 1;
double d = i;   //d = 1.0

// char类型数据自动转换成int类型(ascii码)
char a = 'a';
int i2 = a;     //i2 = 97

// double类型不能转成int类型
int i3 = 1.0    //error

// byte
// Type mismatch: cannot convert from int to byte
byte b = 1;
b = b + 1;  //error
// b+1是int类型，却用byte类型接收

//上述运算的解决方法
// 使用+=
b+=1;

// 使用++
b++;
```

### 强制转换
高优先度的数据类型转换成低优先度的数据类型可以强制类型转换
```java
//double类型强制转换成int类型
int intNum = (int)1.234;    // intNum = 1
// 舍弃小数点后的数字

// 将int强制转换成chat类型 ascii码
int m = 97;
char a = (char)m;   // a = 'a'
```

## 运算符
### 运算符类型
算术运算符：+	-	*	/	%	++	--

赋值运算符：=	+=	-=	*=	/=

比较运算符：==	>	<	>=	<=	!=

逻辑运算符：& | ! && ||

位运算符：	<<	>>	^	& | !

三目运算符：布尔表达式?值1:值2

### &与&&区别
1. &&是短路与，若左边表达式错误，则不执行右边表达式，直接判断总表达式错误。
2. ||是短路或，若左边表达式正确，则不执行右边表达式，直接判断总表达式正确。
3. &与|在左右两边表达式都执行后才判断总表达式的值

### 左移与右移
```java
int m = 70;
int n = 3;
System.out.println(m<<n);   //560
System.out.println(m>>n);   //8
```
m<<n = m*2^n  
m>>n = m/2^n

### ^ & |
1. ^:按位异或，两位相同是0，不同是1
2. &:按位与，两位都是1才是1，否则是0
3. |:按位或，两个都是0才是0，否则是1

例:  
101100&110110 = 100100  
101100 | 110110 = 111110  
101100^110110 = 011010  

## 分支结构
### if-else
emmm，很简单就不写了，直接做个练习吧。  
```txt
石头剪刀布游戏
随机生成1.石头2.剪刀3.布
输入石头剪刀布，和电脑比对显示输赢
```

程序代码：
```java
import java.util.Scanner;

public class Test {
	public static void main(String[] args) {
		System.out.println("输入1.石头2.剪刀3.布");
		Scanner sc = new Scanner(System.in);
		int input = sc.nextInt();
		int random = (int)(Math.random()*3+1);
		System.out.println("电脑出"+random);
		if(input-random==-1||input-random==2) {
			System.out.println("您胜利了");
		}else if(input-random==0) {
			System.out.println("平局");
		}else {
			System.out.println("您输了");
		}
	}
}
```
### switch case
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
if-else 使用布尔表达式作为条件

## 循环结构
### for循环

```java
for(初始化变量表达式;循环判断条件;变量变化){
    循环表达式;
}
```

以右侧大括号作为标记结束，或者以return;break;continue;为标记结束。

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

int[] arr1 = new int[5];
int[] arr2 = {23,34,35,45,56};
```
若数组定义时不赋值，则数组中每一个元素都为数据类型的默认值。如int类型数组元素默认为0，double类型数组元素默认为0.0。  

数组定义的左侧声明保存在栈中，右侧new用于在堆中开辟空间。栈中的声明指向堆中开辟的地址。  
new一个数组，即在堆中开辟出一段连续且长度固定的地址。数组首地址即数组的地址。

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

# 面向对象程序设计
## 面向对象的定义
### 对象
“万物皆对象”，即将世间万物看成对象，并用java语言去描述它。

### 类
1. 现实中我们将相似的东西归纳为一类，比如人类。
2. java中，类是相同属性和方法的集合
3. 属性用来描述事物的特征，比如人类有眼睛，鼻子，耳朵等。
4. 方法则描述事物的行为，实现某种特定的功能。比如猫可以跑，可以抓老鼠等。

### 对象和类的区别
对象是具体的存在，而类是抽象的。  
对象是类的具体实现。

### 类和类之间的关系
1. 依赖关系 use a
2. 关联关系 has a
3. 继承关系 is a

比如人和车是依赖关系，人和车是关联关系，人和动物是继承关系

## 类
### 类的定义
```java
[权限修饰符][修饰符] class 类名{类体}
public class Book{}
```
权限修饰符: public，protected，private  
修饰符: abstract，final，static

### 类的构成
1. 属性(成员变量)
2. 方法
3. 构造方法
4. 内部类
5. 代码块

其中属性，方法，构造方法使用最多

### 属性
```java
[权限修饰符][修饰符] 数据类型 属性名[= 初始值];
public String bookId;
```

### 方法
类中方法用来实现某种特定功能。  
如main方法实现主程序运行的功能。
```java
[权限修饰符][修饰符] 返回值类型|void 方法名(参数列表){
	方法体;
	[return [返回值];]
}
```

### 方法重载
在一个类中，方法名相同，但参数不同的方法，系统会根据参数的不同自动调用对应的方法。  
参数不同指：个数，顺序，类型  
与返回值无关，只看参数


### 构造方法
类中构造方法用于实例化对象，并赋初始值。
```java
// 无参构造
权限修饰符 类名(){}
public Book(){}
```

一个类默认会有一个无参构造，但当定义有参构造时，会自动覆盖默认的无参构造，此时要想使用无参构造，必须显式地定义一个无参构造。
```java
// 有参构造示例
public Book(String bookId){
	this.bookId = bookId;
}
```
1. this表示当前对象
2. this.bookId表示对象地属性
3. bookId是传来的值

有参构造可以给对象属性赋初始值

### 代码块
```java
class Book{
	{
		块代码;
	}
}
```
块中的代码每次实例化都执行一次。

**例子**
```java
class Book{
	String bookId;
	bookId = "001";	//error
	// 错误原因: 赋值语句是执行语句，不能直接写在类中

	// 解决方法:
	String bookId = "001";

	// or 使用代码块
	String bookId;
	{
		bookId = "001";
	}
}
```


## 封装
封装，即将对象的属性和方法封装成一个类作为载体。类通常隐藏自己的内部结构或者细节，保证类内部的完整性。对外操纵的用户不能轻易地获取内部结构，不能直接操作数据。只能通过类提供的公开工具才能对数据进行操作。  

开发中绝大多数类的属性都使用权限修饰符private修饰，体现出类的封装。  

private 私有，当用于修饰属性时，只允许本类中调用。  

用户可以通过setter与getter方法方法对私有属性进行取值，赋值操作。

## 包
java中包，物理上其实就是文件夹，主要作用为:
1. 防止重名
2. 划分功能
3. 控制权限

包的命名:  
部分之间以.进行分割，每个部分只能有一个名词且全为小写，通常以顶级的域名作为前缀(com net org gov edu cn...)，之后接公司名/组织名+项目名字+模块名字。  
例: `com.plasmacookie.shop.controller`

## 修饰符
### 权限修饰符
1. public: 用public修饰的成员在所有类中都可以访问到
2. private: 用private修饰的成员只有本类可以访问到
3. default: 不使用权限修饰符时，只允许在本包中访问
4. protected: 用protected修饰的成员可以在本包中使用，也可以被不同包的子类访问

|权限修饰符|同一个类|同一个包|不同包的子类|不同包的非子类|
|:-:|:-:|:-:|:-:|:-:|
|private|√||||
|default|√|√||||
|protected|√|√|√||
|public|√|√|√|√|

### static


## 继承
## 多态
## 抽象类
## 接口
## Object类

# 集合框架
# I/O流与文件
# 线程
# 反射
# 常用类与方法
# 常问面试题