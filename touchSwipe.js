//touchSlider.js @create by Jacobwang 2015-1-14
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
			this.touchStart();
			this.touchMove();
			this.touchEnd();
		}
	}

	TouchSlider.prototype.setInitSize = function(){

		this.listWidth = _$('.slider-list').offsetWidth;

		for(var i = 0;i<_$$('.slider-list').length;i++){

			this.setIndex(_$$('.slider-list'));

			var index = _$$('.slider-list')[i].getAttribute('data-index');

			_$$('.slider-list')[i].style.webkitTransform = 'translate3d('+(this.listWidth*index)+'px,0px,0px)';
			_$$('.slider-list')[i].style.transform = 'translate3d('+(this.listWidth*index)+'px,0px,0px)';
		}

	}

	TouchSlider.prototype.touchEvent = function(node,eventType,callback){
		node.addEventListener(eventType,callback);
	}

	TouchSlider.prototype.touchStart = function(){
		var _self = this;

		this.touchEvent(_self.Targetnode,'touchstart',function(e){
			e.preventDefault();
			_self.X = e.touches[0].pageX;
		})
	}

	TouchSlider.prototype.touchMove = function(){

		var _self = this,
			resultX;

		this.touchEvent(_self.Targetnode,'touchmove',function(e){

			e.preventDefault();

			_self.isSwipe=1;

			_self.distanceX = e.touches[0].pageX;

			_self.moveX = _self.X-_self.distanceX;

			resultX = -_self.listWidth*_self.moveCount-_self.moveX;

			_self.translate3d(resultX,0);
			_self.transition(_self.options.transTime,_self.options.transType);

		})

	}

	TouchSlider.prototype.touchEnd = function(){

		var _self = this;

		this.touchEvent(_self.Targetnode,'touchend',function(e){
			e.preventDefault();

			 if ( _self.moveX > _self.autoDis && _self.isSwipe==1) {

			   _self.moveCount++;

			   if(_self.moveCount >= _$$('.slider-list').length){
			    	_self.translate3d(-_self.listWidth*(_$$('.slider-list').length-1),0);
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    	_self.moveCount = (_$$('.slider-list').length-1);
			    }else{
			    	_self.translate3d(-_self.listWidth*_self.moveCount,0);
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    }
			   
			   _self.isSwipe=0;
		       
		    }else if(_self.moveX < -_self.autoDis && _self.isSwipe==1){

		    	_self.moveCount--;

		    	if(_self.moveCount <= 0){
			    	_self.translate3d(0,0);
			    	_self.moveCount = 0;
			    }
			    else{
			    	_self.translate3d(-_self.listWidth*_self.moveCount,0);
			    	_self.transition(_self.options.transTime,_self.options.transType);
			    }

		       _self.isSwipe=0;

		    }

		})

	}

	TouchSlider.prototype.setIndex = function(node){
		for(var i = 0;i<node.length;i++){
			node[i].setAttribute('data-index',i);
		}
	}

	TouchSlider.prototype.translate3d = function(x,y){

		var _self = this;

		_self.Targetnode.style.webkitTransform = 'translate3d('+x+'px,'+y+'px,0px)';
		_self.Targetnode.style.transform = 'translate3d('+x+'px,'+y+'px,0px)';
	}

	TouchSlider.prototype.transition = function(time,type){

		var _self = this;

		_self.Targetnode.style.webkitTransition= 'all '+time+'s '+type+'';
		_self.Targetnode.style.transition = 'all '+time+'s '+type+'';

	}

	var $$ = {};

	var isObj = function (o) {
        return Object.prototype.toString.call(o) === "[object Object]";
    }

	$$.extend = function(defaultObj,obj){
		if (isObj(obj)) {
            for (var i in obj) {
                defaultObj[i] = obj[i];
            }
        }
	} 

	window.touchSlider = function(options){
		var slider = new TouchSlider();
		
		$$.extend(slider.options,options);

		slider.init();
	}

})()