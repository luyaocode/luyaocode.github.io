**环境：**

- Windows 11
- Ubuntu 18.04

**IDE：**

- Qt 5.14.2
- Visual Studio Community 2022
- Visual Studio Code 1.78.2

**第三方依赖库：**

- FFmpeg 4.5版本的dev, share和static
- SDL2

dev目录：include里面是FFmpeg的头文件(.h文件)，lib里面是适用于win32环境的静态库文件(.lib文件)

<img src="D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-29 110723.png" style="zoom:33%;" />

share目录：里面包含win32环境下的动态库文件(.dll文件)和可执行文件(.exe文件)

<img src="D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-29 110829.png" style="zoom:33%;" />

static目录：里面包含可执行文件(.exe文件)，.dll文件都打包到了.exe文件里面

**问题1：编译失败，无法识别的函数**

![](D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-28 213804.png)

![](D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-28 213846.png)

解决办法：

源文件需要指定C文件的链接约定：

- 当包含C头文件时，需要使用`extern "C"`来指定链接约定，以确保C++编译器正确处理函数名和参数。

<img src="D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-29 104725.png" style="zoom: 33%;" />

如果在VS上使用MSVC编译器进行编译，VS需要进行如下配置：

- 项目>属性>配置属性>VC++目录>包含目录，需要将include的绝对路径添加到包含目录
- 项目>属性>配置属性>VC++目录>库目录，需要将lib的绝对路径添加到库目录
- 项目>属性>链接器>常规>附加库目录，需要将lib的绝对路径添加到附加库目录
- 项目>属性>链接器>输入>附加依赖项，需要将lib目录下的具体.lib文件名称添加到附加依赖项

如果在Qt上使用MinGW编译，Qt需要进行如下配置：

- 选择正确的构建套件的编译器

<img src="D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-29 110258.png" style="zoom: 33%;" />

在Qt工程文件.pro中将头文件include和静态库lib添加到链接选项

<img src="D:\myprojects\luyaocode\md\FFmepg开发环境配置全方位详细介绍（Windows和Linux）\屏幕截图 2023-05-28 213949.png" style="zoom:33%;" />

**问题2：运行失败，找不到.dll文件**

- 需要将share目录下的.dll文件都复制到debug生成的.exe文件的同一目录

**如何在windows下编译FFmpeg库文件？**

- [Windows下编译FFmpeg]: https://zhuanlan.zhihu.com/p/588257350

- [Shift Media Project aims to provide native Windows development libraries for FFmpeg]: https://github.com/ShiftMediaProject/FFmpeg

- [Static Windows (x86_64) and Linux (x86_64) Builds of ffmpeg master and latest release branch.]: https://github.com/BtbN/FFmpeg-Builds

  

**Linux开发环境搭建：**

1. 安装SDL2

   sudo apt install libsdl2-dev

2. 安装FFmpeg

   sudo apt install ffmpeg-dev

3. 配置环境变量

   ```shell
   vim /etc/profile
   ```

   ```
   #环境变量
   #注意"\"表示下一行接在本行之后，"\"后面不能再有空格或制表符等其他符号，否则识别失败
   export PATH=$HOME/bin:\
   /usr/bin:\
   /usr/local/bin:\
   $PATH
   
   export LIBRARY_PATH=$HOME/lib:\
   $HOME/lib64:\
   /usr/lib/x86_64-linux-gnu:\
   /usr/local/lib:\
   $LIBRARY_PATH
   
   export PKG_CONFIG_PATH=$HOME/lib/pkgconfig:\
   $PKG_CONFIG_PATH
   
   export C_INCLUDE_PATH=$HOME/include:\
   $HOME/include/libyasm:\
   /usr/include/openssl:\
   /usr/include/librtmp:\
   /usr/local/include:\
   /usr/include/SDL2:\
   $C_INCLUDE_PATH
   ```

   ```shell
   source /etc/profile
   ```

   $HOME：当前用户的Home目录，例如root用户Home目录是/root，普通用户的Home目录是/home/username

   PATH：指令的路径，一般在各种bin目录下

   LIBRARY_PATH：第三方库文件所在目录，一般是各种lib目录；程序编译过程中，会在这些目录下查找动态库文件（.so文件）和静态库文件（.a文件）

   C_INCLUDE_PATH：各种头文件所在目录，一般是各种include目录；程序编写过程中，IDE会在这些目录下查找头文件

   PKG_CONFIG_PATH：

4. 配置动态库路径

   ```shell
   vim /etc/ld.so.conf
   ```

   ```
   /root/lib
   /root/lib64
   
   include /etc/ld.so.conf.d/*.conf
   ```

   ```shell
   ldconfig
   ```

5. Makefile编写示例：

   ```makefile
   CC = gcc
   CFLAGS = -Wall -Wextra
   LDFLAGS = -lavformat -lavcodec -lavutil -lswscale -lSDL2
   
   TARGET = ffplayer
   
   $(TARGET): ffplayer.c
           $(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)
   
   clean:
           rm -f $(TARGET)
   ```

   - $()：引用上文变量
   - $^：所有源文件
   - $@：所有目标文件
   - -l：要链接的库

6. 其他事项

   - [Ubuntu18.04设置root用户登录]: https://blog.csdn.net/GNNUXXL/article/details/118184657?spm=1001.2014.3001.5506

   - [Ubuntu18.04设置静态ip地址]: https://blog.csdn.net/weixin_56730015/article/details/128694239?spm=1001.2014.3001.5506

**其他相关库：**

- yasm/nasm
- x264
- x265
- libmp3lame
- librtmp

**Linux下编译第三方库的通识：**

- tar -zxvf xxxx.tar.gz：解压到当前目录
- ./config --prefix=$HOME：将生成的库文件放在Home下的相应目录
- make：编译
- make install：安装，将指令放在bin目录，便于直接调用

