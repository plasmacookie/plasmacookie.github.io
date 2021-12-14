---
title: JavaSE（二） 面向对象设计 I
date: 2021-12-14 21:53:19
tags:
- java
- java学习
categories: 技术学习  
description: 用blog记笔记可以随时拿出来复习emm，虽然感觉有什么重要的东西消失了
---
## 面向对象
### 对象
java是面向对象的语言，学习面向对象之前要记住一句话“万物皆对象”。即将世间的万物看成对象，并用java语言去描述它。

### 类
现实中我们将相似的东西归纳为一类，比如人类。java中类是相同属性和方法的集合。  
属性用来描述事物的特征，比如人类有眼睛，有鼻子，有耳朵等。  
方法则描述事物的行为，实现某种特定的功能。比如猫可以跑，可以抓老鼠等。

### 对象和类的区别
对象是具体的存在，而类是抽象的。  
对象是类的具体实现。

### 类和类之间的关系
1. 依赖关系 use a
2. 关联关系 has a
3. 继承（实现）关系 is a

比如人和车是依赖关系，人和眼睛是关联关系，人和动物是继承关系

## 类
### 定义类
```java
[权限修饰符] [修饰符] class 类名{类体}
public Class Book{}
```
权限修饰符例：public 公共的，default 默认， protected 受保护的， private 私有 
修饰符例：abstract，final，static...  
类名首字母大写

### 类的构成
1. 属性（成员变量）
2. 方法
3. 构造方法
4. 内部类
5. 代码块

其中属性，方法，构造方法最为常用。main方法属于第二种。

### 属性
```java
[权限修饰符] [修饰符] 数据类型 属性名 [= 初始值];
public String bookId;
```

属性命名规范同变量，使用驼峰命名法。

### 方法
方法实现某种特定功能。  
main方法实现主程序运行的功能。  

```java
权限修饰符 [修饰符] 返回值类型|void 方法名(参数列表){
    方法体;
    [return [返回值];]
}
```

### 构造方法
```java
// 没有返回值，连void都没有
权限修饰符 类名(){}
```

作用：实例化对象，并赋初始值。

```java
// 无参构造
public Student(){}
```

### 实例化对象
```java
// 声明对象
Student student;
// 加载构造方法，实例化对象
student = new Student();
```

在栈中声明一个虚地址存入student，在堆中开辟空间存放数据，栈中的虚地址指向堆中的内存。  

简写
```java
Student student = new Student();
```

**调用属性**  
```java
对象.属性
student.stuName;
```

**调用方法**
```java
对象.方法
student.say("hello");
int result = student.add(1,2)
```

### 有参构造
一个类默认会有一个无参构造，但当定义有参构造时，会自动覆盖默认的午餐构造，要想用无参构造，必须显式地定义一个无参构造方法。

```java
//有参构造示例
public Student(String stuId,String stuName) {
	this.stuName = stuName;
	this.stuId = stuId;
}
```

this表示当前对象，this.stuName表示对象地属性，stuName表示传来的值。

**有参构造与无参构造区别**  

```java
// 创建一个学号是s001，名字叫小红的学生
Student s1 = new Student();
s1.stuName = "小红";
s1.stuId = "s001";
		
Student s2 = new Student("s001","小红");		
```

有参构造可以给对象属性赋初始值。

### 重载
一个类中，方法名相同，参数不同，系统会根据参数的不同自动调用对应的方法。  
参数不同指：个数，顺序，类型  
和返回值无关，只看参数。

### return

```java
public int add(int a,int b) {
	return a+b;
    // Unreachable code
	// System.out.println("add");
    // return 后代码不会继续执行
}
```

```java
public int judMax(int a,int b) {
    // This method must return a result of type int
    // 当a<=b时，没有返回值
	if(a>b) {
		return a;
	}
}
```

**return,break与continue**  
return是该方法终止执行，在循环中不管多少层都会终止。  
break终止本层循环。  
continue终止本次循环。

## 封装
### 封装的定义  
private 私有，当用于修饰属性时，只允许本类中调用。 

封装即将对象的属性和方法封装成一个类作为载体。类通常隐藏自己的内部结构或者细节，保证类内部的完整性。对外操纵的用户不能轻易地获取内部结构，不能操作数据。  
封装提高了数据安全性。
只能通过类提供的公开工具才能对数据进行操作(setter,getter方法)  

开发中绝大多数类的属性都使用private修饰，体现出类的封装。  

setter和getter方法作用: 对私有属性进行操作(取值 赋值)

### 自定义类型数组
```java
Book[] books = new Book[10];
books[0] = new Book();
...
```

## 包
java中包物理上就是文件夹。  
包的作用：  
1. 防止重名
2. 划分功能
3. 控制权限

包的命名：  
小写的英文字母，以.进行分割，每个被分割的单元只能有一个名词，通常以顶级的域名作为前缀(com net org gov edu cn)，之后接公司名/组织名+项目名字+模块名字。  
例：`com.plasmacookie.shop.controller`  

entity层：实体类层
dao层：数据持久层，用于操作数据，数据的增删改查操作。

## static
### 一个例子
```java
public class Book{
	String bookId;
	bookId = "b001";
	//错误原因:赋值是执行语句，不能写在类中，只能写在方法里。

	String bookId = "b001";
	// 可以这样写，表示给bookId赋默认值。
}
```

### 静态修饰符
static是一个静态修饰符，常用来修饰属性方法和代码块。  
静态区的内存是一块公用的，独立的，一直存在的内存，不会被java的垃圾回收机制清理。  

static修饰的变量是全局变量。  

### 实例块
```java
{
	块代码;
}
```

块中的代码每次实例化都执行一次。

### 静态块
```java
static{
	块代码;
}
```

静态块中的代码只在第一次实例化的时候执行一次。  
静态块在初始化数据时用得较多，且一般修饰一些常量。  
`public static final 常量名`

### 静态属性
```java
public class Book{
	public static String bookId;
	// static修饰的属性一般也用public修饰
}

//在其他类的方法中，要获取bookId
Book.bookId;
```
static修饰的属性可以使用类名直接调用，不需要实例化对象。

### 静态方法
```java
public class Cat{
	public static void run(){
		// static修饰的方法一般也用public修饰
		System.out.println("猫跑起来了哦");
	}
}

// 在其它类的方法中，要调用run方法
Cat.run()
```

static修饰的方法可以使用类名直接调用，不需要实例化对象。  

绝大多数方法都不是使用static修饰，用static修饰虽然调用简单，但是占内存，所以一般只用来修饰特别常用的方法。

## 值传递
### 一个例子
```java
public class Account{
	// 用户名
	private String aName;
	// 密码
	private String aPwd;
	// 电话号码
	private String aPhone;
} 
```

现有需求，需要用户通过输入电话号码登录，登录方法有两种写法  
方法一:  
```java
public Account login(String aName,String aPwd){
	//...登录代码，登录成功返回account，否则返回null
}
```

方法二:
```java
// 参数account封装了需要传递的用户名和密码
public Account login(Account account){

	//...登录代码，登录成功返回account，否则返回null
}
```

**哪种方法比较好**  
两种方法都可以满足当下的需求，但如果添加一个需求“可以使用电话号码和密码进行登录”。方法一则需要单独再次创建一个方法或者增加一个参数，而方法二只需调用getter方法就可获取到电话号码。显然第二种方法是有利于后续拓展功能的。

### 不同数据类型的值传递
```java
// 定义一个方法
public void test(Account account){
	account.setAName("test")
}
public void test(int a){
	a = 12;
}
```

```java
//调用上述方法
Account account = new Account();
实例化对象.test(account);
System.out.println(account.getAName());	//test

int a=1;
实例化对象.test(a);
System.out.println(a);	//1
```

调用引用数据类型，引用数据类型的值会被改变。因为引用数据类型传值传递的是虚地址，是它本身。  
而如果调用基本数据类型，基本数据类型的值则不会被改变，因为基本数据类型传递的是值拷贝，对变量本身不会发生变化。  
**特殊：** String类型和包装器类型，虽然是引用数据类型，但是值传递规则按基本数据类型

## 继承
### 权限修饰符
public protected default private的区别  
public: 所有类都可以使用  
private: 只有本类可以使用  
default: 只在本包中可以使用
protected: 在继承条件下可以跨包使用

### 继承语法
```java
class 子类名 extends 父类名{

}
```

子类可以继承父类的方法以及属性（父类的私有属性方法不可以被继承），java中的继承是单继承。  

作用: 节省代码

### 实例化子类对象
实例化子类对象时，先调用父类的构造方法，然后调用子类的构造方法。

### 重写
override
在继承条件下，子类可以重写父类的方法。方法名，返回值，参数类型等必须相同，权限不能缩小。  

```java
//父类
public class Father{
	public void earnMoney() {
		System.out.println("父亲通过开车赚钱");
	}
}
//子类
public class Son extends Father{
		public void earnMoney() {
		System.out.println("儿子通过打游戏赚钱");
	}
}
//测试类中
Son son = new Son();
son.earnMoney();	// 儿子通过打游戏赚钱
```

### 重写与重载的区别
其实这俩没什么联系，但是面试经常问emm，可能是这俩词因为长得像（  

重写(override)：继承条件下子类可以重写父类的方法  
重载(overload)：一个类中，可以有同名不同参的方法，系统会根据参数的不同，决定执行哪个方法。

### super
```java
public class Son extends Father{
	super();	
	... //其他语句
}
```

super();语句必须在构造方法的第一行，在构造方法中，super()用来调用父类的构造方法。super();中的参数用来决定执行哪个构造方法。  

**super和this**  
this指本对象，super指父类的对象

## Object类
### java.lang.Object
java中所有类都默认继承于Object，Object是所有类的父类（超类，基类）。Object类提供了equals，toString，hashcode，wait等方法

### equals
```java
// Object代码
public boolean equals(Object obj) {
    return (this == obj);
}
```

在Object类中，equals和==没有区别，都用来比较虚地址  

```java
// String代码
// 使用Object类型参数
public boolean equals(Object anObject) {
	// 若虚地址相同，则返回true
    if (this == anObject) {
        return true;
    }
	// 判断anObject是否是String类型
    if (anObject instanceof String) {
		// 将anObject转成String类型
		// 向下造型
        String anotherString = (String)anObject;
		// 对比两个字符串中每一个字符
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

**==和equals区别**  
在Object中==和equals没有区别，都用来比较虚地址；  
在String类型和包装器类型中，因为重写了equals方法，可以比较值

### toString
```java
Account account = new Account();
// com.plasmacookie.shopping.entity.Account@762efe5d
System.out.println(account);
// com.plasmacookie.shopping.entity.Account@762efe5d
System.out.println(account.toString());
```

打印对象时默认调用toString()方法

```java
public String toString() {
	// Object代码
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
}
```  
Object类中 toString()为返回类名+@+hashcode转换成的8位十六进制数

封装的类，一般都会重写toString，可以重写成返回属性

## final
修饰类: final修饰的类不可以被继承。String，Math等类都是用final修饰的。  
修饰成员变量: 一般和public，static一起使用。`public static final 数据类型 变量名 = 值`。 用final修饰的变量不可以被更改。  
修饰方法: final修饰的方法不可以被子类重写
修饰参数: final修饰的参数不可以被更改

## instanceof
instanceof用来判断一个对象是否属于该类型

```java
Dog dog = new Dog();
System.out.println(dog instanceof Dog);	//true

System.out.println("123" instanceof String) //error
// 报错，instanceof只能用于判断子类父类
```

## 多态
封装: 安全性  
继承: 复用性  
多态: 拓展性

### 多态的定义
对外一种表现形式，对内多种实现

```java
父类类型 对象名 = new 子类的构造方法;
Animal animal = new Dog();

//左侧是编译期
Animal animal = null;
//右侧是运行期
animal = new Dog();

animal.run();
```

调用多态对象的方法时，在编译期调用的是父类的方法，因为声明Animal类型。但实际运行时，执行子类方法。

### 多态的好处

```java
// 创建子类父类
public class Animal{
	public void run(){
		System.out.println("Animal run");
	}
}

public class Dog extends Animal{
	public void run(){
		System.out.println("Dog run");
	}
}

```

```java
Animal animal = null;
animal = new Dog();
animal.run();
```

现在看多态似乎很复杂，我要想运行Dog中的run方法，直接创建一个Dog对象调用run()不就行了吗，为什么要添加这么多的多态代码呢？  

现在学习可能看起来用处不大，但是实际开发中，一个项目往往是需要多次拓展的。比如上面的程序，如果修改一个需求，将Dog替换成Cat。  

如果不使用多态的话，我们需要删除掉Dog的逻辑代码，然后重新用Cat写完全部的代码。  

但如果使用多态的话，只需要将`animal = new Dog();`替换成`animal = new Cat();`就可以了。这大大提高了代码的可拓展性。

### 向下造型
```java
public class Cat extends Animal{
	public void run(){
		System.out.println("Cat run");
	}
	//子类独有方法
	public void catchMouse(){
		System.out.println("Cat catch mouse");
	}
}
```

```java
Animal animal = new Cat();
animal.catchMouse();	//error
//The method catchMouse() is undefined for the type Animal
```

因为编译期是Animal类型，而Animal中没有该方法。所以没法调用子类独有的方法。  

要想调用子类独有的方法，需要向下造型。将animal强转成Cat类型。
```java
((Cat)animal).catchMouse();
```

### 多态参数
```java
public void show(Animal animal){
	System.out.println(animal.getClass());
}
```

```java
Animal animal = new Cat();
Dog dog = new Dog();
animal.show(animal); //Class Cat
animal.show(dog);	 //Class Dog
```

参数是Animal类型，但实际传递的是参数的子类类型。

### Object类型参数
```java
Object obj = new Animal();
```

理论上所有类的声明都可以使用上述格式，但一般没人这么写。因为上述方法要想使用类独有的方法都需要向下造型。

```java
public void test(Object obj){
	System.out.println(obj.getClass());
}
```

```java
test("aa");				//class java.lang.String
test(new Dog());		//class Dog
test(new int[10]);		//class [I
test(1);				//class java.lang.Integer
test(new Object[10]);	//class [Ljava.lang.Object;
```

Object类型兼容所有类型，包括Object数组。
使用Object类型作为参数，可以传递所有类型的参数。  
使用Object类型的数组，可以存储任何类型。  

equals方法使用Object参数。
