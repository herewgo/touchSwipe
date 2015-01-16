//touchSwipe.js @create by Jacobwang 2015-1-14 Ver1.0
(function(){
	var _$ = function(selector){
		return document.querySelector(selector)
	}

	var _$$ = function(selector){
		return document.querySelectorAll(selector)
	}

	var TouchSlider = function(){
		this.options = {
			'show':true,
			'transTime':.3,
			'transType':'ease'
		};

		this.autoDis = 50;
		this.Targetnode = _$('.t-slider');
		this.moveDistance = 0;
		this.moveCount = 0;
		this.X = 0;
		this.moveX = 0;
		this.distanceX = 0;
		this.listWidth = null;
		this.listHeight = null;
		this.isSwipe = 0;
	}


	TouchSlider.prototype.init = function(){
		if(this.options.show){
			this.setInitSize();
			this.initAddClass();
			this.touchStart();
			this.touchMove();
			this.touchEnd();
		}
	}
	//初始化滑动样式
	TouchSlider.prototype.setInitSize = function(){

		this.listWidth = _$('.slider-list').offsetHeight;

		for(var i = 0;i<_$$('.slider-list').length;i++){

			this.setIndex(_$$('.slider-list'));

			var index = _$$('.slider-list')[i].getAttribute('data-index');

			_$$('.slider-list')[i].style.webkitTransform = 'translate3d(0px,'+(this.listWidth*index)+'px,0px)';
			_$$('.slider-list')[i].style.transform = 'translate3d(0px,'+(this.listWidth*index)+'px,0px)';
		}

	}
	//封装触摸监听事件
	TouchSlider.prototype.touchEvent = function(node,eventType,callback){
		node.addEventListener(eventType,callback);
	}
	//触摸开始
	TouchSlider.prototype.touchStart = function(){
		var _self = this;

		this.touchEvent(_self.Targetnode,'touchstart',function(e){
			e.preventDefault();
			_self.X = e.touches[0].pageY;//获取初始触摸点
		})
	}
	//触摸过程
	TouchSlider.prototype.touchMove = function(){

		var _self = this,
			resultX;

		this.touchEvent(_self.Targetnode,'touchmove',function(e){

			e.preventDefault();

			_self.isSwipe=1;

			_self.distanceX = e.touches[0].pageY;//获取移动的触摸点

			_self.moveX = _self.X-_self.distanceX;//计算出手指滑动距离

			resultX = -_self.listWidth*_self.moveCount-_self.moveX;

			_self.translate3d(0,resultX);
			_self.transition(_self.options.transTime,_self.options.transType);

		})

	}
	//触摸结束
	TouchSlider.prototype.touchEnd = function(){

		var _self = this;

		this.touchEvent(_self.Targetnode,'touchend',function(e){
			e.preventDefault();
			//判断滑动方向
			 if ( _self.moveX > _self.autoDis && _self.isSwipe==1) {

			   _self.moveCount++;
			   //边界检测
			   if(_self.moveCount >= _$$('.slider-list').length){
			    	_self.translate3d(0,-_self.listWidth*(_$$('.slider-list').length-1));
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    	_self.moveCount = (_$$('.slider-list').length-1);
			    }else{
			    	_self.translate3d(0,-_self.listWidth*_self.moveCount);
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    	_self.addCurClass();
			    }
			   
			   _self.isSwipe=0;
		       
		    }else if(_self.moveX < -_self.autoDis && _self.isSwipe==1){

		    	_self.moveCount--;

		    	if(_self.moveCount <= 0){
			    	_self.translate3d(0,0);
			    	_self.moveCount = 0;
			    	_self.addCurClass();
			    }
			    else{
			    	_self.translate3d(0,-_self.listWidth*_self.moveCount);
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    	_self.addCurClass();
			    }

		       _self.isSwipe=0;

		    }

		})

	}
	//给滑动设置编号
	TouchSlider.prototype.setIndex = function(node){
		for(var i = 0;i<node.length;i++){
			node[i].setAttribute('data-index',i);
		}
	}
	//样式处理
	TouchSlider.prototype.translate3d = function(x,y){

		var _self = this;

		_self.Targetnode.style.webkitTransform = 'translate3d('+x+'px,'+y+'px,0px)';
		_self.Targetnode.style.transform = 'translate3d('+x+'px,'+y+'px,0px)';
	}
	//样式处理
	TouchSlider.prototype.transition = function(time,type){

		var _self = this;

		_self.Targetnode.style.webkitTransition= 'all '+time+'s '+type+'';
		_self.Targetnode.style.transition = 'all '+time+'s '+type+'';

	}

	TouchSlider.prototype.initAddClass = function(){
		_$$('.slider-list')[0].classList.add('cur');
	}

	TouchSlider.prototype.addCurClass = function(){

		var _self = this;
		for(var i = 0;i<_$$('.slider-list').length;i++){
			_$$('.slider-list')[i].classList.remove('cur');
		}
		_$$('.slider-list')[_self.moveCount].classList.add('cur');
	}

	var $$ = {};
	//类型检测
	var isObj = function (o) {
        return Object.prototype.toString.call(o) === "[object Object]";
    }
    //组件默认参数传递
	$$.extend = function(defaultObj,obj){
		if (isObj(obj)) {
            for (var i in obj) {
                defaultObj[i] = obj[i];
            }
        }
	} 
	//全局暴露组件接口
	window.touchSlider = function(options){
		var slider = new TouchSlider();

		$$.extend(slider.options,options);

		slider.init();
	}

})()