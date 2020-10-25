---
layout: post
title: "Windows 10에서 php & apache 설치 및 설정하기"
subtitle: 'About Install php with apache in windows 10'
author: "JongMin-Lee"
header-style: text
header-mask: 0.3
comments: true
catalog:  true
tags:
  - php
  - apache
  - windows
---

<br />

Windows 10 환경에서 php를 사용하기 위해 흔히 **APM(Apache, PHP, Mysql)** 중 Apache와 php를 설치 하여 구동까지 해보도록 하겠습니다.  

<br />

## Install

### Apache

먼저 [Apache Lounge](https://www.apachelounge.com/download/)에서 Apache copy를 다운로드 받습니다.  
<img src = "https://user-images.githubusercontent.com/48028667/97100221-8975ab00-16d4-11eb-83c8-3187224c791c.PNG">

저는 64bit 이기 때문에 [httpd-2.4.46-win64-VS16.zip](https://www.apachelounge.com/download/VS16/binaries/httpd-2.4.46-win64-VS16.zip)을 다운 받았습니다. Apache를 다운 받고 폴더를 원하는 위치에 옮겨 줍니다.  
폴더를 옮길 때 위치시키면 안되는 위치가 존재 합니다.  
- `Program Files` Folder
- `User` Folder
- `AppData` Folder
저는 `C:\Apache24`에 위치 시켰습니다.  

다운로드과 완료되었다면 적절한 [Visual Studio redist]("https://aka.ms/vs/16/release/VC_redist.x64.exe)를 다운 받아 줍니다.  
> VC_redist는 Microsoft사에서 배포하는 Visual C++ 재배포 가능 패키지 입니다. 보통 Miscrosoft Visual Studio로 컴파일 된 Windows 응용 프로그램을 지원하는 런타임 구성요소 입니다. 

<br />

### PHP

**Apache** 설치가 완료되었다면, [Windows PHP](https://windows.php.net/download/)에서 **php**를 설치해 줍니다. 버전이 여러 종류가 있지만 저는 최신 버전을 설치해 주도록 하겠습니다.  

<img src="https://user-images.githubusercontent.com/48028667/97100222-8aa6d800-16d4-11eb-8b1d-85ac7fa2aab9.PNG">

**7.4 version Thread Safe** PHP를 설치해 주었습니다.(Apache와 사용을 위해 **Thread Safe**한 버전을 다운 받아야 합니다.)  다운이 완료되었다면 Aapache와 마찬가지로 폴더를 원하는 위치에 옮겨 줍니다. 저는 역시 `C:\php-7.4.11`에 옮겨 주었습니다.  

<br />

## Configuration

### Aapache

Apache를 설치한 폴더에 들어가 설치를 확인해 보겠습니다. 저의 경우 `C:\Apache24\bin\httpd.exe`를 실행시켜 보았습니다. **Console**창이 열린 후 **localhost** 혹은 **127.0.0.1**로 브라우저를 통해 접속한다면 **It works!**라는 글을 만날 수 있을 것 입니다.  
그렇다면 **It works!**는 어디에 작성되어 있는 것일까요?? Apache의 default Document Root는 **htdocs** 입니다. `C:\Apache24\htdocs`에 들어가보면 **index.html**에 **It works!**가 작성되어 있는걸 보실 수 있습니다.  

### PHP

PHP를 설치한 `C:\php-7.4.11`에 보면 두 가지의 설정 파일이 존재 합니다. **php.ini-development**와 **php.ini-production** 입니다. 이름에서 알 수 있듯 하나는 개발, 하나는 상용으로 사용하기위한 설정 입니다. 둘 중 원하는 것을 하나 복사하며 **php.ini**로 이름을 바꿔줍니다. 이렇게 하면 PHP의 기본적인 설정은 끝납니다. PHP는 기본적으로 설정이 되어 있어 추가적인 모듈을 사용하는 것이 아니라면 따로 설정해 줄 것이 없습니다. 추가적인 설정은 **php.ini**에서 해주시면 됩니다.  
그 다음 `C:\Apache24\conf\`로 가줍니다. 여기서 **httpd.conf**를 수정해줍니다. 가장 아래 줄에 다음을 추가해줍니다.  
```text
# -------- PHP Configuration --------
LoadModule php7_module "c:/php-7.4.11/php7apache2_4.dll"
AddHandler application/x-httpd-php .php

# Configure the path to php.ini

PHPIniDir "c:/php-7.4.11"
```  

**httpd.conf** 파일에서 기본적인 port 및 Root path변경 등 Apache에 대한 설정을 하실 수 있습니다. 이제 Apache와 PHP의 연결을 확인해 보겠습니다.  

`C\Apache24\htdocs`에 들어가서 **version.php**를 생성해 줍니다. 이름은 자유 입니다. **version.php**는 다음 과 같이 작성합니다. 
```php
<?php

phpinfo();
```


Apache를 다시 실행시키고 **http://localhost/version.php**에 접속하면 php정보가 아래와 같이 출력됩니다.
<img src="https://user-images.githubusercontent.com/48028667/97100701-9b0d8180-16d9-11eb-88a3-c1499961ac81.PNG">

이로써 php 와 Apache가 연동된걸 확인할 수 있습니다. 이제 원하는 입맛대로 설정을 변경하여 사용하시면 됩니다. 감사합니다.  
> 추후에 서버를 구성할일이 있으면 설정에 대해서도 다뤄보겠습니다. 