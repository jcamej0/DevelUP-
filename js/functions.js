
window.forEach = function(obj,func,context){
	for(e in obj){
		func.apply(context||obj[e],[obj[e],e]);
	}
};

window.extend = function(){
	var a=arguments[0];
	forEach(arguments,function(e,i){
		if(i!=0)
			forEach(this,function(attr,index){
				this[index]=attr;
			},a);
	});
	return a;
};

window.delay = function(time,func,context){
	setTimeout(function(){
		func.call(context||this);
	},time);
}

extend(Element.prototype,{
	getAttr:function(attr){
		var respond={};
		forEach(attr.split(","),function(attr){
			var a=this.getAttribute(attr);
			if(a)
				respond[attr]=a;
		},this);
		return respond;
	},setAttr:function(attr){
		forEach(attr,function(attr,key){
			this.setAttribute(key,attr);
		},this)
	},css:function(attr){
		forEach(attr,function(attr,key){
			this.style[key.toCss()]=attr;
		},this);
	},saveSvgAttr:function(){
		this.svgAttr=this.getAttr("fill,stroke-width,stroke,fill-opacity");
	}
});
