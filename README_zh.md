<div align= "center">
  <img src="https://ybkjzj.com:5555/d/LeavesResource/webImage/20241209130652.png" alt="demo" style="width: 80%; height: auto;">
</div>  

# 赛博手绘信

<div align="right">
  <a title="en" href="README.md"><img src="https://img.shields.io/badge/-English-545759?style=for-the-badge" alt="english"></a>
  <a title="zh" href="README_zh.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-A31F34?style=for-the-badge" alt="简体中文"></a>
</div>

> 无论你做程序员有多牛，有多精通各种代码，能解决各种问题，最后还是会想着去用代码去表白.  
> ————某位不知名的老前辈  
  
> 创意源自[@王子周棋洛](https://blog.csdn.net/m0_53321320?type=blog)以及 [Bilibili](https://www.bilibili.com/) 上的诸多老前辈  


  
> [!TIP]  
> 演示站点：https://crain.oksanye.com  

## 项目简介  

这个项目用了十分简单易懂的几行`css`、`js`实现了一个可交互的赛博手绘信封。  

信封的徽章使用开源项目 [appicon-forge](https://github.com/zhangyu1818/appicon-forge) 制作，闭合的时候效果如下  

<div align= "center">
  <img src="https://ybkjzj.com:5555/d/LeavesResource/webImage/20241209144402.png" alt="demo" style="width: 50%; height: auto;">
</div>  

## 项目特点  

- 🌟移动端适配  
采用了响应式、自适应的布局方案来确保移动端的体验。  

- 🌟多彩纪念日  
信封左上角可以根据你设定的纪念日动态更新数字。  

- 🌟loading 界面以及资源预加载处理  
有一个简单的 loading 界面，所有资源也都有预加载处理，还做了超时处理，不用操心你身处火星的朋友的网速情况  

- 🌟我来诠释丝滑  
渐隐渐显、平滑过渡，一切都很丝滑；  
煞费苦心地给图片之间做了交叉式淡入淡出，运动模糊效果甚至能让你三四帧的动画看起来平滑。  

- 🌟高度可扩展性  
我留了一些素材可供替换，除此之外还有一些已经做好的功能可以根据你的喜好取消注释来使用。  
动画部分我使用了 **Promise** 和**回调函数**来解决异步编程的问题，这使你之后想加点别的动画的时候就很方便了。  

## 更多创意   

`if` `(`你的女神不懂怎么打开URL `||` 你没有一个漂亮的域名`)` `{`  

你可以把这个 web 项目部署好以后，嵌入进 **NFC 216** 芯片;  

芯片又可以塞进相框🖼之类的小物件里。如此一来，你的女神只需要  

用手机碰一碰相框（尤其是很多女孩用 iPhone ，而 iPhone 默认开启NFC），  

便能看到这个赛博信件了。  

`}`  

`else` `{`  

你可以把你的域名直接 vx 发给你的女神，然后告诉她这是一个神秘的代码，  

这照样不失为一个小惊喜🎁。  

不过友情提示，  

`if` `(`你的域名没有备案`)` `{`  

先备案否则会有风险提示❎;  

`}`  

`else if` `(`你的域名不是 .com, .cn ,.top 这些常见域名`)` `{`  

vx 识别不了,女神可能会懵💢;  

`}`  

`else`

祝你成功;  

`}`
