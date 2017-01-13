### angular-webpack

### 此项目为单页面切换项目。


### 说明:

> 下载好项目后需要`npm i`。

### 项目命令:

> `npm run server` 或者 `npm start` 为启动webpack的server

* `npm run build` 每次需要发布到beta或者线上的时候需要build.


### 项目目录说明

> src/ 项目主目录,所有项目有关的的文件都在src文件下。

#### JavaScript 目录

> src/js 所有js的入口页面.

> src/main.js 主全局页面的js

> src/js/lib 所有公共组件的页面

> src/js/controllers/ 每个页面业务逻辑的代码,每一个文件夹代表一个一级菜单的文件。


#### less 目录

> src/less/main.less 全部页面的css入口。

> src/less/component 组件和公用css的存储

> src/less/controllers 每个业务页面的css存储地方。每一个文件夹代表一个一级菜单的。

#### route-tpl 目录

> src/route-tpl/header 头部的html模板文件。

> src/route-tpl/nav 导航的html模板文件。

> src/route-tpl/template 所有业务逻辑的模板文件。

#### images 目录

> src/images/ 页面所用到的图标,图形等文件。

#### midas 目录

> src/midas/ 页面所用到的所有接口路径。

#### index.html

> src/index.html 页面主入口。

## kepler-pc的菜单配置规则

> 只有一个一级菜单的配置

> 例: `#/index`

> 如果当前一级菜单下有二级菜单配置

> 例:

>   一级菜单 `#/index`

>   二级菜单 `#/index/some`

> 如果看不懂请拉代码后 请看src/js/lib/modules/route-config.js 的配置方法。

#### 发布

> 发布master分支直接执行 `npm run master` 

> 其他分支需要自己手动执行 `npm run build` 然后在去push


#### 开发者

> jackie.wu (武成龙) 如有问题请联系。
