# touchSwipe v1.0
手机端轮播
>简介

>简介

+ 这是适用于移动端的一款滑动组件
+ 使用场景一般多在移动端的单页展示上，例如微信的场景秀

>基本用法

1.首先先引入组件的javascript文件，该组件不依赖于任何js类库

		<script src="touchSwipe.js"></script>
        
2.基本HTML结构如下：要保证类名的准确无误

		<!-- touchSlider start -->
		<div class="slider">
			<ul class="t-slider">
				<li class="slider-list slider-list-1">
				</li>
				<li class="slider-list slider-list-2">
				</li>
				<li class="slider-list slider-list-3">
				</li>
			</ul>
		</div>
	    <!-- touchSlider stop -->
        
 3.调用方法：
 在刚刚引入的script文件下一行键入
 
 		touchSlider({
			'show':true,
			'transTime':.3,
			'transType':'ease-in',
			'direction':'Y'
		});
        
 >参数说明
 
 + show
 
 		默认值为true  用于是否启用
        
 + transTime
 
 		默认值为.3  用于调节页面滑动速度
        
 + transType
 
 		默认值为ease  用于调节平滑滚动类型
        
 + direction
 
 		默认值为Y  用于调节滑动方向

>demo预览地址（扫描二维码查看）

![测试二维码](http://www.wangwenyu.com//content/images/2015/01/ZWB7H-S4-9--BWG-U4--COJ.jpg)
