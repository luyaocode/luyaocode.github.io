---
layout: post
title: "Eclipse:The selection cannot be launched，and there are no recent launches"
date: 2020-02-09
---
今天运行该段java程序时，Eclipse报错：
The selection cannot be launched，and there are no recent launches
<code>
public class Stu {
	int id;
	int name;
	int age;
	int gender;	
	void study() {
		System.out.println("我在认真学习！");
	}
	void play() {
		System.out.println("我在玩游戏！");
	}	
	public static void mian(String[] args) {
		Stu stu=new Stu();
		stu.play();		
	}
}
</code>
经过百度，参考博客https://www.cnblogs.com/ranter/p/6537621.html，发现源代码12行main单词拼错了，改正后正常运行。